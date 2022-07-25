const {createComment, getComment} = require('../controlers/commentController');
const router = require('express').Router();

router.post('/api/newComment', createComment);
router.get('/api/comment', getComment);

module.exports = router;