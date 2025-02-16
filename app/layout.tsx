import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Promptopia',
  description: ' Discover & Share AI Prompts',
};


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
    <body>
    <Provider>
      <div className="main">
      </div>
      <main className="app">
        <Nav />
        {children}
      </main>
    </Provider>
    </body>
    </html>
  );
};

export default RootLayout;