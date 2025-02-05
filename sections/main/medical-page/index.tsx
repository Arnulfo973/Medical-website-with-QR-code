'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface MedicalData {
  name: string;
  birthday: string;
  address: string;
  country: string;
  city: string;
  zipcode: string;
  ethnicity: string;
  gender: string;
  phone: string;
  height: string;
  weight: string;
  importantinfo: string;
  medicalhistory: string;
  medication: string;
  allergie: string;
  phone2: string;
  name2: string;
  relationship: string;
  dnr: string;
  token: string;
}

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function MedicalPage() {

  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [ethnicity, setEthnicity] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [phone, setPhone] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [importantinfo, setImportantinfo] = useState<string>("");
  const [medicalhistory, setMedicalhistory] = useState<string>("");
  const [medication, setMedication] = useState<string>("");
  const [allergie, setAllergie] = useState<string>("");
  const [phone2, setPhone2] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [dnr, setDNR] = useState<string>("");

  const medicalData: MedicalData = {
    name: name,
    birthday: birth,
    address: address,
    country: country,
    city: city,
    zipcode: zipcode,
    ethnicity: ethnicity,
    gender: gender,
    phone: phone,
    height: height,
    weight: weight,
    importantinfo: importantinfo,
    medicalhistory: medicalhistory,
    medication: medication,
    allergie: allergie,
    phone2: phone2,
    name2: name2,
    relationship: relationship,
    dnr: dnr,
    token: userInfo.token
  };

  const onSubmit = async (medicalData: MedicalData) => {
    if (!name || !birth || !address || !country || !city || !zipcode || !ethnicity || !gender || !phone || !height || !weight || !importantinfo || !medicalhistory || !medication || !allergie || !phone2 || !name2 || !relationship || !dnr) {
      toast({
        title: 'Medical data incorrect!',
        description: 'Please enter all data!'
      });
      return;
    }

    try {
      const response = await fetch('/api/medicaldata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicalData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Medical data saving failed' };
      }

      toast({
        title: 'Medical data saving Successful!',
        description: 'Welcome! Medical data saving has been successful.'
      });

      location.reload();

      return await response.json();
    } catch (error) {
      toast({
        title: 'Medical data saving Failed!',
        description: 'Medical data saving has failed. Please try again.'
      });
      throw error;
    }
  };

  const save = async () => {
    const response = await onSubmit(medicalData);

    if (response && response.error) {
      console.error(response.error);
    } else {
      console.log('Success:', response);
    }
  };

  return (
    <div className='flex justify-center w-[96vw] bg-sky-500 py-10'>
      <div className='border w-[70vw] p-8 bg-white'>
        <div className='flex justify-between w-full items-center'>
          <Image src="/logo.png" width={100} height={100} alt='logo' />
          <button className='bg-sky-500 text-white font-bold w-16 h-9 rounded-md outline-none text-lg hover:animate-none hover:bg-sky-600 animate-pulse' onClick={save}>SAVE</button>
        </div>
        <div className='flex w-full justify-center'>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' />
          <p className='text-2xl font-bold text-sky-500 ml-3'>Personal Health Form</p>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' className='ml-3' />
        </div>
        <div className='flex mt-10'>
          <div className='w-[50%]'>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Date of Birth:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setBirth(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Address:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Country:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>City:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Zip Code:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setZipcode(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Ethnicity:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setEthnicity(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Gender:</p>
              <select className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Phone:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Height:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Weight:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-96' onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
          <div className='w-[50%]'>
            <p className='text-xl text-red-500 font-bold'>Important Information</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[90%] h-[90%] mt-2 text-gray-600 text-lg' onChange={(e) => setImportantinfo(e.target.value)}></textarea>
          </div>
        </div>
        <div className='mt-8'>
          <div className='h-36'>
            <p>Medical History:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg' onChange={(e) => setMedicalhistory(e.target.value)}></textarea>
          </div>
          <div className='h-36'>
            <p>Medications:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg' onChange={(e) => setMedication(e.target.value)}></textarea>
          </div>
          <div className='h-36'>
            <p>Allergies:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg' onChange={(e) => setAllergie(e.target.value)}></textarea>
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='w-[50%]'>
            <p className='text-lg text-red-500 font-bold'>In case of emergency, contact:</p>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Phone Number:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600' onChange={(e) => setPhone2(e.target.value)} />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600' onChange={(e) => setName2(e.target.value)} />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Relationship:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600' onChange={(e) => setRelationship(e.target.value)} />
            </div>
          </div>
          <div className='w-[50%]'>
            <p className='text-lg text-red-500 font-bold'>DNR/DNI</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[90%] h-[90%] mt-2 text-gray-600 text-lg' onChange={(e) => setDNR(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
