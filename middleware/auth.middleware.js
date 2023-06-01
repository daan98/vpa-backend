import jwt from 'jsonwebtoken';
import VeterinarianModel from '../models/Veterinarian.js';

const checkAuth = async (req, res, next) => {
    let token;
    console.log('checkAuth request (headers): ', req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('ENTRANDO EN EL IF DE LA AUTORIZACIÓN.');
        try {
            console.log('ENTRANDO AL TRY DE LA AUTORIZACIÓN');
            // WE MUST CATCH THE TOKEN THEN VERIFY IF THERE'S A USER WITH THE TOKEN AND FIND THAT USER
            token = req.headers.authorization.split(" ")[1];
            console.log('VALOR DEL TOKEN: ', token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('VALOR DE DECODED: ', decoded);
            req.veterinarian = await VeterinarianModel.findById(decoded.id).select("-password -isConfirm -token");
            return next(); //USING next() SO THE IF AUTHENTICATION IF SUCCESSFUL USER WILL HAS ACCESS TO PLATFORM
        } catch (error) {
            const err = new Error('There is no user with such token.');
            res.json({ message: err.message });
            return;
        }
    }

    const error = new Error('The user does not exist. Or you have no access to the information.');
    res.status(401).json({ message: error.message });
};

export default checkAuth;