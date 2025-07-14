import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='sticky top-0 border-b border-neutral-200 backdrop-blur-sm bg-white/20 w-screen px-10 py-4 flex items-center justify-between'>
        <div><p className='font-sans font-semibold text-lg'>docspace</p></div>
        <div><Button><Share />Share</Button></div>
    </div>
  )
}

export default Header