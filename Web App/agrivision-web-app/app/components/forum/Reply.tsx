const Reply: React.FC<{ id: number, userid: string, body: string  }> = (props) => {
    return (
        <li>
            <div key={props.id} className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="mb-2">{props.body}</p>
                    <p className="text-right text-gray-500 text-sm underline">{props.userid}</p>
                </div>
        </li>
        
    )
}

export default Reply
