const express = require('express');
const router = express.Router();
const userSchema = require("./userSchema")
const passport = require('passport')

router.get('/islogin', async(req,res)=> {
	try {
		console.log('islogin called')
		if(req.session.user) {
			res.status(201).json(req.session.user)
		} else {
			res.status(500).json({message: 'error while cheacking islogin'});
		}
	} catch(error) {
		console.error(error)
		res.json(error)
	}
})

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
		console.log('email', Email, 'password', Password)
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
    console.log("logout called backend");
    if (req.session.user) {
      req.session.user = null; // Alternatively, try req.session.user = undefined;
      console.log('cleared user session');

      res.status(200).json({ message: 'success' }); // Send success response
    } else {
      console.log('no active user session');
      res.status(400).json({ message: 'No active session to clear' });
    }
    req.logout();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error on logout' });
  }
});


module.exports = router