'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface SearchData {
  search: string;
}

interface ResultData {
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
}

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function MedicalPage() {

  const [searchData, setSearchData] = useState<string>("");
  const [resultData, setResultData] = useState<ResultData[]>([]);
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [ethnicity, setEthnicity] = useState<string>("");
  const [gender, setGender] = useState<string>("");
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

  useEffect(() => {
    if (resultData.length > 0) {
      setName(resultData[0].name);
      setBirth(resultData[0].birthday);
      setAddress(resultData[0].address);
      setCountry(resultData[0].country);
      setCity(resultData[0].city);
      setZipcode(resultData[0].zipcode);
      setEthnicity(resultData[0].ethnicity);
      setGender(resultData[0].gender);
      setPhone(resultData[0].phone);
      setHeight(resultData[0].height);
      setWeight(resultData[0].weight);
      setImportantinfo(resultData[0].importantinfo);
      setMedicalhistory(resultData[0].medicalhistory);
      setMedication(resultData[0].medication);
      setAllergie(resultData[0].allergie);
      setPhone2(resultData[0].phone2);
      setName2(resultData[0].name2);
      setRelationship(resultData[0].relationship);
      setDNR(resultData[0].dnr);
    }
  }, [resultData])


  const searchdata: SearchData = {
    search: searchData,
  };

  const onSubmit = async (searchdata: SearchData) => {
    if (!searchData) {
      toast({
        title: '🙁️ Search input empty!',
        description: 'Please enter Search data!'
      });
      return;
    }

    try {
      const response = await fetch('/api/getmedicaldata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(searchdata)
      });

      if (response.status == 405) {
        toast({
          title: '😭️ No matching users found!',
          description: 'Please enter correctly, again.'
        });
        return
      }

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Medical Code saving failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      const response = await onSubmit(searchdata);

      if (response && response.error) {
        console.error(response);
      } else {

        if (response!= undefined) {
          setResultData(response.medicaldata[0]);
        } else{
          return;
        }
      }
    } else {
      return
    }
  };

  return (
    <div className='flex justify-center w-[96vw] bg-sky-500 py-10'>
      <div className='border w-[70vw] p-8 bg-white'>
        <div className='flex justify-between w-full items-center'>
          <Image src="/logo.png" width={100} height={100} alt='logo' />
          <div className='flex items-center'>
            <p className='text-sky-500 text-xl font-semibold mr-3'>Patient's QR Code</p>
            <input className='border border-sky-500 px-2 py-1 font-semibold w-52 h-9 rounded-md outline-none text-lg text-gray-500 bg-white' placeholder='Search...' onChange={(e) => setSearchData(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
        </div>
        <div className='flex w-full justify-center'>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' />
          <p className='text-2xl font-bold text-sky-500 ml-3'>Personal Health Form</p>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' className='ml-3' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
          <div className='md:px-2'>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={name} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Date of Birth:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={birth} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Address:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={address} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Country:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={country} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>City:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={city} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Zip Code:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={zipcode} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Ethnicity:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={ethnicity} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Gender:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={gender} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Phone:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={phone} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Height:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={height} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-44'>Weight:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={weight} />
            </div>
          </div>
          <div className='md:px-2'>
            <p className='text-xl text-red-500 font-bold'>Important Information</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[90%] h-[90%] mt-2 text-gray-600 text-lg bg-white' value={importantinfo}></textarea>
          </div>
        </div>
        <div className='mt-8'>
          <div className='h-36'>
            <p>Medical History:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg bg-white' value={medicalhistory}></textarea>
          </div>
          <div className='h-36'>
            <p>Medications:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg bg-white' value={medication}></textarea>
          </div>
          <div className='h-36'>
            <p>Allergies:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg bg-white' value={allergie}></textarea>
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='w-[50%]'>
            <p className='text-lg text-red-500 font-bold'>In case of emergency, contact:</p>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Phone Number:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={phone2} />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={name2} />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-44'>Relationship:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72 bg-white' value={relationship} />
            </div>
          </div>
          <div className='w-[50%]'>
            <p className='text-lg text-red-500 font-bold'>DNR/DNI</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[90%] h-[90%] mt-2 text-gray-600 text-lg bg-white' value={dnr}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
