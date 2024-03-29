'use client'

import { User } from 'firebase/auth'
import { useAuthContext } from '../context/auth-provider'
import Avatar from './navbar/Avatar'
import Link from 'next/link'
import { convertEmailToUserid } from '../helper/functions'
import { usePathname } from 'next/navigation'
import { twClassMerge } from '../helper/functions'

const linkTemplate = 'pr-2 mx-16 hover:text-[#D9D9D9] text-[#9A9A9A] cursor-pointer'

export default function Navbar(){
    const { user } : { user : User | null } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    const pathname = usePathname()
    // useEffect(()=>{
    //     user?.getIdToken().then(val => console.log(`Bearer ${val} ${user?.email}`.split("Bearer ")[1].split(" ")[1]))
    // })
    return(
        <nav
            className='justify-between flex flex-row p-5 border-b-[1px] border-gray-300 bg-[#11200E] h-[70px]'
        >
            <Link href={'/'}>AgriVision</Link>
            {   
                userid !== '' ? (
                    <div>
                        <Link 
                            href={`/agribox`} 
                            className={twClassMerge(linkTemplate, pathname.includes('agribox') && 'text-white')}
                        >AgriBox</Link>
                        <Link 
                            href={`/agricloud`} 
                            className={twClassMerge(linkTemplate, pathname.includes('agricloud') && 'text-white')}
                        >AgriCloud</Link>
                        <Link 
                            href={`/forum`} 
                            className={twClassMerge(linkTemplate, pathname.includes('forum') && 'text-white')}
                        >AgriForum</Link>
                    </div>
                ) : null
            }
            <Avatar src={null} userid={userid}/>
        </nav>
    )
}