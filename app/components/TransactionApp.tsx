'use client';

import { useEffect, useState, useCallback } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import TransactionForm from './TransactionForm';
import LoadingSpinner from './LoadingSpinner';
import { User, Nfc, Wallet, AlertCircle } from 'lucide-react';

interface TransactionAppProps {
  initialAddress?: string;
  initialAmount?: string;
  contactName?: string;
  mode?: 'contact' | 'nfc' | 'manual';
}

export default function TransactionApp({ 
  initialAddress = '', 
  initialAmount = '', 
  contactName = '', 
  mode = 'manual' 
}: TransactionAppProps) {
  const { isFrameReady, context, setFrameReady } = useMiniKit();
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const parseTransactionData = useCallback(() => {
    try {
      let address = initialAddress;
      let amountValue = initialAmount;

      if (!address && !amountValue && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        address = urlParams.get('address') || '';
        amountValue = urlParams.get('amount') || '';
      }

      console.log('Transaction ', { address, amountValue, contactName, mode });

      if (address) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
          throw new Error('Invalid wallet address format');
        }
        setReceiverAddress(address);
        console.log('Receiver address set:', address);
      } else if (mode === 'nfc' || mode === 'contact') {
        setError('No receiver address provided');
        setIsLoading(false);
        return;
      }

      if (amountValue) {
        setAmount(amountValue);
        console.log('Initial amount set:', amountValue);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse transaction data');
      setIsLoading(false);
    }
  }, [initialAddress, initialAmount, contactName, mode]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      parseTransactionData();
    }, 100);

    return () => clearTimeout(timer);
  }, [parseTransactionData]);

  const getHeaderInfo = () => {
    switch (mode) {
      case 'contact':
        return {
          icon: <User className="w-6 h-6 text-neon-blue" />,
          title: contactName ? `Pay ${contactName}` : 'Pay Contact',
          subtitle: 'From your contacts',
          glowColor: 'shadow-[0_0_20px_rgba(77,124,255,0.4)]',
          bgTheme: 'bg-neon-blue/10'
        };
      case 'nfc':
        return {
          icon: <Nfc className="w-6 h-6 text-neon-green" />,
          title: 'NFC Payment',
          subtitle: contactName ? `Pay ${contactName}` : 'Tap to pay detected',
          glowColor: 'shadow-[0_0_20px_rgba(57,255,20,0.4)]',
          bgTheme: 'bg-neon-green/10'
        };
      default:
        return {
          icon: <Wallet className="w-6 h-6 text-neon-purple" />,
          title: 'Send Payment',
          subtitle: 'Manual transaction',
          glowColor: 'shadow-[0_0_20px_rgba(181,60,255,0.4)]',
          bgTheme: 'bg-neon-purple/10'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  if (isLoading) {
    return (
      <div className="glass-card">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p className="mt-4 text-gray-400 font-display tracking-wider text-sm">
            {mode === 'nfc' ? 'PROCESSING NFC DATA...' : 
             mode === 'contact' ? 'LOADING CONTACT INFO...' : 
             'LOADING PAYMENT DATA...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card border-red-500/30">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-display tracking-wider font-semibold text-white mb-2">ERROR</h2>
          <p className="text-red-400 text-center text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="glass-button w-full max-w-xs mt-8 py-3"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      {/* Dynamic header based on payment mode */}
      <div className="flex flex-col items-center justify-center mb-8 pt-4">
        <div className={`w-16 h-16 ${headerInfo.bgTheme} rounded-full flex items-center justify-center mb-4 ${headerInfo.glowColor} border border-white/10`}>
          {headerInfo.icon}
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold font-display text-white tracking-wide">{headerInfo.title}</h1>
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mt-1">{headerInfo.subtitle}</p>
        </div>
      </div>

      {/* Payment mode indicator */}
      <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-xl backdrop-blur-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Payment Mode</span>
          <span className="font-semibold text-white capitalize">
            {mode === 'nfc' ? 'NFC Tap' : 
             mode === 'contact' ? 'Contact Reference' : 
             'Manual Entry'}
          </span>
        </div>
        {contactName && (
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Recipient</span>
            <span className="font-semibold text-white">{contactName}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Net</span>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-neon-purple mr-2 animate-pulse-glow"></div>
            <span className="font-semibold text-neon-purple tracking-wide">Base Sepolia</span>
          </div>
        </div>
      </div>

      {/* Transaction Form */}
      <TransactionForm 
        receiverAddress={receiverAddress}
        initialAmount={amount}
        contactName={contactName}
        mode={mode}
      />
    </div>
  );
}
