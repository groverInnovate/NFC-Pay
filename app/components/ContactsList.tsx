import { User, ExternalLink } from 'lucide-react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
}

interface ContactsListProps {
  contacts: Contact[];
  isLoading: boolean;
  onContactSelect: (contact: Contact) => void;
}

export default function ContactsList({ contacts, isLoading, onContactSelect }: ContactsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="glass-card p-4 animate-pulse border-white/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded mb-3 w-1/3"></div>
                <div className="h-3 bg-white/5 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="glass-card text-center py-12 border-white/5 bg-white/5">
        <User className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-gray-300 font-medium">No contacts found</p>
        <p className="text-sm text-gray-500 mt-2">Try searching with a different term</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <button
          key={contact.id}
          onClick={() => onContactSelect(contact)}
          className="w-full glass-card bg-white/[0.02] border-white/5 p-4 hover:bg-white/10 transition-all text-left group animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon-blue/10 rounded-xl flex items-center justify-center border border-neon-blue/20 group-hover:bg-neon-blue/20 transition-colors shadow-[0_0_15px_rgba(77,124,255,0.1)] group-hover:shadow-[0_0_20px_rgba(77,124,255,0.3)]">
              <span className="text-neon-blue font-display font-medium text-lg">
                {contact.name.split(' ').map(n => n?.[0]).join('').substring(0,2).toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white tracking-wide">{contact.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{contact.email}</p>
              <p className="text-xs text-neon-blue/70 font-mono mt-1 
                bg-neon-blue/5 inline-block px-2 py-0.5 rounded border border-neon-blue/10">
                {contact.walletAddress.slice(0, 8)}...{contact.walletAddress.slice(-6)}
              </p>
            </div>
            <div className="opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-neon-blue/80 drop-shadow-[0_0_5px_rgba(77,124,255,0.4)]" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
