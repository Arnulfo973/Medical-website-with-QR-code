import { Metadata } from 'next';
import QRcodeForm from '../qrcode-form';

export const metadata: Metadata = {
  title: 'MED',
  description: 'Authentication forms built using the components.'
};

export default function QRcodeViewPage() {
  return (
    <QRcodeForm />
  );
}
