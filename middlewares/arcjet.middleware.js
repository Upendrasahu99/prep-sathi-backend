import aj from '../config/arcjet.js';

const arjectMiddleware = async (req, res, next) => {
  try{
    const decission = await aj.protect(req, {requested: 1});

    if(decission.isDenied()){
      if(decission.reason.isRateLimit()){return res.status(429).json({message: 'Rate limit exceeded'});}

      if(decission.reason.isBot()){return res.status(403).json({message: 'Bot detected'});}

      return res.staus(403).json({error: 'Access denied'});
    }

    next();
  }catch(error){
    console.log(`Arcject middleware error: ${error.message}`);
    next(error);
  }
}

export default arjectMiddleware;