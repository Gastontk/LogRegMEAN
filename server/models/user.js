console.log('Loading user model')
var mongoose = require('mongoose');
 var UserSchema = new mongoose.Schema({
 	email: {type: String,
		required: true,
		unique: true
	}, 
 	first_name: {type:String, 
 		required:[true, 'First Name is required'],
 		 min:[3, 'Requires 3 letters']
 	},
 	last_name: {type:String,
 	 required:[true, 'Last Name is required'],
 	  min:[10, 'Requires 10 letters']
 	},
 	password: {type:String, 
 		required:[true, 'Last Name is required'],
 		 min:[6, 'Password requires 6 characters']
 	},
 	birthday: {type:Date,
 	 required:[true, 'We need your birthday']
 	}
 }, {timestamps: true})


// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

// UserSchema.pre('save', function(done) {
//     this.password = this.generateHash(this.password);
//     done();
// });




 mongoose.model('User', UserSchema);
