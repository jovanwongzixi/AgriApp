import Link from 'next/link'

const Post: React.FC<{ userid: string; postid: string; title: string; body: string }> = (props) => {
    return (
        <li className='bg-yellow-300 rounded-lg shadow-md p-6 my-6 relative'>
            <Link href={`/${props.userid}/forum/${props.postid}`}>
            <p className='font-bold text-2xl mb-2'>{props.title}</p>
            <p className='mb-2'>{props.body}</p>
            <p className='absolute bottom-0 right-0 underline mt-4'>{props.userid}</p>
            </Link>
        </li>
    )
}

export default Post

// .post {
//     margin: 1rem 0;
//     padding: 1rem;
//     background-color: #9c7eee;
//     border-radius: 8px;
//     box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
//     animation: animate-in 1s ease-out forwards;
//   }
