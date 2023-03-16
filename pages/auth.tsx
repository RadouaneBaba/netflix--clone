import Image from 'next/image'
import Input from '../components/Input'
import axios from 'axios'
import { useState, useCallback } from 'react'
import { signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [variant, setVariant] = useState('login');
    //toggle sign up and login modes
    const toggleVariant = useCallback(()=>{
        setVariant((prevVariant)=>prevVariant == 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        try{
            await signIn('credentials',{
                email,
                password,
                callbackUrl: '/profiles',
            })
            
        }catch(err){
            console.log(err);
        }
    },[email,password])

    const register = useCallback(async ()=>{
        try{
            await axios.post('/api/register', {
                email,
                name,
                password,
            })
            login();                
        }catch(err){
            console.log(err);
        }
    },[email, name, password, login]);


    return (
        <div className="bg-[url('/images/hero.jpg')] h-full w-full">
            <div className="bg-black lg:bg-opacity-50 h-full w-full">
                <nav className="px-12 py-5">
                    <Image 
                    src="/images/logo.png"
                    alt="Logo"
                    width={166}
                    height={45} />
                </nav>
                <div className="flex justify-center">
                    <div className="lg:w-2/5 lg:max-w-md bg-black bg-opacity-70 p-16 self-center rounded-md mt-2 w-full">
                        <h2 className="text-white text-4xl font-semibold mb-8">{variant == 'login' ? 'Sign In' : 'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' && (<Input 
                              id="name"
                              label="Username"
                              value={name}
                              onChange={(event:any)=>setName(event.target.value)}
                            />)}
                            <Input 
                              id="email"
                              type="email"
                              label="Email"
                              value={email}
                              onChange={(event:any)=>setEmail(event.target.value)}
                            />
                            <Input 
                              id="password"
                              type="password"
                              label="Password"
                              value={password}
                              onChange={(event:any)=>setPassword(event.target.value)}
                            />
                            <button onClick={variant=='login'?login:register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">{variant == 'login' ? 'Sign In': 'Sign up'}</button>   
                            <div className="flex items-center gap-4 mt-8 justify-center">
                                <div onClick={()=>signIn('google', {callbackUrl: '/profiles'})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FcGoogle size={30} />
                                </div>
                                <div onClick={()=>signIn('github', {callbackUrl: '/profiles'})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FaGithub size={30} />
                                </div>
                            </div>
                            <p className="text-neutral-500 mt-12">{variant == 'login' ? 'New to Netflix?' : 'Already have an account'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline hover:cursor-pointer">{variant == 'login'?'Sign up now' : 'Sign In'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}