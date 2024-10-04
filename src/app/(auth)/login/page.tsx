'use client'
import "./LoginComponent.scss";
import {useCallback, useState} from "react";
import InputComponent from "@/components/form-controls/input/InputComponent";
import PasswordComponent from "@/components/form-controls/password/PasswordComponent";
import ButtonComponent from "@/components/button/ButtonComponent";
import ImageConfig from "@/constrant/ImageConfig";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface LoginComponentProps {

}

const Page = (props: LoginComponentProps) => {
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleUpdateFormValue = useCallback((key: string, value: string) => {
        setLoginFormData((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }, [])

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await fetch('/login/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginFormData),
            });

            const result = await response.json();
            if (response.ok) {
                // Redirect to dashboard after successful login
                router.push('/dashboard');
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred during login.');
        }
    }, [loginFormData, router]);

    return (
        <div className={'login-component'}>
            <div className="auth-form-wrapper">
                <form onSubmit={handleLogin}>
                    <InputComponent type={"email"} value={loginFormData.email} placeholder={"Enter Email"}
                                    onChange={(value) => {
                                        handleUpdateFormValue('email', value)
                                    }}/>
                    <PasswordComponent value={loginFormData.password} onChange={(value) => {
                        handleUpdateFormValue('password', value)
                    }}/>
                    <ButtonComponent color={'secondary'} type={"submit"}>Login</ButtonComponent>
                    <span>Don&apos;t have account? <Link href={'/signup'}>Signup</Link></span>
                </form>
                {error && <div className="error-message">{error}</div>}
                <ButtonComponent variant={'outlined'} color={'secondary'} prefixIcon={<ImageConfig.GoogleIcon/>}>Google</ButtonComponent>
            </div>
        </div>
    );

};

export default Page;
