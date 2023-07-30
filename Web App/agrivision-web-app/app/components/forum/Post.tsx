'use client'
import Link from 'next/link'
import { useAuthContext } from '@/app/context/auth-provider'
import { convertEmailToUserid } from '@/app/helper/functions'

const Post: React.FC<{
    userid: string
    postid: string
    title: string
    body: string
    deleteHandler: (postUserid: string, postid: string) => void
}> = (props) => {
    const { user } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    const maxPostLength = 50
    const truncatedTitle =
    props.title.length > maxPostLength
      ? `${props.title.slice(0, maxPostLength)}...`
      : props.title;
    const truncatedBody =
    props.body.length > maxPostLength
      ? `${props.body.slice(0, maxPostLength)}...`
      : props.body;
    return (
        <li className="border border-[#B2B2B2] rounded-lg shadow-md p-6 relative ">
            {props.userid === userid && (
                <button
                    className="cross-btn absolute top-2 right-2 bg-transparent border-none cursor-pointer text-white hover:text-[#D9D9D9]"
                    onClick={() => props.deleteHandler(props.userid, props.postid)}
                >
                    X
                </button>
            )}
            <Link href={`/forum/${props.postid}`}>
                <div className="group block max-h-72 max-w-72">
                    <p className="absolute top-2 left-2 font-style: italic text-red-500">
                        {props.userid}
                    </p>
                    <div className='my-2'>
                    <p className="group-hover:text-[#D9D9D9] text-white font-bold text-2xl mb-2">
                        {truncatedTitle}
                    </p>
                    <p className="group-hover:text-[#D9D9D9] text-white mb-2">{truncatedBody}</p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Post
