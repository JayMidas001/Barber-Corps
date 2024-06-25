const { getAll, signUp, getOne, logIn } = require("../controller/userController")
const router = require(`express`).Router()


router.post(`/signup`,signUp)
router.get(`/getone/:id`,getOne)
router.get(`/getall`,getAll)
router.post(`/login`,logIn)

module.exports = router