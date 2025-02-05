'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoleForm() {

  const router = useRouter();
  const [role, setRole] = useState<string>("");

  const doctor = () => {
    setRole("doctor");
  }

  const patient = () => {
    setRole("patient");
  }

  const next = () => {
    if (role === "patient") {
      router.push("/qrcode");
    } else if(role === "doctor") {
      router.push("/searchdata");
    } else {
      return;
    }
  }

  return (
    <div className='w-[100vw] h-[100vh]'>
      <div className='flex justify-center items-center mt-[200px]'>
        <div>
          <button className='focus:opacity-75' onClick={doctor}>
            <Image src="/doctor.jpg" width={400} height={400} alt='doctor' className='rounded-lg cursor-pointer' />
          </button>
          <p className='mt-2 text-xl text-sky-500 font-bold text-center'>I am a healthcare personnel.</p>
        </div>
        <div>
          <button className='focus:opacity-75' onClick={patient}>
            <Image src="/patient.jpg" width={400} height={400} alt='patient' className='ml-5 rounded-lg cursor-pointer' />
          </button>
          <p className='mt-2 text-xl text-sky-500 font-bold text-center'>I am a patient.</p>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button className='border border-sky-500 text-lg text-sky-500 font-bole hover:bg-sky-500 hover:text-white w-96 h-8 mt-5 rounded-md' onClick={next}>NEXT</button>
      </div>
    </div>
  );
}
