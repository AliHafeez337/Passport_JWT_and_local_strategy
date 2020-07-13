module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.archived){
        res.status(401).send({
          'errmsg': "Unauthorized, You are archived."
        });
      } else {
        req.token = req.headers.authorization.slice(7)
  
        if (req.user.tokens.length){
          for (let i in req.user.tokens){
            if ( req.token === req.user.tokens[i].token ){
              return next();
            }

            // If token not found in last loop
            if (req.user.tokens.length === +i + 1){
              res.status(401).send({
                'errmsg': "Unauthorized, Token doesn't exist. Please, login..."
              });
            }
          }
        } else {
          res.status(401).send({
            'errmsg': "Unauthorized, Token doesn't exist. Please, login..."
          });
        }
      }
    } else {
      res.status(401).send({
        'errmsg': "Unauthorized, You can not access this resource."
      });
    }
  },
  adminAuthenticated: (req, res, next) => {
    if (req.user.usertype === 'admin') {
      return next()
    } else {
      res.status(401).send({
        'errmsg': "Unauthorized, You must be an admin access this resource."
      });
    }
  }
};
