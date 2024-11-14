import React from 'react';
import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const Files = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);

  return (
    <div className="p-4">
      <FolderTree
        showCheckbox={ false }
        data={testData}
        onChange={onTreeStateChange}
        render={(renderedTree) => (
          <div className="flex flex-wrap space-x-4">
            {renderedTree}
          </div>
        )}
      />
    </div>
  );
};

export default Files;
