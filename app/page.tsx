'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Nfc, CreditCard, Shield } from 'lucide-react';
import { signInWithGoogle } from '@/lib/googleAuth';

export default function LandingPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
      router.push('/home');
    } catch (error) {
      console.error('Sign in failed:', error);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative w-full overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-neon-blue/20 blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-neon-purple/20 blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full glass-card p-10 animate-fade-in relative z-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:-z-10 border-t border-l border-white/20">
        
        {/* App Logo & Title */}
        <div className="text-center mb-10 animate-float">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(77,124,255,0.3)]">
            <Nfc className="w-12 h-12 text-neon-blue drop-shadow-[0_0_15px_rgba(77,124,255,0.8)]" />
          </div>
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple mb-3 tracking-tight">PayNFC</h1>
          <p className="text-gray-400 font-medium text-sm tracking-wide">Next-Gen Instant Crypto Payments</p>
        </div>

        {/* Features Preview */}
        <div className="space-y-5 mb-10">
          <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-neon-blue/10">
              <Users className="w-5 h-5 text-neon-blue" />
            </div>
            <span className="text-sm font-medium text-gray-200">Pay your Google contacts instantly</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-neon-purple/10">
              <Nfc className="w-5 h-5 text-neon-purple" />
            </div>
            <span className="text-sm font-medium text-gray-200">Tap NFC cards for quick payments</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-neon-green/10">
              <CreditCard className="w-5 h-5 text-neon-green" />
            </div>
            <span className="text-sm font-medium text-gray-200">Decentralized Smart Wallets via Base</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="glass-button blue flex items-center justify-center space-x-3 disabled:opacity-50 group hover:shadow-[0_0_30px_rgba(77,124,255,0.4)]"
        >
          {isSigningIn ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Connecting Identity...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-500 text-center mt-6 uppercase tracking-widest font-medium">
          Secured by Base OnchainKit
        </p>
      </div>
    </div>
  );
}
