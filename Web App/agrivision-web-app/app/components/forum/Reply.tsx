const Reply: React.FC<{ id: number, name: string, body: string  }> = (props) => {
    return (
        <li>
            <div key={props.id}>
                    <p>{props.name}</p>
                    <p>{props.body}</p>
                </div>
        </li>
        
    )
}

export default Reply
