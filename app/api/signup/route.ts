import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { fullname, email, password } = await request.json();
  await dbConnect();
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const lastUser = await User.find({}).sort({ tag: -1 }).limit(1);
      let newCode = 1000;

      if (lastUser.length > 0 && lastUser[0].tag >= 1000) {
        newCode = lastUser[0].tag + 1;
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        tag: newCode
      });      

      console.log(newUser);
      

      try {
        await newUser.save();

        return NextResponse.json(
          {
            ok: 'User created',
            email
          },
          { status: 201 }
        );
      } catch (err: any) {
        return new NextResponse(err.message, { status: 501 });
      }
    } else {
      return NextResponse.json(
        { error: 'User Already Exists'},
        { status: 409 }
      ); 
    }
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 }); 
  }
};
