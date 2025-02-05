import { RoleViewPage } from '@/sections/role/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MED',
  description: 'Role page for authentication.'
};

export default function Page() {
  return <RoleViewPage />;
}
