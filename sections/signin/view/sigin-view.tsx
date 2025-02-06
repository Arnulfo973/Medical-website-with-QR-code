import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '../user-auth-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'MED',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className='flex justify-center items-center w-0 h-full bg-gradient-to-r from-cyan-500 from-10% via-sky-500 via-30% to-blue-500 to-90% lg:w-[50%]'>
          <Image src="/1.jpg" width={400} height={400} alt='medical1' className='rounded-lg w-[70%]' />
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[375px] md:w-[400px] border border-sky-500 p-10 rounded-md">
          <div className="flex w-full justify-center">
            <Image src="/logo.png" width={170} height={170} alt="logo image" />
          </div>
          <p className="text-center text-2xl font-semibold tracking-tight">
            Log In
          </p>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-sky-500"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
