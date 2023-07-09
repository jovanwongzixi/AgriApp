const Reply: React.FC<{ id: string; replies: any }> = (props) => {
    return (
        <>
            {props.replies.map((reply: { name: string; body: string }, index: number) => (
                <div key={index}>
                    <p>{reply.name}</p>
                    <p>{reply.body}</p>
                </div>
            ))}
        </>
    )
}

export default Reply
