import {NextResponse} from 'next/server';
import {User} from '@/models/db/userModel';
import {connectToDatabase} from '@/lib/utils';
import {hash} from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const signupFormData = await req.json();

        await connectToDatabase();

        const existingUser = await User.findOne({email: signupFormData.email});
        if (existingUser) {
            return NextResponse.json({message: 'Email already exists!'});
        }

        const hashedPassword = await hash(signupFormData.password, 10);
        const newUser = await User.create({
            name: signupFormData.name,
            email: signupFormData.email,
            password: hashedPassword,
            role: signupFormData.role || 'user',
            isActive: true,
            isAdmin: signupFormData.role === 'admin',
        });

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        return NextResponse.json({data: userWithoutPassword},{status:201});
    } catch (error) {
        console.error('Error during signup:', error);
        return NextResponse.json({status: 500, error: 'Internal server error'});
    }
}


export async function GET(request: Request) {
    return NextResponse.json({ error: 'Internal Server Error bhai' }, { status: 200 })
}
