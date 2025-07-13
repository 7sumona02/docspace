'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const Page = () => {
    const [teamName, setTeamName] = useState('')
    const createTeam = useMutation(api.teams.createTeam)
    const {user}:any = useKindeBrowserClient()
    const router = useRouter()

    const createNewTeam= () => {
        createTeam({
           teamName: teamName,
           createdBy: user?.email
        }).then((res) =>{
            console.log(res)
            if(res){
                router.push('/dashboard')
                toast('Team created successfully')
            }
        })
    }
  return (
    <div className="h-screen max-w-2xl mx-auto text-3xl font-medium flex items-center justify-center flex-col space-y-7">
        <h1 className="text-center">Enter Team name</h1>
        <Input onChange={(e) => setTeamName(e.target.value)} type="Team name" placeholder="Team name" className="w-sm mx-auto" />
        <Button onClick={() => createNewTeam()} disabled={!teamName&&teamName?.length>0}>Create Team</Button>
    </div>
  )
}

export default Page