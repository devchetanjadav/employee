import Link from 'next/link'
import React from 'react'
import Item from './item'

const getEmployees  = async () => {    
  // Because this is server components, we have to define the URL with http
  const res = await fetch(process.env.BASE_URL + '/api/employee', { next: { revalidate: 0 } })
  
  // Define the output to json, because if only res, it will return by any type
  const json = await res.json() 
  return json
}

export default async function Employees(){

  const employees = await getEmployees()

  return (
        <div className='w-[1200px] mx-auto py-10'>
            <div className='mx-auto pb-5 font-bold'>Employee List</div> <hr /> <br />

            <Link href={"/create"} className='px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white'>Create</Link>

            <table className="w-full text-left text-gray-500 mt-5">
              <thead className='text-gray-700 bg-gray-50'>
                <tr>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Email</th>
                  <th className='px-6 py-3'>Phone</th>
                  <th className='px-6 py-3'>Create Date</th>
                  <th className='px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.empData.map((emp: any, i: number) => (
                  <Item key={i} emp={emp} />
                ))}

                {/*{employees.empData.forEach((emp, index) => {
                  console.log(emp)
                  //<Item emp={emp} />                  
                })}*/}
              </tbody>
            </table>

        </div>
    )
}