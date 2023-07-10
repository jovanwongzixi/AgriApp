const Reply: React.FC<{ id: number, userid: string, body: string  }> = (props) => {
    return (
        <li>
            <div key={props.id}>
                    <p>{props.body}</p>
                    <p>{props.userid}</p>
                </div>
        </li>
        
    )
}

export default Reply
