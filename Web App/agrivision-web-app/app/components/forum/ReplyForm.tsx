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
        <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex items-start space-x-4">
                <div className="flex-grow">
                    <form onSubmit={submitHandler}>
                    <textarea
                        className="block w-full p-2 border border-gray-300 rounded"
                        rows={3}
                        placeholder="Reply..."
                        title="body"
                        value={formData.body}
                        onChange={changeHandler}
                    />
                    <div className="flex justify-end">
                        <button className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">Reply</button>
                    </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700" type="button" onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default ReplyForm;