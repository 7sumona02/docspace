import { Button } from '@/components/ui/button'
import { Save, Share } from 'lucide-react'
import React from 'react'

const Header = ({onSave}:any) => {
  return (
    <div className='border-b border-neutral-200 backdrop-blur-lg bg-white/20 w-screen px-10 py-4 flex items-center justify-between'>
        <div><p className='font-sans font-semibold text-lg'>docspace</p></div>
        <div className='space-x-3'>
            <Button onClick={() => onSave()}><Save />Save</Button>
            <Button><Share />Share</Button>
        </div>
    </div>
  )
}

export default Header