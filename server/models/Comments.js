const mongoose = require('mongoose');

const UserComment = new mongoose.Schema({
    commentAuthorName: {
        type: String,
        required: true
    },
	commentBody: {
		type: String,
		required: true
	},
	itemRate: {
		type: String,
		required: true
	},
    item_id: {
        type: String
    },
    data_added: {
        type: Date,
        default: Date.now
    }
});

const UserCommentModel = mongoose.model("Comments", UserComment);
module.exports = UserCommentModel;