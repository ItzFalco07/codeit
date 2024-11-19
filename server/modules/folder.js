const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const projectSchema = require('./projectSchema');

async function getFolderStructure(folderPath, folderName) {
  // Initialize the structure as an empty array, since folderName will be the root
  let structure = [];
  try {
    let items = await fs.readdir(folderPath); // Reads all files and folders inside the given folder
    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const stat = await fs.stat(fullPath); // Get stats for the current item

      let itemData = {
        _id: fullPath,
        name: item,
        children: stat.isDirectory() ? [] : false,
      };

      // If the item is a directory, recursively get its structure
      if (stat.isDirectory()) {
        itemData.children = await getFolderStructure(fullPath, item); // Recursively fetch subfolders
      }
      structure.push(itemData);  // Add itemData to structure
    }
    return structure; 
  } catch (error) {
    console.error('Error reading folder structure:', error);
  }
}

router.post('/createproject', async (req, res) => {
  try {
    const { projName, Type } = req.body;

    if (Type === 'blank') {
      const project = new projectSchema({
        projName: projName,
        user: req.session.user.name,
        type: Type
      })

      const projectPath = path.join('/tmp', 'projects', req.session.user.name, projName);
      await fs.mkdir(projectPath, { recursive: true });

      let structure = await getFolderStructure(projectPath, projName);
      project.save()

      res.status(200).json({ project: {
        name: projName,
        children: structure
      }});

    } else {
      res.status(400).json({ error: "proj type not supported" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: true,
      message: error.message || 'An unexpected error occurred'
    });
  }
});

router.post('/enterproject', async(req,res)=> {
  try {
    const { projName, Type } = req.body;
    const projectPath = path.join(__dirname, '../', 'projects', req.session.user.name, projName);
    let structure = await getFolderStructure(projectPath, projName);
    
    res.status(200).json({ project: {
      name: projName,
      children: structure
    }});
    
  } catch(error) {
    console.error(error)
  }
})

router.post('/getprojects', async (req,res)=> {
  try {
    const username = req.session.user.name;
    console.log('username', username)
    const projectData = await projectSchema.find({user: username})
    res.status(200).json({projectData})
  } catch(error) {
    console.error(error)
    res.status(400).json({error: true})
  }
})

module.exports = router;
