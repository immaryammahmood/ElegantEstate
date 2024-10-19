import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String,
        default:"https://th.bing.com/th/id/R.5eb1959636a370b661bc91940fe49cee?rik=DiotHJlkKQR6dg&riu=http%3a%2f%2fwww.datwebdigital.com%2fDWD%2fwp-content%2fuploads%2f2012%2f06%2flogo-design.jpg&ehk=fa8lsC0cm1nXH1dOqP%2f9dC1ohF3%2bcobEoqkMOaxrV2I%3d&risl=&pid=ImgRaw&r=0"
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;