/*
Supported Rules formats
b:is_length:1:120
b:is_range:86400000:1209600000
b:is_multiple:86400000


*/


module.exports = {
	getUser: {
		'p:not_empty': ['userId']
	},

	getAllUser: {
		'b:not_empty' : ['accessToken','zipcode'],
		'b:is_length:1:1000' : ['accessToken'],
		'b:is_length:1:120' : ['zipcode']
    }
};