const express = require('express');
const router = express.Router();
const userSchema = require("./userSchema")
const passport = require('passport')

router.get('/islogin', async (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(200).json({ error: true, message: 'User not logged in' });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);  // Log error details
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.post('/signup', async (req,res)=> {
	try {
		const {Name, Email, Password} = req.body

		const user = new userSchema({
			name: Name,
			email: Email,
			password: Password
		})

		await user.save()

		req.session.user = { Name, Email }

		res.status(201).json({
			message: "success",
			user: { name: Name, email: Email }
		})
	} catch(error) {
		console.log(error)
	}
})

router.post('/login', async (req,res)=> {
	try {
		const {Email, Password} = req.body;
		const user = await userSchema.findOne({ email: Email });
		if(!user) {
			res.status(201).json({message: 'fail'})
			return
		} 

		if(user.password == Password) {
			req.session.user = {
				Name: user.name,
				Email: user.email
			}

			res.status(201).json({
				message: 'success',
				user: {name: user.name, email: user.email}
			})

		} else {
			res.status(401).json('error')
		}
	} catch(error) {
		console.log(error)
	}
})

router.get('/logout', async (req, res) => {
  try {
    if (req.session.user) {
      req.session.user = null; // Alternatively, try req.session.user = undefined;

      res.status(200).json({ message: 'success' }); // Send success response
    } else {
      res.status(400).json({ message: 'No active session to clear' });
    }
    req.logout();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error on logout' });
  }
});


module.exports = router