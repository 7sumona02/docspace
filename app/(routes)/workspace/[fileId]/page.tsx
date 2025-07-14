import React from 'react'
import Header from '../_components/Header'

const page = () => {
  return (
    <div>
        <Header />
        <div className='w-screen min-h-screen bg-red-50 grid md:grid-cols-2 grid-cols-1'>
                <div className='bg-green-300'></div>
                <div className='bg-blue-300'></div>
        </div>
    </div>
  )
}

export default page