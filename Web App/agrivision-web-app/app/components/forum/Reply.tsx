const Reply: React.FC<{ id: number; replies: any }> = (props) => {
    return (
        <>
            {props.replies.map((reply) => (
                <li key={props.id}>
                    <p>{reply.name}</p>
                    <p>{reply.body}</p>
                </li>
            ))}
        </>
    )
}

export default Reply
