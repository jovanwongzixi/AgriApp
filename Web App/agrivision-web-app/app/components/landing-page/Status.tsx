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
            <p className="text-center font-bold my-4">{props.boxid}</p>
            <p>Controlled Time: {formattedDatetime}</p>
            <p>Fan: {props.fan ? 'On' : 'Off'}</p>
            <p>Pump: {props.pump ? 'On' : 'Off'}</p>
        </div>
    )
}

export default Status
