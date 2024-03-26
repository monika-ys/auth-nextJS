const mongoosepkg = require('mongoose');
// Define the User schema
const userSchema = new mongoosepkg.Schema({
        username: {
        type: String,
        required: true,
    },
        email: {
        type: String,
        required: true,
        unique: true,
    },
        password: {
        type: String,
        required: true,
    },
        createdAt: {
        type: Date,
        default: Date.now,
    },
    });
// Create the User model from the schema
const User = mongoosepkg.models.User || mongoosepkg.model('User', userSchema);
module.exports = User;