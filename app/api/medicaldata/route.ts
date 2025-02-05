import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { token, name, birthday, address, country, city, zipcode, ethnicity, gender, phone, height, weight, importantinfo, medicalhistory, medication, allergie, phone2, name2, relationship, dnr } = await request.json();
  await dbConnect();

  try {
    const user = await User.findOne({ token: token });

    if (user) {
      if (user.medicaldata.length === 0) {
        user.medicaldata.push({
          name,
          birthday,
          address,
          country,
          city,
          zipcode,
          ethnicity,
          gender,
          phone,
          height,
          weight,
          importantinfo,
          medicalhistory,
          medication,
          allergie,
          phone2,
          name2,
          relationship,
          dnr,
        });
      } else {
        const lastEntryIndex = user.medicaldata.length - 1;
        user.medicaldata[lastEntryIndex] = {
          name,
          birthday,
          address,
          country,
          city,
          zipcode,
          ethnicity,
          gender,
          phone,
          height,
          weight,
          importantinfo,
          medicalhistory,
          medication,
          allergie,
          phone2,
          name2,
          relationship,
          dnr,
        };
      }

      try {
        await user.save();

        return NextResponse.json(
          {
            ok: 'Medicaldata updated successfully'
          },
          { status: 200 }
        ); 
      } catch (err: any) {
        return NextResponse.json(
          { error: 'Failed to save updated user' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};