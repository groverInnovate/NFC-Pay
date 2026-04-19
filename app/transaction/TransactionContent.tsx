'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TransactionApp from '../components/TransactionApp';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Mode = 'contact' | 'nfc' | 'manual';

interface TransactionData {
  address: string;
  amount: string;
  contactName: string;
  mode: Mode;
}

export default function TransactionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<TransactionData>({
    address: '',
    amount: '',
    contactName: '',
    mode: 'manual'
  });

  useEffect(() => {
    const address = searchParams.get('address') || '';
    const amount = searchParams.get('amount') || '';
    const contactName = searchParams.get('name') || '';
    const modeParam = (searchParams.get('mode') || 'manual').toLowerCase();
    const mode: Mode = (modeParam === 'nfc' || modeParam === 'contact') ? (modeParam as Mode) : 'manual';

    setTransactionData({
      address,
      amount,
      contactName,
      mode,
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen relative w-full overflow-hidden p-4 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-0 w-[150%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-md mx-auto flex items-center space-x-4 mt-6 mb-8 relative z-10">
        <button
          onClick={() => router.back()}
          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-wide">Checkout</h1>
          <p className="text-xs text-neon-purple font-medium tracking-widest uppercase mt-1">Base Sepolia</p>
        </div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <TransactionApp
          initialAddress={transactionData.address}
          initialAmount={transactionData.amount}
          contactName={transactionData.contactName}
          mode={transactionData.mode}
        />
      </div>
    </div>
  );
}
