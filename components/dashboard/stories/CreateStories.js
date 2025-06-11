import React from 'react'

const CreateStories = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Create New Story</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Short Description"
            className="w-full p-2 border rounded"
          ></textarea>
          <input
            type="url"
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateStories