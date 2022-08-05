const comment = require('../models/Comments');
const mongoose = require('mongoose');

module.exports.createComment = (req, res) => {
    try {
        const {commentAuthorName, commentBody, itemRate, item_id, user_id} = req.body;
        const review = new comment({
            commentAuthorName: commentAuthorName,
            commentBody: commentBody,
            itemRate: itemRate,
            item_id: item_id,
            user_id: user_id
        });
        review.save((err)=> {
            if(err){
                console.log(err);
                res.send(err);
            }
            else {
                console.log("The comment was added");
                res.send(review);
            }
        })
    }
    catch(error) {
        console.log(error);
    }
}

module.exports.getComment = (req, res) => {
    try     {
        comment.find((err, comments)=> {
            if(err)
            {
                console.log(err);
            }
            else {
                console.log(comments);
                res.send(comments);
            }
        })
    }
    catch(error)    {
        console.log(error);
    }
}

module.exports.deleteComment = (req, res) => {
    try {
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id);
        console.log(_id);
        comment.deleteOne({_id: _id},
            (err) => {
                if(err) {
                    console.log(err);
                    res.send(err);
                }
                else 
                    res.send("The comment was deleted");
            })
    }
    catch(error) {
        console.log(error);
    }
}