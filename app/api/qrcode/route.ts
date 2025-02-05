import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const { token, qrcode } = await request.json();

    await dbConnect();

    try {
        // Find the user by the token
        const user = await User.findOne({ token: token });

        // If user does not exist, return an error
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Compare qrcode with user's qrcodestring
        const { qrcodestring } = user;

        if (!qrcodestring) {
            // Update the user's qrcodestring
            user.qrcodestring = qrcode;
            await user.save();
            return NextResponse.json({ message: 'QR code updated' }, { status: 200 });
        } else if (qrcodestring !== qrcode) {
            return NextResponse.json({ message: 'QR code already exists' }, { status: 502 });
        }
        else {
            // qrcodestring is the same as qrcode
            return NextResponse.json(
                { message: 'OK', qrcode: qrcode },
                { status: 201 }
            ); 
        }

    } catch (err: any) {
        console.log(err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
};
