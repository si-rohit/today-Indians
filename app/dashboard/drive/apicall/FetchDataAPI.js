'use client'
import React from 'react'

const FetchDataAPI = ({folderId = '',onData,folderName}) => { 
    // console.log("folderid",folderName);
    fetch('/api/fetch-folder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderId,folderName }),
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        onData(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}

export default FetchDataAPI
