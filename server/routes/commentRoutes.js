const {createComment, getComment, deleteComment} = require('../controlers/commentController');
const router = require('express').Router();

router.post('/api/newComment', createComment);
router.get('/api/comment', getComment);
router.delete('/api/comment/:id', deleteComment);

module.exports = router;