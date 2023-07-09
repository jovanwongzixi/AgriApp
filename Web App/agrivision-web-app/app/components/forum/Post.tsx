import classes from './Post.module.css'
import Link from 'next/link'

const Post: React.FC<{ userid: string; postid: string; author: string; body: string }> = (props) => {
    return (
        <li className={classes.post}>
            <Link href={`/${props.userid}/forum/${props.postid}`}>
            <p className={classes.author}>{props.author}</p>

            <p className={classes.body}>{props.body}</p>
            </Link>
        </li>
    )
}

export default Post
