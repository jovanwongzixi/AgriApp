'use client'
import { useState } from "react"

const Form: React.FC<{ onSubmit: (formData) => void; onCancel: () => void }> = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        body: '',
    })

    function submitHandler(event) {
        event?.preventDefault();
        props.onSubmit(formData)
    }

    function changeHandler(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    function cancelHandler() {
        props.onCancel();
    }

    return (
        <form onSubmit={submitHandler}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                ></input>
            </label>
            <label>
                Question:
                <input
                    type="text"
                    name="body"
                    value={formData.body}
                    onChange={changeHandler}
                ></input>
            </label>
            <button type="button" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;
