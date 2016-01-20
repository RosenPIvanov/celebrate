var User = require('../lib/user');

exports.form = function(req, res){
  res.render('register', { title: 'Register' });
};

exports.submit = function(req, res, next){
  var data = req.body.user;
  console.log(data);
  User.getByName(data.name, function(err, user){
    if (err) return next(err);

    if (user.id) {
      res.error("Username already taken!");
      res.redirect('back');
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      });

      user.save(function(err){
        if (err) return next(err);
      //  console.log("req.session.uid: " + req.session.uid);
        console.log("req.session.id: " + req.session.id);
        console.log("user.id: " + user.id);
        req.session.uid = user.id;
        res.redirect('/');
      });
    }
  });
};
