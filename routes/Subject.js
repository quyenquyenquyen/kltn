//router
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const subjectRouter = express.Router();
const Subject = require('../models/Subject');
const Todo = require('../models/Todo');
const ListUser = require('../models/ListUser')
const cors = require('cors')
const moment = require('moment')

subjectRouter.use(cors())

//POST

subjectRouter.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    var newRecord = new Subject({
        subjectName: req.body.subjectName,
        Teacher: req.body.Teacher,
        MMH: req.body.MMH,
        tinchi: req.body.tinchi,
        percent1: req.body.percent1,
        percent2: req.body.percent2,
        percent3: req.body.percent3,
        class: req.body.class

    })
    newRecord.save((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while post record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

subjectRouter.put('/editsubject/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    var updateRecord = {
        subjectName: req.body.subjectName,
        Teacher: req.body.Teacher,
        MMH: req.body.MMH,
        tinchi: req.body.tinchi,
        percent1: req.body.percent1,
        percent2: req.body.percent2,
        percent3: req.body.percent3,
        class: req.body.class
    }
    Subject.findByIdAndUpdate(req.params.id, { $set: updateRecord }, { new: true }, (err, result) => {
        if (!err) {
            res.send(result)
            console.log('edit sucject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    

    // Subject.updateOne({ _id: req.params.id }, { $push: { exerciseArr: todo } }, { new: true }, (err, docs) => {
    //     if (!err) {
    //         console.log('put deadline success')
    //     } else {
    //         console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
    //     }
    // })
})

//GET

subjectRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.find().exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs)
    });
})



subjectRouter.get('/getone/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const { username } = req.user
    Subject.findOne(

        { _id: id },
        { userArr: { $elemMatch: { username, subId: id } } }

    ).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.userArr)
    });
})

//GET by id

subjectRouter.get('/subTime/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.subTime)
    });
})

// subjectRouter.get('/subArr/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
//     Subject.findById(req.params.id).exec((err, docs) => {
//         if (err)
//             return res.status(400).send(err);
//         res.send(docs.subjectArr)
//     });
// })

subjectRouter.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.userArr)
    });
})

subjectRouter.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs)
    });
})


subjectRouter.get('/exerciseArr/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.exerciseArr)
    });
})




//PUT

subjectRouter.put('/putuser/:id/:subjectName', passport.authenticate('jwt', { session: false }), (req, res) => {

    const id = req.params.id
    const { username } = req.user
    const subjectName = req.params.subjectName

    const variable = {
        username: req.user.username,
        subId: id
    }
    Subject.updateOne({ _id: id }, { $push: { userArr: { username, subId: id } } }, { new: true }, (err, docs) => {
        if (!err) {
            let listuser = new ListUser({ mssv: username, subName: subjectName,subId:id,username:req.user.name});
            listuser.save((err, result) => {
                if (err) return res.json({ success: false, err });
                res.send(result)
            })
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

})


subjectRouter.put('/popuser/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { username } = req.user
    Subject.updateOne({ _id: req.params.id }, { $pull: { userArr: { username } } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
            console.log('pop user success', username)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

})

subjectRouter.put('/popsubarr/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const  user  = req.user.username
    Subject.updateOne({ _id: req.params.id }, { $pull: { subjectArr: { user } } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
            console.log('pop user success', user)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

})



subjectRouter.put('/delete/:id/:week', passport.authenticate('jwt', { session: false }), (req, res) => {

    const week = req.params.week

    Subject.updateOne({ _id: req.params.id }, { $pull: { exerciseArr: { week } } }, (err, result) => {
        if (!err) {
            res.send(result)
            console.log('delete sub success')
        } else {
            res.send(err)
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})


subjectRouter.put('/put/:id/:fileId/:username', passport.authenticate('jwt', { session: false }), (req, res) => {

    const fileId = req.params.fileId

    Subject.updateOne({ _id: req.params.id }, { $pull: { subjectArr: { fileId } } }, { new: true }, (err, result) => {
        if (!err) {
            const todo = new Todo({
                name: req.body.name,
                contentType: req.body.contentType,
                fileId: req.params.fileId,
                user: req.body.user,
                timestamp: req.body.timestamp,
                point: req.body.point,
                week: req.body.week,
                username:req.body.username
            })
            Subject.updateOne({ _id: req.params.id }, { $push: { subjectArr: todo } }, { new: true }, (err, docs) => {
                if (!err) {
                } else {
                    console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
                }
            })
            res.send(result)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

})

subjectRouter.put('/putdate/:id/:fileId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const fileId = req.params.fileId

    Subject.updateOne({ _id: req.params.id }, { $pull: { exerciseArr: { week } } }, { new: true }, (err, result) => {
        if (!err) {
            res.send(result)
            console.log('put subject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    const todo = new Todo({
        name: req.body.name,
        contentType: req.body.contentType,
        fileId: req.params.fileId,
        user: req.body.user,
        timestamp: req.body.timestamp,
        week: req.body.week,
        description: req.body.description,
        exerciseName: req.body.exerciseName,
        deadline: req.body.deadline
    })

    Subject.updateOne({ _id: req.params.id }, { $push: { exerciseArr: todo } }, { new: true }, (err, docs) => {
        if (!err) {
            console.log('put deadline success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

subjectRouter.put('/putExercise/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const id = req.params.id
    // hour:req.body.hour,
    // minute:req.body.minute,
    // seconds:req.body.seconds
    const variable = {
        week: req.body.week,
        description: req.body.description,
        exerciseName: req.body.exerciseName,
        deadline: req.body.deadline,
        timestamp: moment().format("YYYY-MM-DD"),
        user: req.user.username
    }


    Subject.findByIdAndUpdate(id, { $push: { exerciseArr: variable } }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

subjectRouter.put('/updateExercise/:id/:week', passport.authenticate('jwt', { session: false }), (req, res) => {

    const id = req.params.id
    const week = req.params.week
    // hour:req.body.hour,
    // minute:req.body.minute,
    // seconds:req.body.seconds
    const variable = {
        week: req.body.week,
        description: req.body.description,
        exerciseName: req.body.exerciseName,
        deadline: req.body.deadline,
        timestamp: moment().format("YYYY-MM-DD"),
        user: req.user.username
    }


    Subject.findByIdAndUpdate(id, { $pull: { exerciseArr: { week } } }, { new: true }, (err, docs) => {
        if (!err) {
            Subject.findByIdAndUpdate(id, { $push: { exerciseArr: variable } }, { new: true }, (err, docs) => {
                if (!err) {
                    res.send(docs)
                } else {
                    console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
                }
            })
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})


subjectRouter.delete('/:subjectName', passport.authenticate('jwt', { session: false }), (req, res) => {

    const subjectName = req.params.subjectName
    Subject.findOneAndRemove({ subjectName: subjectName }, (err, docs) => {
        if (!err) {
            ListUser.remove({subName:subjectName})
                .then(result => {
                    res.send(result)
                })
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })


})

subjectRouter.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.remove((err, docs) => {
        if (!err) {
            console.log('deletesuccessfully')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})




module.exports = subjectRouter