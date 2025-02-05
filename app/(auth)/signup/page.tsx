import { SignUpViewPage } from '@/sections/signup/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MED | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default function Page() {
  return <SignUpViewPage />;
}
