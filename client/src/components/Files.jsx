import React from 'react';
import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { useStructure } from '../context/structure';

const Files = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);
  const { Structure } = useStructure();
  console.log('structure from files', [Structure]);
  console.log('structure', Structure)
  return (
    <div className="p-4">
      <FolderTree
        showCheckbox={false}
        data={Structure}  // Use an empty array instead of null
        onChange={onTreeStateChange}
      />
    </div>
  );
};

export default Files;
