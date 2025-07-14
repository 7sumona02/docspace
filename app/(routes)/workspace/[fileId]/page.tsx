'use client'
import React, { useEffect, useState } from 'react'
import Header from '../_components/Header'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/page'
import Canvas from '../_components/Canvas'

const page = ({params}:any) => {
    const convex = useConvex()
    const [triggerSave, setTriggerSave] = useState(false)
    const [fileData, setFileData] = useState<FILE|any>()

    useEffect(() => {
        params.fileId&&getFileData()
    },[])
    const getFileData = async() => {
        const result = await convex.query(api.files.getFileById,{_id:params.fileId})
        // console.log(result)
        setFileData(result)
    }
  return (
    <div>
        <Header onSave={() => setTriggerSave(!triggerSave)} />
        <div className='w-screen min-h-screen grid md:grid-cols-2 grid-cols-1'>
                <div className=''>
                    <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
                </div>
                <div className='min-h-screen border-l'>
                    <Canvas />
                </div>
        </div>
    </div>
  )
}

export default page