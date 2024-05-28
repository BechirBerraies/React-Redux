const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const SECRET = "2048";

module.exports={


    findAllUsers:(req,res)=>{
        User.find()
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    createUser:(req,res)=>{
        User.create(req.body)
        .then(response=>res.status(201).json(response))
        .catch(error=>res.status(400).json(error.errors))
    },
    finOneUser:(req,res)=>{
        User.findOne({_id:req.params.id})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(404).json(error))
    },
    updateUser:(req,res)=>{
        User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    deleteUser:(req,res)=>{
        User.findByIdAndDelete({_id:req.params.id})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    register: async (req, res) => {
        try {
            const user = new User(req.body);
            const newUser = await user.save();
            const userToken = jwt.sign({ id: newUser._id }, SECRET);
            // Combinez l'envoi de la réponse JSON et l'ajout du cookie dans la même instruction
            res.status(201).cookie("userToken", userToken, { httpOnly: true }).json(newUser);
        } catch (error) {
            res.status(400).json(error);
            console.log(error);
        }
    },
    login: async (req, res) => {
        const userFromDB = await User.findOne({ email: req.body.email });
        if (!userFromDB) {
            res.status(404).json({ error: "USER NOT FOUND" })
        } else {
            try {
                const isPasswordValid = await bcrypt.compare(req.body.password, userFromDB.password)
                if (isPasswordValid) {
                    const userToken = jwt.sign({id: userFromDB._id}, SECRET)
                    console.log(`USER ID ${userFromDB._id} \nuserToken : ${userToken} `);
                    res.status(200).cookie("userToken", userToken, {httpOnly:true}).json({ message: "User Logged in successfully !!" })
                    // res.status(200).json({ message: "User Logged in successfully !!" })
                } else {
                    res.status(400).json({ message: "PAssword incorrect" })
                }
            }
            catch (error) {
                res.status(400).json({ message: 'invalid email/password', error })
            }
        }
    },
    logout: async (req, res) => {
        try {
            console.log('****',req.cookies.userToken,'****');
            res.clearCookie("userToken")
            res.status(200).json({message:"User logged out Successfully!!"})
        } catch (error) {
            res.status(500).json({message:'Somenthing went wrong', error})
        }
    },

}

