
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
let decodeData;

if(token && isCustomAuth){

    decodeData = jwt.verify(token, 'test');
    console.log(decodeData);
    req.userId = decodeData?.id;
    next();
}else{

    decodeData = jwtDecode(token);
    req.userId = decodeData?.sub
    next();
}

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized kalid" });
    }
};

export default auth;
