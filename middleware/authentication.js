const JWT = require('jsonwebtoken');
const SecKey = "Hello"
function authentication (req, res, next){

    const Token = req.headers.tokenization; 


try{    
if (Token==null) {
      res.status(400).send("You are not authenticate");
    } else {
      JWT.verify(Token, SecKey, (err, other) => {
        if (err) {
          console.log(err)
          res.status(401).send(err);
        } 

        
        req.Another = other;
        next();
      });
    }
    } catch(err){
      req.status(401).send(err)
    }
  }
module.exports = authentication
