'use client';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface QRcodeData {
  qrcode: string;
  token: string;
}

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function MedicalPage() {

  const router = useRouter();
  const [qrcode, setQRcode] = useState<string>("");

  const qrcodeData: QRcodeData = {
    qrcode: qrcode,
    token: userInfo.token
  };

  const onSubmit = async (qrcodeData: QRcodeData) => {
    if (!qrcode) {
      toast({
        title: '🙁️ Medical code empty!',
        description: 'Please enter Medical Code!'
      });
      return;
    }

    try {
      const response = await fetch('/api/qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(qrcodeData)
      });

      if (response.status == 502) {
        toast({
          title: '😭️ Medical Code incorrect!',
          description: 'Please enter correctly'
        });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Medical Code saving failed' };
      }

      if (response.status == 201) {
        router.push('/personaldata');
      }

      toast({
        title: '🙂️ Successful!',
        description: 'Welcome!'
      });

      router.push('/personaldata');

      return await response.json();
    } catch (error) {
      toast({
        title: 'Medical code saving Failed!',
        description: 'Medical code saving has failed. Please try again.'
      });
      throw error;
    }
  };

  const ok = async () => {
    const response = await onSubmit(qrcodeData);

    if (response && response.error) {
      console.error(response);
    } else {
      console.log('Success:', response);
    }
  };

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
      <div className='border border-sky-500 w-[600px] h-[200px] p-6'>
        <p className='text-center text-xl text-sky-500 font-bold'>Please enter unique code within medical bracelet's QR Code!</p>
        <input className='border border-sky-500 w-full rounded-md text-lg outline-none px-2 py-1 text-center text-gray-500 mt-2' onChange={(e) => setQRcode(e.target.value)} />
        <button className='border border-sky-500 outline-none text-sky-500 text-lg font-bold hover:bg-sky-500 hover:text-white w-full rounded-md mt-3' onClick={ok}>OK</button>
      </div>
    </div>
  );
}
