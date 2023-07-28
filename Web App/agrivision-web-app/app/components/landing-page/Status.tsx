const Status: React.FC<{
    controlledtime: string
    fan: boolean
    pump: boolean
    boxid: string
}> = (props) => {
    const datetimeObj = new Date(props.controlledtime);
    const formattedDatetime = datetimeObj.toISOString().slice(0, 19).replace("T", " ");
    return (
        <div className="my-6 bg-black/30 rounded-4xl">
            <p className="text-center font-bold my-4"><u>{props.boxid}</u></p>
            <p>Controlled Time: <u>{formattedDatetime}</u></p>
            <p>Fan: <u>{props.fan ? 'On' : 'Off'}</u></p>
            <p>Pump: <u>{props.pump ? 'On' : 'Off'}</u></p>
        </div>
    )
}

export default Status
