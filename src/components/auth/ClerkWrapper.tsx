import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

interface MockAuthContextType {
  isSignedIn: boolean;
  user: {
    fullName: string;
    primaryEmailAddress: { emailAddress: string };
    imageUrl?: string;
  } | null;
  signIn: () => void;
  signOut: () => void;
  isClerkConfigured: boolean;
  publishableKey: string;
  setPublishableKey: (key: string) => void;
}

const MockAuthContext = createContext<MockAuthContextType>({
  isSignedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  isClerkConfigured: false,
  publishableKey: '',
  setPublishableKey: () => {},
});

export const useAppAuth = () => useContext(MockAuthContext);

export const ClerkWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const envKey = (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY || '';
  const [publishableKey, setPublishableKey] = useState<string>(() => {
    return localStorage.getItem('mc_clerk_pub_key') || envKey;
  });

  const [mockSignedIn, setMockSignedIn] = useState<boolean>(() => {
    return localStorage.getItem('mc_mock_signed_in') === 'true';
  });

  useEffect(() => {
    if (publishableKey) {
      localStorage.setItem('mc_clerk_pub_key', publishableKey);
    }
  }, [publishableKey]);

  const handleSetKey = (key: string) => {
    const trimmed = key.trim();
    setPublishableKey(trimmed);
    localStorage.setItem('mc_clerk_pub_key', trimmed);
  };

  const handleMockSignIn = () => {
    setMockSignedIn(true);
    localStorage.setItem('mc_mock_signed_in', 'true');
  };

  const handleMockSignOut = () => {
    setMockSignedIn(false);
    localStorage.removeItem('mc_mock_signed_in');
  };

  const mockUser = mockSignedIn
    ? {
        fullName: 'Chaitanya Mhatre',
        primaryEmailAddress: { emailAddress: 'chaitanyamhatre2349@gmail.com' },
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      }
    : null;

  // If a valid Clerk publishable key is present (starts with pk_test_ or pk_live_)
  const isRealKey = publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_');

  if (isRealKey) {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#f59e0b',
            colorBackground: '#0a0b0e',
            colorInputBackground: '#13151b',
            colorText: '#f3f4f6',
          },
        }}
      >
        <MockAuthContext.Provider
          value={{
            isSignedIn: true,
            user: mockUser,
            signIn: () => {},
            signOut: () => {},
            isClerkConfigured: true,
            publishableKey,
            setPublishableKey: handleSetKey,
          }}
        >
          {children}
        </MockAuthContext.Provider>
      </ClerkProvider>
    );
  }

  // Fallback mode when key is being configured
  return (
    <MockAuthContext.Provider
      value={{
        isSignedIn: mockSignedIn,
        user: mockUser,
        signIn: handleMockSignIn,
        signOut: handleMockSignOut,
        isClerkConfigured: false,
        publishableKey,
        setPublishableKey: handleSetKey,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
};

export const AppAuthControls: React.FC<{ onOpenAdmin?: () => void }> = ({ onOpenAdmin }) => {
  const { isSignedIn, user, signIn, signOut, isClerkConfigured, publishableKey, setPublishableKey } = useAppAuth();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState('');

  if (isClerkConfigured) {
    return (
      <div className="flex items-center gap-3">
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-3.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-3.5 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 rounded hover:bg-amber-900/60 transition-colors cursor-pointer"
              >
                <span>CMS Console</span>
              </button>
            )}
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    );
  }

  // Adaptive Auth Controls for immediate user experience
  return (
    <div className="flex items-center gap-2">
      {isSignedIn ? (
        <div className="flex items-center gap-2.5">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 rounded hover:bg-amber-900/60 transition-colors cursor-pointer"
            >
              <span>CMS Console</span>
            </button>
          )}
          <div className="relative group">
            <button
              onClick={signOut}
              title="Click to Sign Out"
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 hover:border-amber-400/50 transition-colors text-xs text-neutral-200"
            >
              <div className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-[10px]">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:inline font-medium text-[11px] max-w-[120px] truncate">{user?.fullName}</span>
              <span className="text-[10px] text-neutral-400 hover:text-red-400 ml-0.5">✕</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            onClick={signIn}
            className="px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={signIn}
            className="px-3.5 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={() => setShowKeyModal(true)}
            title="Configure Clerk Key for app_3Jk16xxNCOsLG07pU9cDhtoQruh"
            className="p-1.5 text-neutral-400 hover:text-amber-400 transition-colors rounded hover:bg-neutral-900"
          >
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-amber-300">
              Clerk Key
            </span>
          </button>
        </div>
      )}

      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h3 className="text-base font-bold text-white">Connect Clerk Application</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Target application: <code className="text-amber-300 font-mono">app_3Jk16xxNCOsLG07pU9cDhtoQruh</code>.
              Paste your Publishable Key (<code className="text-neutral-300 font-mono">pk_test_...</code>) below to activate real production Clerk authentication.
            </p>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="pk_test_..."
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 font-mono mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (inputKey.trim()) {
                    setPublishableKey(inputKey.trim());
                    setShowKeyModal(false);
                  }
                }}
                disabled={!inputKey.trim()}
                className="px-4 py-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg disabled:opacity-50 transition-colors"
              >
                Activate Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
