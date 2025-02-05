'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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

  const [userdata, setUserdata] = useState<MedicalData[]>([]);
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

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userInfo.token) {
          throw new Error('User not authenticated.');
        }

        const response = await fetch('/api/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        setUserdata(result.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    if (userdata.length > 0) {
      setName(userdata[0].name);
      setBirth(userdata[0].birthday);
      setAddress(userdata[0].address);
      setCountry(userdata[0].country);
      setCity(userdata[0].city);
      setZipcode(userdata[0].zipcode);
      setEthnicity(userdata[0].ethnicity);
      setGender(userdata[0].gender);
      setPhone(userdata[0].phone);
      setHeight(userdata[0].height);
      setWeight(userdata[0].weight);
      setImportantinfo(userdata[0].importantinfo);
      setMedicalhistory(userdata[0].medicalhistory);
      setMedication(userdata[0].medication);
      setAllergie(userdata[0].allergie);
      setPhone2(userdata[0].phone2);
      setName2(userdata[0].name2);
      setRelationship(userdata[0].relationship);
      setDNR(userdata[0].dnr);
    }
  }, [userdata])

  const handleChange = (e: any) => {
    const { value } = e.target;

    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{2})\/(\d{0,4})/, '$1/$2')
      .substring(0, 10);

    setBirth(formattedValue);
  };

  const handleChangeZipcode = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setZipcode(value);
  };

  const handleChangePhone = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  };

  const handleChangePhone2 = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone2(value);
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
      <div className='border w-[100vw] xl:w-[75vw] p-8 bg-white'>
        <div className='flex justify-between w-full items-center'>
          <Image src="/logo.png" width={100} height={100} alt='logo' />
          <button className='bg-sky-500 text-white font-bold w-16 h-9 rounded-md outline-none text-lg hover:animate-none hover:bg-sky-600 animate-pulse' onClick={save}>SAVE</button>
        </div>
        <div className='flex w-full justify-center mt-5'>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' />
          <p className='text-2xl font-bold text-sky-500 ml-3 text-center'>Personal Health Form</p>
          <Image src="/red-cross.png" width={30} height={30} alt='red-cross' className='ml-3' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
          <div className='md:px-2'>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setName(e.target.value)} defaultValue={name} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Date of Birth:</p>
              <input
                className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                value={birth}
                onChange={handleChange}
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Address:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setAddress(e.target.value)} defaultValue={address} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Country:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setCountry(e.target.value)} defaultValue={country} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>City:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setCity(e.target.value)} defaultValue={city} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Zip Code:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                value={zipcode} onChange={handleChangeZipcode} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Ethnicity:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setEthnicity(e.target.value)} defaultValue={ethnicity} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Gender:</p>
              <select className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setGender(e.target.value)} value={gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Phone:</p>
              <input
                type='tel'
                className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                value={phone}
                onChange={handleChangePhone}
              />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Height:</p>
              <input type='number' className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setHeight(e.target.value)} defaultValue={height} />
            </div>
            <div className='flex mt-1 items-center'>
              <p className='w-32 xl:w-44'>Weight:</p>
              <input type='number' className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setWeight(e.target.value)} defaultValue={weight} />
            </div>
          </div>
          <div>
            <p className='text-xl text-red-500 font-bold mt-5 md:mt-0'>Important Information</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-full h-[90%] mt-2 text-gray-600 text-lg'
              onChange={(e) => setImportantinfo(e.target.value)} defaultValue={importantinfo}></textarea>
          </div>
        </div>
        <div className='mt-12'>
          <div className='h-36'>
            <p>Medical History:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg'
              onChange={(e) => setMedicalhistory(e.target.value)} defaultValue={medicalhistory}></textarea>
          </div>
          <div className='h-36'>
            <p>Medications:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg'
              onChange={(e) => setMedication(e.target.value)} defaultValue={medication}></textarea>
          </div>
          <div className='h-36'>
            <p>Allergies:</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-[100%] h-28 rounded-md text-gray-600 text-lg'
              onChange={(e) => setAllergie(e.target.value)} defaultValue={allergie}></textarea>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
          <div>
            <p className='text-lg text-red-500 font-bold'>In case of emergency, contact:</p>
            <div className='flex mt-2 items-center'>
              <p className='w-32 xl:w-44'>Phone:</p>
              <input
                type='tel'
                className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                value={phone2}
                onChange={handleChangePhone2}
              />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-32 xl:w-44'>Name:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setName2(e.target.value)} defaultValue={name2} />
            </div>
            <div className='flex mt-2 items-center'>
              <p className='w-32 xl:w-44'>Relationship:</p>
              <input className='border border-sky-500 rounded-md text-lg outline-none px-3 py-1 text-gray-600 w-full sm:w-72'
                onChange={(e) => setRelationship(e.target.value)} defaultValue={relationship} />
            </div>
          </div>
          <div className='mt-5 md:mt-0 '>
            <p className='text-lg text-red-500 font-bold'>DNR/DNI</p>
            <textarea className='border border-sky-500 outline-none px-2 py-1 w-full h-[90%] mt-2 text-gray-600 text-lg'
              onChange={(e) => setDNR(e.target.value)} defaultValue={dnr}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
