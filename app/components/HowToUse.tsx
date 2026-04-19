import { Info, Users, Nfc, Shield, CreditCard } from 'lucide-react';

export default function HowToUse() {
  const steps = [
    {
      icon: <Users className="w-5 h-5 text-neon-blue drop-shadow-[0_0_8px_rgba(77,124,255,0.8)]" />,
      title: "Choose Contact",
      description: "Select from your Google contacts or tap NFC"
    },
    {
      icon: <CreditCard className="w-5 h-5 text-neon-green drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" />,
      title: "Enter Amount",
      description: "Type the ETH amount you want to send"
    },
    {
      icon: <Shield className="w-5 h-5 text-neon-purple drop-shadow-[0_0_8px_rgba(181,60,255,0.8)]" />,
      title: "Secure Identity",
      description: "Authenticate securely via OnchainKit"
    },
    {
      icon: <Nfc className="w-5 h-5 text-neon-blue drop-shadow-[0_0_8px_rgba(77,124,255,0.8)]" />,
      title: "Transaction Sent",
      description: "Payment sent instantly on Base network"
    }
  ];

  return (
    <div className="glass-card p-6 border-t border-l border-white/20">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
        <div className="p-2 bg-neon-blue/10 rounded-lg">
          <Info className="w-5 h-5 text-neon-blue" />
        </div>
        <h2 className="text-lg font-display tracking-widest font-semibold text-white">HOW TO USE</h2>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:-ml-px before:w-0.5 before:bg-white/10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4 relative">
            <div className="flex-shrink-0 w-10 h-10 bg-brand-dark border-2 border-white/10 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {step.icon}
            </div>
            <div className="pt-1.5 flex-1 glass-card bg-white/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border-white/5 hover:bg-white/10 transition-colors">
              <p className="font-semibold text-white text-sm tracking-wide mb-1">{step.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
