const config = require( "config" );
let sessionConfig =  config.get('session');
let userService = require('../rest/user/user.service');
let jwt = require('jwt-simple');
let secret = sessionConfig.secret;
let	authScheme = sessionConfig.bearer;
let splitAuthStringAndDecode = (token) => {
    try {
        if(!token) {
            return false;
        }
        let jwtToken = token.split(' ');
        if(jwtToken[0]!== authScheme) {
            return false;
        }
        console.log(jwtToken[1]);
        let decodedToken =	jwt.decode(jwtToken[1], secret, false);
        return decodedToken;
    } catch(e) { 
        console.log(e);
        return false;
    };	
};

let  authenticateWithJwt = (req, res, next) => {
	const decoded = splitAuthStringAndDecode(req.header('authorization'));
	if(!decoded) {	
		return res.sendStatus(403);
	} else {
		console.log(`token:${req.header('authorization')}`);
		let userId = decoded.sub.id;
		userService.findById(userId).then(user => {
			if(!user) {
				return res.send(403);
			}
			let userData = JSON.parse(JSON.stringify(user));
			req.jwtPayload = { sub:userData };
			return next();
		}).catch(e => {
			console.log(e);
			return res.send(403);;
		});
	}
};

let authenticateWithOutJwt = (req, res, next) => {
	const decoded = splitAuthStringAndDecode(req.header('authorization'));
	if(!decoded) {
		req.jwtPayload = {
			sub: { id: 1}
		}
		return next();
	} else {
		console.log(`token:${req.header('authorization')}`);
		let userId = decoded.sub.id;
		userService.findById(userId).then(user => {
			if(!user) {
				return res.send(403);
			}
			let userData = JSON.parse(JSON.stringify(user));
			req.jwtPayload = { sub:userData };
			return next();
		}).catch(e => {
			console.log(e);
			return res.send(403);;
		});
	}
};


module.exports = () => {
	return {
		authenticate: authenticateWithJwt,
		authenticateWithOutJwt:authenticateWithOutJwt
	};
};
