import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullName: fullName,
            email: email,
            password:hashedPassword,
        });
        await createdUser.save();
        res.status(201).json({
  message: 'User created successfully',
  user: {
    _id: createdUser._id,
    fullName: createdUser.fullName,
    email: createdUser.email
  }
});


        }
        catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } else {
            res.status(200).json({ message: 'Login successful', user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email
            } });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}