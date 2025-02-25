import { NODE_ENV } from "../config/env.js";

const disableProdRoutes = (req, res, next) => {
   try{
      if(NODE_ENV === 'production'){
         if(req.method === 'GET' && req.url.includes('/topic')){
            return res.status(401).json({message: 'Not allowed in production'});
         }
      }
      next();
   }catch(error){
      next(error);
   }
}

export default disableProdRoutes;