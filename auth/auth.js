module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.archived){
        res.status(401).send({
          'errmsg': "Unauthorized, You are archived."
        });
      } else {
        req.token = req.headers.authorization.slice(7)
  
        for (let i in req.user.tokens){
          if ( req.token === req.user.tokens[i].token ){
            return next();
          }
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
