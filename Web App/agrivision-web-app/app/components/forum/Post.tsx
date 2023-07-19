import Link from 'next/link'

const Post: React.FC<{ userid: string; postid: string; title: string; body: string }> = (props) => {
    return (
        <li className='border border-[#B2B2B2] rounded-lg shadow-md p-6 relative'>
            <Link className="group" href={`/${props.userid}/forum/${props.postid}`}>
            <p className='group-hover:text-[#D9D9D9] font-bold text-white text-2xl mb-2'>{props.title}</p>
            <p className='group-hover:text-[#D9D9D9] mb-2 text-white'>{props.body}</p>
            <p className='group-hover:text-[#D9D9D9] absolute bottom-0 right-0 underline mt-4 text-white'>{props.userid}</p>
            </Link>
        </li>
    )
}

export default Post

