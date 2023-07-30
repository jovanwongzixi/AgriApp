'use client'
import { useAuthContext } from '@/app/context/auth-provider'
import { convertEmailToUserid } from '@/app/helper/functions'

const Reply: React.FC<{
    id: number
    userid: string
    body: string
    deleteHandler: (userid: string, body: string) => void
}> = (props) => {
    const { user } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    return (
        <li>
            <div
                key={props.id}
                className="border border-[#B2B2B2] rounded-lg p-4 mb-4 my-4 relative"
            >
                {props.userid === userid && (
                    <button
                        className="cross-btn absolute top-2 right-2 bg-transparent border-none cursor-pointer text-white hover:text-[#D9D9D9]"
                        onClick={() => props.deleteHandler(props.userid, props.body)}
                    >
                        X
                    </button>
                )}
                <p className="mb-2 text-white">{props.body}</p>
                <p className="text-right font-style: italic text-red-500">{props.userid}</p>
            </div>
        </li>
    )
}

export default Reply
