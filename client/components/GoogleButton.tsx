import React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const GoogleButton: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      className="btn w-full"
      onClick={() => signIn('google', { callbackUrl })}
    >
      <img src="/google.png" alt="google" className="w-6" />
      Sign in with Google
    </button>
  );
};

export default GoogleButton;
