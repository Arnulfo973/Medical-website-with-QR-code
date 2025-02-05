import { SignInViewPage } from '@/sections/signin/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MED | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return (
    <div>
      <SignInViewPage />
    </div>
  );
}