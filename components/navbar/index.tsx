'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import logo from '@/assets/logo.png';
import { cn } from '@/utils/cn';

import { ModeToggle } from './ModeToggle';
import { Panel } from './Panel';

export const Navbar = () => {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const paths = [
    { name: 'Proyectos', href: '/projects' },
    { name: 'Staff', href: '/staff' },
    { name: 'Contratistas', href: '/contractor' },
    { name: 'Activos', href: '/activos' },
  ];

  const navigation = paths.map((item) => ({
    ...item,
    current: item.href === pathname,
  }));

  return (
    <nav className="bg-sky-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Panel navigation={navigation} />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  src={logo}
                  style={{
                    width: 'auto',
                    height: '40px',
                    filter: 'brightness(0) invert(1)',
                  }}
                  alt="Logo"
                  className="ml-4"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex h-full items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={cn(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-200 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-4">
            <ModeToggle />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
