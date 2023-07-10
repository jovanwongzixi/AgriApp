'use client'
import { useState } from "react"

const ReplyForm: React.FC<{ onSubmit: (formData: {body: string}) => void; onCancel: () => void }> = (props) => {
    const [formData, setFormData] = useState({
        body: '',
    })

    function submitHandler(event) {
        event?.preventDefault();
        props.onSubmit(formData)
    }

    function changeHandler(event) {
        const { title, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [title]: value,
        }))
    }

    function cancelHandler() {
        props.onCancel();
    }

    return (
        <form onSubmit={submitHandler}>
            <label>
                Reply:
                <input
                    type="text"
                    title="body"
                    value={formData.body}
                    onChange={changeHandler}
                ></input>
            </label>
            <button type="button" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default ReplyForm;