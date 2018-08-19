require('../models/user.js');
require('../models/contest.js');

module.exports = {
    all: function(req, res){
        User.find({}).sort('createdAt').exec(function(err, users){
            if(err){
                console.log('Something went wrong when getting all users');
                res.json({message: 'Error', error: err});
            }else{
                res.json({message: 'Success', data: users});
            }
        });
    },
    one: function(req, res){
        User.findOne({_id: req.params.id}, function(err, user){
            if(err){
                console.log('Something went wrong when getting a single user');
                res.json({message: 'Error', error: err});
            }else{
                res.json({message: 'Success', data: user});
            }
        });
    },
    create: function(req, res){
        User.create(req.body, function(err){
            if(err){
                console.log('Something went wrong when creating a user, detail: ', err);
                res.json({message: 'Error', error: err});   
            }else{
                res.redirect('/dashboard');
            }
        });
    },
    update: function(req, res){
        User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, { runValidators: true }, function(err){
            if(err){
                console.log('Something went wrong when updating a user, detail: ', err);
                res.json({message: 'Error', error: err});
            }else{
                res.redirect(303, '/users');
            }
        });
    },
    remove: function(req, res){
        User.findOneAndRemove({_id: req.params.id}, function(err){
            if(err){
                console.log('Something went wrong when removing a user');
                res.json({message: 'Error', error: err});
            }else{
                user.find({}, function(err, users){
                    if(err){
                        console.log('Something went wrong when getting all users');
                        res.json({message: 'Error', error: err});
                    }else{
                        res.json({message: 'Success', data: users});
                    }
                });
            }
        });
    },
    login: function(req, res){
        User.findOne({email: req.body.login_email}, function(err, user){
            if(err){
                res.json({message: 'Error', error: err});
            }else{
                if (user.password == req.body.login_password){
                    res.redirect('/dashboard')
                }else{
                    res.json({message: 'Error', error: err})
                }
            }
        })
    },
    make_win: function(req, res){
        Contest.findOne({_id: req.body.id}, function(err, contest) {
            if(err){
                console.log('Something went wrong when getting a single contest');
                res.json({message: 'Error', error: err});
            }else{
                User.findOne({_id: req.params.id}, function(err, user) {
                    const today = new Date();
                    console.log(contest);
                    if (today < contest.start_date || today > contest.end_date || user.participated ) {
                        res.redirect(303, '/expired');
                    } else if(contest.users_won.length > contest.max_winners) {
                        User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                            if(err){
                                console.log('Something went wrong when updating a user, detail: ', err);
                                res.json({message: 'Error', error: err});
                            }else{
                                res.redirect(303, '/lose');
                            }
                        }); 
                    }
                    else {
                        var d = new Date();
                        var n = d.getDay();
                        var h = d.getHours();
                        //------------------------------------------------
                        if (n == 1 || n == 2) {
                            for(let user of contest.users_won) {
                                if(user.day == n && user.hour == h) {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                } 
                            }
                            if(0 <= h && h <= 6) {
                                const determine = Math.floor(Math.random() * Math.floor(20));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else if(12 <= h && h <= 18) {
                                const determine = Math.floor(Math.random() * Math.floor(30));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else {
                                const determine = Math.floor(Math.random() * Math.floor(60));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }   
                        }
                        //------------------------------------------------
                        else if (n == 3 || n == 4 || n == 5) {
                            for(let user of contest.users_won) {
                                if(user.day == n && user.hour == h) {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }                               
                            }
                            if(0 <= h && h <= 6) {
                                const determine = Math.floor(Math.random() * Math.floor(15));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else if(12 <= h && h <= 18) {
                                const determine = Math.floor(Math.random() * Math.floor(25));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else {
                                const determine = Math.floor(Math.random() * Math.floor(40));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                        }
                        //------------------------------------------------
                        else {
                            console.log('came here');
                            for(let user of contest.users_won) {
                                if(user.day == n && user.hour == h) {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                } 
                            }
                            if(0 <= h && h <= 6) {
                                const determine = Math.floor(Math.random() * Math.floor(8));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else if(12 <= h && h <= 18) {
                                const determine = Math.floor(Math.random() * Math.floor(15));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }
                            else {
                                const determine = Math.floor(Math.random() * Math.floor(20));
                                if(determine == 0) {
                                    Contest.findOneAndUpdate({_id: req.body.id}, {$push: {users_won: user}}, function(err) {
                                        if(err) {
                                            console.log('Something went wrong when updating a contest, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }
                                        else {
                                            User.findOneAndUpdate({_id: req.params.id}, {$set: {win: true, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                                if(err){
                                                    console.log('Something went wrong when updating a user, detail: ', err);
                                                    res.json({message: 'Error', error: err});
                                                }else{
                                                    res.redirect(303, '/win');
                                                }
                                            }); 
                                        }
                                    });
                                } else {
                                    User.findOneAndUpdate({_id: req.params.id}, {$set: {win: false, day: n, hour: h, participated: true}}, { runValidators: true }, function(err){
                                        if(err){
                                            console.log('Something went wrong when updating a user, detail: ', err);
                                            res.json({message: 'Error', error: err});
                                        }else{
                                            res.redirect(303, '/lose');
                                        }
                                    }); 
                                }
                            }   
                        }
                        //------------------------------------------------
                    }
                });
                // res.redirect('/win');
                // res.redirect('/lose');
            }
        });
    }
}