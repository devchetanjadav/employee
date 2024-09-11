"use client"

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react'

export default function UpdateEmployee({params} : {params : {id : string}}){
	const id = params.id;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter();

	const handleSubmit = async(e: any) => {
		e.preventDefault()
        setIsLoading(true)

        await fetch('/api/employee', {
            method: 'PUT', // Method put is to update
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, id
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)
		router.push('/')
	}

	useEffect(() => {
		getData()
	},[])

	const getData = async () => {
    	const res = await fetch('/api/employee/' + id)
        const json = await res.json()

        if (!json) {
            router.push('/404')
            return
        }

        setName(json.data.name)
        setEmail(json.data.email)
        setPhone(json.data.phone)
    }

    return (
		<form className='w-[500px] mx-auto pt-20 flex flex-col gap-3' onSubmit={handleSubmit}>
			<div className='mx-auto pb-5 font-bold'>Update Employee</div>
            <input type="text" placeholder='Input your name' value={name} onChange={(e) => setName(e.target.value)} className='w-full border p-2 rounded-md' />
           	<input type="text" placeholder='Input your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Input your phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full border p-2 rounded-md' />
            <button className='button' disabled={isLoading}>{isLoading ? 'Loading ...' : 'Update'}</button>
        </form>
	);
}