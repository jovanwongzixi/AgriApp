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
    <div className="border-t mt-4 pt-4">
      <div className="flex items-start space-x-4">
        <div className="flex-grow">
          <form onSubmit={submitHandler}>
            <textarea
              className="shadow appearance-none border border-black rounded bg-green-300 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Reply..."
              title="body"
              value={formData.body}
              onChange={changeHandler}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20"
                type="submit"
              >
                Reply
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20"
                type="button"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReplyForm
