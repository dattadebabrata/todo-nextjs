import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import { User } from '@/models/db/userModel';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Named export for POST request
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        // Connect to database
        await connectToDatabase();

        // Find the user
        const user = await User.findOne({ email }).select('+password');
        console.log({user},'the user')
        if (!user || !user.password) {
            // Ensure we have a valid user and password
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Check if password is valid
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        // Set JWT token in cookies
        const cookie = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, // 1 hour
            path: '/',
        });

        return new NextResponse('Login successful', {
            status: 200,
            headers: { 'Set-Cookie': cookie },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
