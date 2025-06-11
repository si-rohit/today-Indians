import React from 'react';

const FolderTreeView = ({ folders, onSelect, selectedId }) => {
  const renderFolders = (nodes) =>
    nodes.map((folder) => (
      <div key={folder._id} className="ml-4">
        <div
          className={`cursor-pointer px-2 py-1 rounded ${
            selectedId === folder._id ? 'bg-blue-100 font-semibold' : ''
          }`}
          onClick={() => onSelect(folder)}
        >
          📁 {folder.name}
        </div>
        {folder.children && renderFolders(folder.children)}
      </div>
    ));

  return <div>{renderFolders(folders)}</div>;
};

export default FolderTreeView;
