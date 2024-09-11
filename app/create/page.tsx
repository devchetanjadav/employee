"use client"
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

export default function CreateEmployee(){

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter();

	const handleSubmit = async(e: any) => {
		e.preventDefault()
        setIsLoading(true)

        await fetch('/api/employee',{
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body:JSON.stringify({
        		name, email, phone
        	})
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log("Create Error")
            console.log(e)
        })

        setIsLoading(false)
        router.push('/')
	}

	return (
		<form className='w-[500px] mx-auto pt-20 flex flex-col gap-3' onSubmit={handleSubmit}>
			<div className='mx-auto pb-5 font-bold'>Create Employee</div>
            <input type="text" placeholder='Input your name' value={name} onChange={(e) => setName(e.target.value)} className='w-full border p-2 rounded-md' />
           	<input type="text" placeholder='Input your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Input your phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full border p-2 rounded-md' />
            <button className='button' disabled={isLoading}>{isLoading ? 'Loading ...' : 'Save'}</button>
        </form>
	);
}