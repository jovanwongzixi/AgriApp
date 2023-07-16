import Link from 'next/link'

const Post: React.FC<{ userid: string; postid: string; title: string; body: string }> = (props) => {
    return (
        <li className='border border-[#B2B2B2] rounded-lg shadow-md p-6 relative'>
            <Link href={`/${props.userid}/forum/${props.postid}`}>
            <p className='font-bold text-[#DBDBDB] text-2xl mb-2'>{props.title}</p>
            <p className='mb-2 text-[#DBDBDB]'>{props.body}</p>
            <p className='absolute bottom-0 right-0 underline mt-4 text-[#DBDBDB]'>{props.userid}</p>
            </Link>
        </li>
    )
}

export default Post

