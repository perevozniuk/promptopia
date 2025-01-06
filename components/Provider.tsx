'use client';
import { SessionProvider } from '@node_modules/next-auth/react';
import React, { ReactNode } from 'react';
import { Session } from 'next-auth';

interface ProviderProps {
  children: ReactNode; // Type for React children
  session?: Session | null; // Type for session, nullable if session is optional
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;