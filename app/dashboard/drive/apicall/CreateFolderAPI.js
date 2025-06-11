"use client"
import React from 'react'

const CreateFolderAPI = ({folderName, onData}) => {
    const createFolder = async() => {
        try {
            const response = await fetch('/api/create-folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': '1',
                },
                body: JSON.stringify({ folderName: folderName }),
            })
            const res = await response.json();
            console.log(res);
            onData(res)
            
        } catch (error) {
            console.log('Error creating folder:', error);
            alert(error)
        }
    }
    createFolder()
  return null
}

export default CreateFolderAPI
