'use client'

import { User } from 'firebase/auth'
import { useAuthContext } from '../context/auth-provider'
import Avatar from './navbar/Avatar'
import { useEffect } from 'react'
import Link from 'next/link'
import { convertEmailToUserid } from '../helper/functions'
import { usePathname} from 'next/navigation'

export default function Navbar(){
    const { user } : { user : User | null } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    const pathname = usePathname();
    const classTemplate = 'pr-2 mx-16 hover:underline'
    const agriboxTemplate = pathname === `/${userid}/agribox` ? 'text-white ' + classTemplate : 'text-[#ABABAB] ' + classTemplate
    const agricloudTemplate = pathname === `/${userid}/agricloud` ? 'text-white ' + classTemplate : 'text-[#ABABAB] ' + classTemplate
    const agriforumTemplate = pathname === `/${userid}/forum` ? 'text-white ' + classTemplate : 'text-[#ABABAB] ' + classTemplate
    // useEffect(()=>{
    //     user?.getIdToken().then(val => console.log(`Bearer ${val} ${user?.email}`.split("Bearer ")[1].split(" ")[1]))
    // })
    return(
        <div className="bg-[#11200E]">
        <nav
            className='justify-between flex flex-row p-5 border-b-[1px]'
        >
            <h1 className="text-white">AgriVision</h1>
            {
                userid !== '' ? (
                    <div>
                        <Link href={`/${userid}/agribox`} className={agriboxTemplate}>AgriBox</Link>
                        <Link href={`/${userid}/agricloud`} className={agricloudTemplate}>AgriCloud</Link>
                        <Link href={`/${userid}/forum`} className={agriforumTemplate}>AgriForum</Link>
                    </div>
                ) : null
            }
            <Avatar src={null} userid={userid}/>
        </nav>
        </div>
    )
}