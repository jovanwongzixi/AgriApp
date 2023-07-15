'use client'
import { useState } from 'react'

const PostForm: React.FC<{
    onSubmit: (formData: { title: string; body: string }) => void
    onCancel: () => void
}> = (props) => {
    const [formData, setFormData] = useState({
        title: '',
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
        <div className="max-w-md mx-auto">
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Title:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="title"
                        value={formData.title}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Body:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="body"
                        value={formData.body}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:underline"
                        type="button"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:underline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
