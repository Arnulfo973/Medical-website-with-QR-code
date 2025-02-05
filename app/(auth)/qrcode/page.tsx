import { QRcodeViewPage } from '@/sections/qrcode/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MED',
  description: 'QR code page for authentication.'
};

export default function Page() {
  return <QRcodeViewPage />;
}
