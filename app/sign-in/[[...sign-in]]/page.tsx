'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="grid w-full flex-grow items-center bg-zinc-100 px-4 sm:justify-center">
      <SignIn />
    </div>
  );
}
