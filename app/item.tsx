"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Items(emp){

	const router = useRouter()
    const empData = emp.emp;
    const handleDelete = async (id: number) => {
        await fetch('/api/employee?id=' + id, {
            method: 'DELETE'
        })

        router.refresh()
    }

    return (
        <tr className='bg-white border-b'>
            <td className='px-6 py-4'>{empData.name}</td>
            <td className='px-6 py-4'>{empData.email}</td>
            <td className='px-6 py-4'>{empData.phone}</td>
            <td className='px-6 py-4'>{empData.createdAt}</td>
            <td className='px-6 py-4'>
                <button className='font-semibold text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2' onClick={() => router.push(`/update/${empData.id}`)}>Update</button>
                <button className='font-semibold text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mb-2' onClick={() => handleDelete(empData.id)}>Delete</button>
            </td>
        </tr>
    )


}