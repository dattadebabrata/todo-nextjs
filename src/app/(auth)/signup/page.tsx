'use client';
import "./SignupComponent.scss";
import InputComponent from "@/components/form-controls/input/InputComponent";
import PasswordComponent from "@/components/form-controls/password/PasswordComponent";
import ButtonComponent from "@/components/button/ButtonComponent";
import ImageConfig from "@/constants/ImageConfig";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignupComponent: React.FC = () => {
    const [signupFormData, setSignupFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleUpdateFormValue = useCallback((key: keyof SignupFormData, value: string) => {
        setSignupFormData(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSignup = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const response = await fetch('/signup/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupFormData),
            });

            const result = await response.json();
            if (result.status === 201) {
                // Redirect to a welcome page or dashboard after successful signup
                router.push('/login');
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred during signup.');
        }
    }, [signupFormData, router]);

    return (
        <div className={'signup-component'}>
            <div className="auth-form-wrapper">
                <form onSubmit={handleSignup}>
                    <InputComponent
                        type="text"
                        value={signupFormData.name}
                        placeholder="Enter Name"
                        onChange={value => handleUpdateFormValue('name', value)}
                    />
                    <InputComponent
                        type="email"
                        value={signupFormData.email}
                        placeholder="Enter Email"
                        onChange={value => handleUpdateFormValue('email', value)}
                    />
                    <PasswordComponent
                        value={signupFormData.password}
                        onChange={value => handleUpdateFormValue('password', value)}
                    />
                    {error && <div className="error-message">{error}</div>}
                    <ButtonComponent color="secondary" type="submit">Signup</ButtonComponent>
                    <span>Already have an account? <Link href="/login">Login</Link></span>
                </form>
                <ButtonComponent variant="outlined" color="secondary" prefixIcon={<ImageConfig.GoogleIcon />}>
                    Google
                </ButtonComponent>
            </div>
        </div>
    );
};

export default SignupComponent;
