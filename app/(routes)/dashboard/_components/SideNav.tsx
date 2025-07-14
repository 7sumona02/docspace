'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useConvex, useMutation } from "convex/react"
import { Archive, ChevronDown, Flag, Github, LayoutGrid, Settings, Users } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { FilesListContext } from "@/app/_context/FilesListContext"

export interface TEAM {
    createdBy: string,
    teamName: string,
    _id: string
}

const SideNav = () => {
    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users
        },
        {
            id: 2,
            name: 'Settings',
            path: '/',
            icon: Settings
        }
    ]

    const menuList = [
        {
            id: 1,
            name: 'Getting Started',
            icon: Flag,
            path: '/'
        },
        {
            id: 2,
            name: 'Github',
            icon: Github,
            path: '/'
        },
        {
            id: 3,
            name: 'Archive',
            icon: Archive,
            path: '/'
        },
    ]

    const [fileInput, setFileInput] = useState('')

    const convex = useConvex()
    const [activeTeam, setActiveTeam] = useState<TEAM | null>(null)
    const [teamList, setTeamList] = useState<TEAM[]>([])
    const { user }: any = useKindeBrowserClient()
    const router = useRouter()
    const createFile = useMutation(api.files.createFile)
    const [totalFiles,setTotalFiles] = useState<Number>()
    const {fileList_,setFileList_} = useContext(FilesListContext)
    
    const onFileCreate = (fileName: string) => {
        console.log(fileName)
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id || '',
            createdBy: user?.email,
            archive: false,
            document: '',
            whiteboard: ''
        }).then(resp => {
            if(resp){
                toast('File created successfully!')
            }
        },(e)=>{
            toast("Error while creating file")
        })
    }

    useEffect(() => {
        user && getTeamList()
    }, [user])
    
    // useEffect(() => {
    //     activeTeam?setActiveTeamInfo(activeTeam)
    // },[activeTeam])
    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email })
        console.log(result)
        setTeamList(result)
        if (result.length > 0) {
            setActiveTeam(result[0])
        }
    }

    const handleTeamSelect = (team: TEAM) => {
        setActiveTeam(team)
    }

    const onMenuCLick = (item:any) => {
        if(item.path){
            router.push((item.path))
        }
    }

    useEffect(() =>{
        activeTeam&&getFiles()
    },[activeTeam])
    const getFiles = async() => {
        const result = await convex.query(api.files.getFiles,{teamId:activeTeam?._id || ''})
        console.log(result)
        setFileList_(result)
        setTotalFiles(result?.length)
    }
    
    return (
        <div className="w-[20rem] bg-neutral-100 h-screen p-4 space-y-10 relative">
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between gap-2 bg-neutral-200 py-2 px-4 rounded-lg w-full">
                        {activeTeam?.teamName} <ChevronDown size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-[18rem]">
                        {teamList.map((team) => (
                            <DropdownMenuLabel 
                                key={team._id}
                                onClick={() => handleTeamSelect(team)}
                                className={activeTeam?._id === team._id ? "bg-gray-100" : ""}
                            >
                                {team.teamName}
                            </DropdownMenuLabel>
                        ))}
                        <DropdownMenuSeparator />
                        {menu.map((item) => (
                            <DropdownMenuItem key={item.id} className="flex gap-2" onClick={() => onMenuCLick(item)}>
                                <item.icon size={16} />
                                {item.name}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <div className="p-1">
                            <Button asChild size="sm" className="w-full">
                                <LogoutLink>
                                    <span>Log out</span>
                                </LogoutLink>
                            </Button>
                        </div>
                        <DropdownMenuSeparator />
                        {user && (
                            <div className="flex items-center gap-2 p-2">
                                <div>
                                    <Image 
                                        alt='profile' 
                                        className="rounded-full" 
                                        width={32} 
                                        height={32} 
                                        src={user.picture || 'https://lh3.googleusercontent.com/a/ACg8ocIzonCXWDxn12DJ2r0CScapY3we0nSFdfQnAdq0S0tgYyOQjdHB=s96-c'} 
                                    />
                                </div>
                                <div className="text-sm flex flex-col">
                                    <div className="font-medium">
                                        {user.given_name} {user.family_name}
                                    </div>
                                    <div className="text-neutral-600">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <Button variant={'outline'} className="w-full flex justify-start"><LayoutGrid />All Files</Button>
            </div>
            <div className="absolute bottom-6 space-y-1">
                {menuList.map((menu) => (
                    <p className="flex items-center gap-2 hover:underline" key={menu.id}><menu.icon className="w-5" />{menu.name}</p>
                ))}
                <Dialog>
                    <DialogTrigger><Button className="w-[18rem] mt-4">New File</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New File</DialogTitle>
                            <Input onChange={(e) => setFileInput(e.target.value)} className="mt-3" placeholder="Enter File Name" />
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => onFileCreate(fileInput)} type="button" disabled={!(fileInput&&fileInput.length>0)}>
                                Create
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
                <Progress value={totalFiles ? (Number(totalFiles)/5)*100 : 0} className="mt-4" />
                <div className="mt-4">
                    <p className="text-sm">{totalFiles?.toString()} out of 5 files used</p>
                    <p>Upgrade for unlimited access.</p>
                </div>
            </div>
        </div>
    )
}

export default SideNav