'use client';

import { useState, useCallback, useEffect } from 'react';
import { Transaction, TransactionButton, TransactionStatus } from '@coinbase/onchainkit/transaction';
import { Wallet, WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import { parseEther } from 'viem';
import { Shield, Send, CheckCircle2 } from 'lucide-react';

interface TransactionFormProps {
  receiverAddress: string;
  initialAmount?: string;
  contactName?: string;
  mode?: 'contact' | 'nfc' | 'manual';
}

export default function TransactionForm({ 
  receiverAddress, 
  initialAmount = '',
  contactName = '',
  mode = 'manual'
}: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState<string>('');

  useEffect(() => {
    if (initialAmount) {
      setAmount(initialAmount);
    }
  }, [initialAmount]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const calls = receiverAddress
    ? [{
        to: receiverAddress as `0x${string}`,
        value: amount ? parseEther(amount) : BigInt(0),
        data: '0x' as `0x${string}`,
      }]
    : [];

  const handleOnSuccess = (response: any) => {
    console.log('Transaction successful:', response);
    if (response?.transactionReceipts?.[0]?.transactionHash) {
      setTransactionHash(response.transactionReceipts[0].transactionHash);
    }
    setTimeout(() => {
      setAmount('');
      setTransactionHash('');
    }, 5000);
  };

  const handleOnError = (error: any) => {
    console.error('Transaction failed:', error);
  };

  const isButtonDisabled = !receiverAddress || !amount || parseFloat(amount) <= 0;

  return (
    <div className="space-y-6">
      {/* Wallet Connection Section */}
      <div className="glass-card bg-white/5 border-white/5 p-4 rounded-xl">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Authentication Payload</h3>
        <Wallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2 text-white bg-black/40 rounded-t-xl" hasCopyAddressOnClick>
              <Avatar />
              <Name className="text-white font-bold" />
              <Address className="text-gray-400" />
              <EthBalance className="text-neon-green" />
            </Identity>
            <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com" className="text-white hover:bg-white/10">
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect className="text-red-400 hover:bg-red-400/10" />
          </WalletDropdown>
        </Wallet>
      </div>

      {/* Receiver Address */}
      <div className="space-y-2">
        <label className="flex items-center text-xs font-semibold tracking-widest text-gray-400 uppercase">
          <Shield className="w-3.5 h-3.5 mr-1.5 text-neon-blue" />
          {mode === 'contact' ? `Paying ${contactName || 'Contact'}` : 'Receiver Identity'}
        </label>
        <div className="glass-input opacity-70 p-4 font-mono text-sm tracking-wider text-white" title={receiverAddress}>
          {formatAddress(receiverAddress)}
        </div>
        <p className="text-[10px] text-gray-500 font-mono text-right w-full block">
          {receiverAddress}
        </p>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="flex items-center text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Transmission Vol (ETH)
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.001"
            step="0.001"
            min="0"
            className="w-full pl-4 pr-16 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 text-white font-bold text-lg placeholder-gray-600 shadow-inner backdrop-blur-xl transition-all"
            readOnly={mode === 'nfc' && initialAmount ? true : false}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold font-display">
            ETH
          </span>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest float-right mt-1">
          Min 0.001 ETH
        </p>
        <div className="clear-both"></div>
      </div>

      {/* Success Message */}
      {transactionHash && (
        <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl mt-4 animate-fade-in shadow-[0_0_20px_rgba(57,255,20,0.2)]">
          <p className="text-neon-green text-sm flex items-center font-semibold tracking-wide">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            TRANSMISSION SECURED
          </p>
          <a 
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xs underline mt-2 block hover:text-neon-green transition-colors font-mono break-all"
          >
            TX: {transactionHash}
          </a>
        </div>
      )}

      {/* Transaction Component */}
      <div className="mt-8 relative z-50">
        <Transaction
          calls={calls}
          onSuccess={handleOnSuccess}
          onError={handleOnError}
        >
          <TransactionButton
            text={isButtonDisabled ? 'AWAITING PAYLOAD...' : 'INITIATE TRANSFER'}
            disabled={isButtonDisabled || calls.length === 0}
            className={`w-full py-4 rounded-xl font-display font-bold tracking-widest transition-all duration-300 ${
              isButtonDisabled 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                : 'bg-gradient-to-r from-neon-blue/80 to-neon-purple/80 hover:from-neon-blue hover:to-neon-purple text-white shadow-[0_0_20px_rgba(77,124,255,0.4)] border border-white/20'
            }`}
          />
          <TransactionStatus />
        </Transaction>
      </div>
    </div>
  );
}

