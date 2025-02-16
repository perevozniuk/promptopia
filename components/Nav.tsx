'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';


const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="w-full pt-3 flex-between mb-16
 ">

      <Link href="/" className="flex gap-2 flex-center">
        <Image src="assets/images/logo.svg" alt="Logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*Desktop navigation*/}
      <div className="hidden sm:flex">
        {session?.user ? <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">Create Prompt</Link>
          <button type="button" onClick={() => signOut()} className="outline_btn">Sign Out</button>

          <Link href="/profile">
            <Image src={session?.user?.image || ''} alt="profile" width={37} height={37} className="rounded-full" />
          </Link>
        </div> : (<>
          {providers && Object.values(providers).map((provider: ClientSafeProvider) => (
            <button
              type="button"
              key={provider.name}
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign In
            </button>
          ))}
        </>)}
      </div>

      {/*  Mobile Navigation*/}
      <div className="relative flex sm:hidden">
        {session?.user ? <div className="flex">
          <Image
            src={session?.user?.image || ''}
            alt="profile"
            width={37}
            height={37}
            className="rounded-full"
            onClick={() => {
              setToggleDropdown((prev) => !prev);
            }} />

          {toggleDropdown && (
            <div className="dropdown">
              <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
              <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create
                Prompt
              </Link>
              <button type="button" className="w-full mt-5 black_btn" onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}>Sign Out
              </button>
            </div>
          )}
        </div> : (<>
          {providers && Object.values(providers).map((provider: ClientSafeProvider) => (
            <button
              type="button"
              key={provider.name}
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign In
            </button>
          ))}</>)}
      </div>
    </nav>
  );
};

export default Nav;