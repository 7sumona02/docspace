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
import { useConvex } from "convex/react"
import { ChevronDown, LayoutGrid, Settings, Users } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

    const convex = useConvex()
    const [activeTeam, setActiveTeam] = useState<TEAM | null>(null)
    const [teamList, setTeamList] = useState<TEAM[]>([])
    const { user }: any = useKindeBrowserClient()
    const router = useRouter()
    
    useEffect(() => {
        user && getTeamList()
    }, [user])
    
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
    
    return (
        <div className="w-[20rem] bg-neutral-100 h-screen p-4 space-y-10">
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between gap-2 bg-neutral-200 py-2 px-4 rounded-lg w-full">
                        {activeTeam ? activeTeam.teamName : "Select Team"} <ChevronDown size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-full">
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
        </div>
    )
}

export default SideNav