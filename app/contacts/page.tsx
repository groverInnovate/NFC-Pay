'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactsList, { Contact } from '../components/ContactsList';
import { ArrowLeft, Search } from 'lucide-react';

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simple deterministic hash for a string to create a fake wallet address
  const generateWalletAddress = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; 
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    // Basic formatting for a mock base address
    return `0x${hex}A3b8D4bC5DbFADbE7c72${hex.substring(0, 4)}`.substring(0, 42);
  };

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('nfcpay_contacts');
      if (stored) {
        const parsed = JSON.parse(stored);
        const formatted: Contact[] = parsed.map((c: any, i: number) => {
          const email = c.emailAddresses?.[0]?.value || `contact${i}@google.com`;
          const name = c.names?.[0]?.displayName || 'Unknown Contact';
          return {
            id: c.resourceName || String(i),
            name,
            email,
            walletAddress: generateWalletAddress(email)
          }
        });
        setContacts(formatted);
      } else {
        // Mock fallback if they reached here without cache
        setContacts([
          { id: '1', name: 'John Doe', email: 'john@gmail.com', walletAddress: '0x742d35Cc6634C0532925a3b8D4bC5DbFADbE7c72' },
          { id: '2', name: 'Sarah Wilson', email: 'sarah@gmail.com', walletAddress: '0x61F98b58328191a8ed2EAFE1Ed017d379Ba39a4B' }
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact: Contact) => {
    router.push(`/transaction?address=${contact.walletAddress}&name=${encodeURIComponent(contact.name)}&mode=contact`);
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden p-4 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[150%] h-[50%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-md mx-auto flex items-center space-x-4 mt-6 mb-8 relative z-10">
        <button
          onClick={() => router.back()}
          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-wide">Contacts</h1>
          <p className="text-xs text-neon-blue font-medium tracking-widest uppercase mt-1">Google Synced Identity</p>
        </div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 text-white placeholder-gray-500 shadow-inner backdrop-blur-xl transition-all"
          />
        </div>

        {/* Contacts List */}
        <ContactsList
          contacts={filteredContacts}
          isLoading={isLoading}
          onContactSelect={handleContactSelect}
        />
      </div>
    </div>
  );
}
