const authenticate = (req, res, next) => {
	// If the user is not logged in, redirect the request to the login route
	if (!req.session.logged_in) {
	  res.redirect('/login');
	} else {
	  next();
	}
  }

const authenticatePost = (req, res, next) => {
	if(!req.session.logged_in) {
		res.status(401).send('Unauthorized')
		return
	} else {
		next()
	}
}

  module.exports ={authenticate, authenticatePost}