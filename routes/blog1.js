const express = require('express');
const router = express.Router();
const { Blog1 } = require("../models/Blog1");

const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", (req, res) => {
    let blog1 = new Blog1({ content: req.body.content, title:req.body.title,type:req.body.type});

    blog1.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })

});


router.get("/getBlogs", (req, res) => {
    Blog1.find()
        .populate("writer")
        .exec((err, blogs1) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs1 });
        });
});

router.post("/getPost", (req, res) => {
    console.log(req.body)
    Blog1.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

router.delete('/getBlogs/:id', (req, res) => {
    Blog1.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
            console.log('deletesuccessfully')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/getBlogs/:id/:index', (req, res) => {
    Blog1.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/getBlogs/:id', (req, res) => {
    Blog1.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/test/getBlogs/search', (req, res) => {
    // search and return here
    var name_search = req.query.title // lấy giá trị của key name trong query parameters gửi lên

    Blog1.find()
        .exec((err, blogs1) => {
            if (err) return res.status(400).send(err);
            else {
                // res.status(200).json({ success: true, blogs });
                var result = blogs1.filter((blog1) => {
                    return blog1.title.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
                })
                res.send(result)
            }
        });

})

router.put('/getBlogs/:id', (req, res) => {
   
    var updateRecord = {
        content:req.body.content,
        title:req.body.title
    }

    Blog1.findByIdAndUpdate(req.params.id, { $set: updateRecord },{ new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.delete('/', (req, res) => {
    Blog1.remove((err, docs) => {
        if (!err) {
            console.log('deletesuccessfully')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;
