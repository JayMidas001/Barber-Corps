const mongoose = require(`mongoose`)

userSchema = new mongoose.Schema({
    Name:{type:String, set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your name']},
    Email:{type:String,required:[true,`Kindly enter a valid email`],unique:true},
    Password:{type:String,required:[true,`Kindly enter a password`]},
    FavHairCut:{type:String}
},{timestamps:true})

const barberModel = mongoose.model("Barber Corp", userSchema)

module.exports = barberModel
