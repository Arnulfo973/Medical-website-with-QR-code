import { Metadata } from 'next';
import RoleForm from '../role-form';

export const metadata: Metadata = {
  title: 'MED',
  description: 'Roles built using the components.'
};

export default function RoleViewPage() {
  return (
    <RoleForm />
  );
}
