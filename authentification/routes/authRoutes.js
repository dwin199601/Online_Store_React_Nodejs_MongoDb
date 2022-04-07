const { signup, login, forgotPassword } = require("../controlers/authControlers");
const {checkUser} = require("../middlewares/authmiddlewares")

const router = require("express").Router();
router.post("/", checkUser);
router.post("/newitems", checkUser);
router.post("/items", checkUser);
router.post("/items/:param", checkUser);
router.post("/updateItem/:param", checkUser);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;