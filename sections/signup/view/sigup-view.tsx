import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '../user-auth-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'MED',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className='flex justify-center items-center w-[50%] h-full bg-gradient-to-r from-cyan-500 from-10% via-sky-500 via-30% to-blue-500 to-90%'>
            <Image src="/2.jpg" width={400} height={400} alt='medical1' className='rounded-lg w-[70%]' />
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[375px] md:w-[400px] border border-sky-500 p-10 rounded-md">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-sky-500"
            >
              You have already account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
