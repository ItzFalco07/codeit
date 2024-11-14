const router = require('express').Router();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const fs = require('fs');
const path = require('path');

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
  content: String,
  type: String,
  parentId: { type: Schema.Types.ObjectId, ref: 'Folder' },
});

const folderSchema = new mongoose.Schema({
  name: String,
  path: String,
  parentId: { type: Schema.Types.ObjectId, ref: 'Folder' },
  children: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
});

const File = mongoose.model('File', fileSchema);
const Folder = mongoose.model('Folder', folderSchema);

router.post('/createFolder', async (req, res) => {
  try {
    const { folderName, parentFolderId, username } = req.body;
    const prefixedFolderName = `${username}_${folderName}`;
    
    const parentFolder = parentFolderId ? await folder.findById(parentFolderId) : null;
    const folderPath = parentFolder 
      ? path.join(parentFolder.path, prefixedFolderName) 
      : path.join(__dirname, username, prefixedFolderName); // Create a root folder for the user if none exists

    fs.mkdirSync(folderPath, { recursive: true }); // Ensures the entire path is created

    const newFolder = new folder({
      name: prefixedFolderName,
      path: folderPath,
      parentId: parentFolder ? parentFolder._id : null,
    });

    await newFolder.save();
    res.status(200).json({ message: 'Folder created successfully', folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating folder' });
  }
});


router.post('/createFile', async (req, res) => {
  const { fileName, fileType, parentFolderId, content, username } = req.body;
  const prefixedFileName = `${username}_${fileName}`;

  try {
    const parentFolder = await folder.findById(parentFolderId);
    const filePath = path.join(parentFolder.path, prefixedFileName);

    fs.writeFileSync(filePath, content);

    const newFile = new file({
      name: prefixedFileName,
      type: fileType,
      content,
      path: filePath,
      parentId: parentFolderId,
    });

    await newFile.save();
    res.status(200).json({ message: 'File created successfully', file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating file' });
  }
});

module.exports = router;
