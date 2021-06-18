import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Axios from 'axios';
import {useRouter} from 'next/router';

import InputGroup from '../components/InputGroup'
import { useAuthState } from '../context/auth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter()
    const { authenticated } = useAuthState()
    if (authenticated) router.push('/')

    const submitForm = async (event: FormEvent) =>{
        event.preventDefault()

        if(!agreement){
            setErrors({...errors, agreement: 'You must agree to T&Cs'})
            return
        }

        try {
            const res = await Axios.post('/auth/register',{
                email, password, username
            },{withCredentials: true})
            router.push('/login')
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    return (
        <div className="flex bg-white">
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-40 h-screen bg-center bg-cover" 
            style={{backgroundImage: "url('/images/bricks.jpg')"}}>
            </div>

            <div className="flex flex-col justify-center pl-6">
                <div className="w-70">
                    <div className="mb-2 text-lg font-medium">Sign Up</div>
                    <form onSubmit={submitForm}>
                    <div className="mb-6">
                        <input
                            type="checkbox"
                            className="mr-1 cursor-pointer"
                            checked={agreement}
                            onChange={e => setAgreement(e.target.checked)}
                            id="agreement"
                        />
                        <label htmlFor="agreement" className="text-xs cursor-pointer">
                            I agree and accept the terms and conditions.
                        </label>
                        <small className="block font-medium text-red-600">
                            {errors.agreement}
                        </small>
                        </div>
                        <InputGroup
                            className="mb-2"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            placeholder="EMAIL"
                            error={errors.email}
                        />
                        <InputGroup
                            className="mb-2"
                            type="text"
                            value={username}
                            setValue={setUsername}
                            placeholder="USERNAME"
                            error={errors.username}
                        />
                        <InputGroup
                            className="mb-4"
                            type="password"
                            value={password}
                            setValue={setPassword}
                            placeholder="PASSWORD"
                            error={errors.password}
                        />
                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase transition duration-500 ease-in-out bg-blue-500 border border-blue-500 rounded transform hover:-translate-y-1 hover:scale-105 ...">
                            Sign Up
                        </button>
                    </form>
                    <small>
                        Already use The Pit Stop?
                        <Link href="/login">
                        <a className="ml-1 text-blue-500 uppercase">Log In!</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    )
}
