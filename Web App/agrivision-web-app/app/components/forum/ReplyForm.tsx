'use client'
import { useState } from 'react'

const ReplyForm: React.FC<{
    onSubmit: (formData: { body: string }) => void
    onCancel: () => void
}> = (props) => {
    const [formData, setFormData] = useState({
        body: '',
    })

    function submitHandler(event) {
        event?.preventDefault()
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
        props.onCancel()
    }

    return (
        <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex items-start space-x-4">
                <div className="flex-grow">
                    <form onSubmit={submitHandler}>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={3}
                            placeholder="Reply..."
                            title="body"
                            value={formData.body}
                            onChange={changeHandler}
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20"
                                type="submit"
                            >
                                Reply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20"
                    type="button"
                    onClick={cancelHandler}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ReplyForm
