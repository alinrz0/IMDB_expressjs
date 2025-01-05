import { signup, login } from './authServices';
import { Router , Request , Response , NextFunction } from "express";
import SignupDto from './dtos/signupDto';
import ValidateMiddleware  from '../middlewares/validateMiddleware';
import LoginDto from './dtos/loginDto';


const router = Router();

router.post("/login" , ValidateMiddleware(LoginDto) ,  async (req : Request , res : Response , next : NextFunction)=>{
    try{
        const body : LoginDto = req.body;
        const result = await login(body)
        res.send(result)   
    }catch(err :any){
        next(err)
    }
});

router.post("/signup",ValidateMiddleware(SignupDto) , async (req : Request , res : Response , next : NextFunction)=>{
    try{
        const body : SignupDto = req.body;
        const result = await signup(body)
        res.send(result)
    }catch(err :any){
        next(err)
    }
});

export default router;