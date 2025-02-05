import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const { search } = await request.json();
  
    await dbConnect();

    const frtoken = request.headers.get('Authorization')?.split(' ')[1];

    if (!frtoken) {
        return NextResponse.json(
            { error: 'Authorization token is required' },
            { status: 401 }
        );
    }

    try {
        const user = await User.findOne({ token: frtoken });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const matchingUsers = await User.find({ qrcodestring: search });        

        if (matchingUsers.length === 0) {
            return NextResponse.json({ message: 'No matching users found' }, { status: 405 });
        }

        const medicalDataArray = matchingUsers.map(user => user.medicaldata);

        return NextResponse.json({ medicaldata: medicalDataArray }, { status: 200 });

    } catch (err: any) {
        if (err.name === 'JsonWebTokenError') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
        } else if (err.name === 'TokenExpiredError') {
            return NextResponse.json({ error: 'Token expired' }, { status: 402 });
        }

        return NextResponse.json(
            { error: 'An error occurred while fetching users' },
            { status: 500 }
        );
    }
};
