const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateAuthToken = async function(){
  try {
      const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
      
      // this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
  } catch (error) {
      console.log(error)
  }
}

userSchema.pre("save", async function(next){

  if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10);
  }
  next(); 
})

module.exports = mongoose.model("User", userSchema);