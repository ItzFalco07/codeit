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
        fullpath: fullPath,
        isOpen: false,
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
    let projectPath;

    if (Type === 'blank') {
      const project = new projectSchema({
        projName: projName,
        user: req.session.user.name,
        type: Type
      })

      if(process.env.TYPE == 'production') {
        // for vercel 
        projectPath = path.join('/tmp', 'projects', req.session.user.name, projName);
      } else {
        projectPath = path.join(__dirname, '../projects', req.session.user.name, projName);
      }

      await fs.mkdir(projectPath, { recursive: true });

      let structure = await getFolderStructure(projectPath, projName);
      project.save()

    res.status(200).json({ 
      structure: {
        name: projName,
        children: structure
      },

      project: {
        name: projName,
        path: projectPath
      }
    });

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
    let projectPath

    if(process.env.TYPE == 'production') {
      // for vercel 
      projectPath = path.join('/tmp', 'projects', req.session.user.name, projName);
    } else {
      projectPath = path.join(__dirname, '../projects', req.session.user.name, projName);
    }
    
    let structure = await getFolderStructure(projectPath, projName);
    
    res.status(200).json({ 
      structure: {
        name: projName,
        children: structure
      },

      project: {
        name: projName,
        path: projectPath
      }
    });
    
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

router.post('/resetStructure', async (req,res)=> {
  try {
    const { projName } = req.body;
    let projectPath

    if(process.env.TYPE == 'production') {
      // for vercel 
      projectPath = path.join('/tmp', 'projects', req.session.user.name, projName);
    } else {
      projectPath = path.join(__dirname, '../projects', req.session.user.name, projName);
    }
    
    let structure = await getFolderStructure(projectPath, projName);
    
    res.status(200).json({ 
      structure: {
        name: projName,
        children: structure
      },
    })
  } catch(error) {
    console.error(error)
  }
})

router.post('/getcode', async (req, res) => {
  console.log('getcode called');
  const { path } = req.body;
  
  try {
    const code = await fs.readFile(path, 'utf8');
    res.status(200).json(code);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Error reading file' });
  }
});

router.post('/savecode', async (req,res) => {
  const { Code, Path } = req.body;

  try {
    console.log('writing gile on path: ', Path, ' code:', Code)
    await fs.writeFile(Path, Code, 'utf8')
  } catch(error) {
    console.error(error)
  }
})

module.exports = router;
