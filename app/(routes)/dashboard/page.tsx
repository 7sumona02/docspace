'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { Archive, MoreHorizontal, Search, Send } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FilesListContext } from '@/app/_context/FilesListContext'
import moment from 'moment'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface FILE{
    archive: boolean
    createdAt: string
    document: string
    fileName: string
    teamId: string
    whiteboard: string
    _id: string
    _creationTime: number
}

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

    const {fileList_, setFileList_} = useContext(FilesListContext)
    const [fileList, setFileList] = useState<any>()

    useEffect(() => {
      fileList_&&setFileList(fileList_)
      console.log(fileList_)
    }, [fileList_])
    
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
    {fileList && fileList.map((file: FILE, index: number) => {
        return (
            <TableRow key={index}>
                <TableCell className="font-medium">{file.fileName}</TableCell>
                <TableCell>{moment(file.createdAt).format('DD MMM YYYY')}</TableCell>
                <TableCell>{moment(file.createdAt).format('DD MMM YYYY')}</TableCell>
                <TableCell className="flex justify-end">
                    <Image src={user?.picture} alt='profile' height={34} width={34} className='rounded-full'  />
                </TableCell>
                <TableCell className="pl-10">
                    <DropdownMenu>
                    <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><Archive />Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        );
    })}
</TableBody>
            </Table>
        </div>
    </div>
  )
}

export default page