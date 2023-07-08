import classes from './Post.module.css'
import Link from 'next/link'

const Post: React.FC<{ id: number; author: string; body: string }> = (props) => {
    return (
        <li className={classes.post}>
            {/* <Link href={`/${userid}/forum/${forumid}`}> */}
            <p className={classes.author}>{props.author}</p>

            <p className={classes.body}>{props.body}</p>
            {/* </Link> */}
        </li>
    )
}

export default Post
