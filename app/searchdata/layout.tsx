import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Main Starter',
  description: 'Basic main with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
