'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Nfc, TrendingUp, LogOut } from 'lucide-react';
import ScoreCard from '../components/ScoreCard';
import HowToUse from '../components/HowToUse';
import { signInAndGetContacts } from "@/lib/firebase";

export default function HomePage() {
  const router = useRouter();
  const [userScore, setUserScore] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState(0);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);

  useEffect(() => {
    // Mock user dashboard data
    setUserScore(742);
    setRecentTransactions(15);
  }, []);

  const handlePayContacts = async () => {
    try {
      setIsFetchingContacts(true);
      // We trigger the popup for contacts scope if needed
      const contacts = await signInAndGetContacts();
      sessionStorage.setItem('nfcpay_contacts', JSON.stringify(contacts));
      router.push('/contacts');
    } catch (err) {
      console.error("Error fetching contacts:", err);
      // Fallback router push if fails or user cancels
      router.push('/contacts?error=1');
    } finally {
      setIsFetchingContacts(false);
    }
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden p-4 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[60%] left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-md mx-auto flex items-center justify-between mb-8 mt-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-wide">PayNFC</h1>
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => router.push('/')} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-[1rem] flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(77,124,255,0.2)]">
            <span className="text-white font-semibold font-display">ME</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Score Card */}
        <ScoreCard score={userScore} recentTransactions={recentTransactions} />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handlePayContacts}
            disabled={isFetchingContacts}
            className="glass-button blue flex flex-col items-center justify-center py-8 hover:shadow-[0_0_25px_rgba(77,124,255,0.3)] disabled:opacity-50"
          >
            {isFetchingContacts ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
            ) : (
             <Users className="w-8 h-8 text-white drop-shadow-md mb-3" />
            )}
            <p className="text-sm font-semibold tracking-wide">Pay Contacts</p>
            <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">Google Synced</p>
          </button>

          <button
            onClick={() => router.push('/transaction?mode=nfc')}
            className="glass-button purple flex flex-col items-center justify-center py-8 hover:shadow-[0_0_25px_rgba(181,60,255,0.3)]"
          >
            <Nfc className="w-8 h-8 text-white drop-shadow-md mb-3" />
            <p className="text-sm font-semibold tracking-wide">NFC Ray</p>
            <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">Tap & Pay</p>
          </button>
        </div>

        {/* How to Use Section */}
        <HowToUse />

        {/* Recent Activity */}
        <div className="glass-card p-6 border-t border-l border-white/20">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h2 className="text-lg font-display tracking-widest font-semibold text-white">ACTIVITY</h2>
            <div className="p-2 bg-neon-green/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-neon-green" />
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Mock recent activity styled up */}
            <div className="flex items-center justify-between p-3.5 glass-card bg-white/5 border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white tracking-wide">John Doe</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-bold text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">-0.05 ETH</span>
            </div>
            
            <div className="flex items-center justify-between p-3.5 glass-card bg-white/5 border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SW</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white tracking-wide">Sarah Wilson</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
              <span className="text-sm font-bold text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">-0.02 ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
