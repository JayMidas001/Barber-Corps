const barberModel = require(`../model/userModel`)
const validator = require(`@hapi/joi`)


const signUp = async(req,res)=>{

    const schema = validator.object({
        Email:validator.string().email().min(7).required(),
        Name:validator.string().min(3).regex(/^[A-Z][a-z]+(?: [A-Z][a-z]+)*(?:-[A-Z][a-z]+)?$/).trim().messages({
            'string.pattern.base': 'Name must start with an uppercase letter and contain only alphabetic characters, spaces, or hyphens.',
            'any.required': 'Name is required.'
          })
        ,
        Password:validator.string().required().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/).messages({
            'string.pattern.base': 'Password must be at least 8 characters long, contain an uppercase letter, contain at least one number, and one special character.',
            'any.required': 'Password is required.'
          }),
        FavHairCut:validator.required().valid("skin cut","low cut","punk","faded punk")
    })
    
    const {error} = schema.validate(req.body)
    if(error){
       return res.status(400).json(error.details[0].message);
    }
    try {
        const {Name,Email,Password,FavHairCut}=req.body
    const data = {
    Name:Name.trimEnd(),
    Email,
    Password,
    FavHairCut
    }

    const createUser = await barberModel.create(data)
    res.status(201).json({message:`New Customer created successfully.`, data:createUser})
    } catch (e) {
    res.status(500).json(e.message)
    }
}

const getAll = async(req,res)=>{
    try {
        const allUsers = await barberModel.find()
    res.status(200).json({message:`Kindly find the ${allUsers.length} customers below:`,data:allUsers})
    } catch (e) {
     res.status(500).json(e.message)   
    }
}

const getOne = async(req,res)=>{
    try {
    let id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const getUser = await barberModel.findById(id)
    if (!getOne) {
        return res.status(400).json(`User with ${ID} not found.`);
      } else {
    res.status(200).json({message:`Kindly find the details of the customer with ID: ${id} below`,data:getUser})
    }} catch (e) {
    res.status(500).json(e.message)
    }
}

const logIn = async (req, res) => {
    try {
        const { Email, Password } = req.body;
    
        const emailCheck = await barberModel.findOne({ Email });
        if (!emailCheck) {
          return res.status(404).json({ message: 'Invalid Email.' });
        }
        if (emailCheck.Password!=Password)
        {
          return res.status(400).json({ message: 'Invalid password.' });
        } else{
            res.status(200).json({message:`Login successfully`, data: emailCheck})
        }
    } catch (e) {
    res.status(400).json(e.message)
    }
}
module.exports = {signUp,getAll,getOne,logIn}