const mongoose = require('mongoose');


UserSchema = new mongoose.Schema({
    Name: {
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    Age: {
        type: Number, 
        required:[true,"How Old are you"]

    },
    email:{type:String  ,
        required:[true,"Where is your Email"],
        validate: {
            validator: val=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
            message:"PLEASE ENTER A VALID EMAIL"
        }
    
    
    },
    password:{
        type:String,
        required:[true,"Password very required"],
        minlength:[6,"PAssword too short👌"]
    }

},{ timestamps: true });

// UserSchema.virtual('confirmPassword').get(()=>this._confirmPassword)
// .set(value => this._confirmPassword = value);
// UserSchema.pre('validate',function(next){
//     console.log("INSIDE VALIDATE CONFIRM PASSWORD")
//     console.log(`Password :${this.comparingPassword}\n Confirm Password ${this.confirmPassword}`);
//     if(this.comparingPassword != this.confirmPassword){
//         this.invalidate('confirmPassword','Password Must match ')

//     }
//     next()
// })


// UserSchema.pre('save', async function(next){
//     console.log("Inside Pre Save Hook");
//     try{
//         const hashedPassword = await bcrypt.hash(this.password,10);
//         console.log(`"PASSWORD TEXT : " ${this.password}\n HASED PASSWORD : ${hashedPassword}`)
//         this.password= hashedPassword
//     }
//     catch(error){
//         console.log(error);
//     }
//     next()
// })




const User = mongoose.model("User",UserSchema);
module.exports= User