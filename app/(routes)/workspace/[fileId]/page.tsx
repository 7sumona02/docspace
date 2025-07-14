import React from 'react'
import Header from '../_components/Header'
import Editor from '../_components/Editor'

const page = () => {
  return (
    <div>
        <Header />
        <div className='w-screen min-h-screen grid md:grid-cols-2 grid-cols-1'>
                <div className=''>
                    <Editor />
                </div>
                <div className='bg-blue-300'></div>
        </div>
    </div>
  )
}

export default page