'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const page = () => {

    const convex = useConvex()
    const {user}:any =useKindeBrowserClient()
    const getUser = useQuery(api.user.getUser, {email: user?.email})

    const createUser = useMutation(api.user.createUser)
    useEffect(() => {
        if(user){
            checkUser()
        }
    },[user])

    const checkUser= async() => {
        const result = await convex.query(api.user.getUser, {email:user?.email})
        if(!result?.length){
                createUser({
                    name: user.given_name,
                    email: user.email,
                    image: user.picture
                }).then((resp) => {
                    console.log(resp)
                })
            }
    }
  return (
    <div className='p-4 w-[65rem]'>
        {/* <Button
                                    asChild
                                    size="sm">
                                    <LogoutLink>
                                        <span>Log out</span>
                                    </LogoutLink>
                                </Button> */}
        <div className='flex items-center justify-end gap-3'>
            <div className="*:not-first:mt-2 w-70">
                <div className="relative">
                    <Input className="peer ps-9" placeholder="Search" />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <Search size={16} aria-hidden="true" />
                    </div>
                </div>
            </div>
            <div>
                <Image src={user?.picture} alt='profile' height={34} width={34} className='rounded-full'  />
            </div>
            <div>
                <Button size={'sm'}><Send />Send Invite</Button>
            </div>
        </div>
        <div className='pt-14'>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">File Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Edited</TableHead>
                    <TableHead className="text-right">Author</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default page