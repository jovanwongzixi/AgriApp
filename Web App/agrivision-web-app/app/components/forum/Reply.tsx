const Reply: React.FC<{ id: number, userid: string, body: string  }> = (props) => {
    return (
        <li>
            <div key={props.id} className="border border-[#B2B2B2] rounded-lg p-4 mb-4 my-4">
                    <p className="mb-2 text-white">{props.body}</p>
                    <p className="text-right text-white text-sm underline">{props.userid}</p>
                </div>
        </li>
        
    )
}

export default Reply
