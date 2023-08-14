import express from 'express'
import {registerUser,userLogin} from '../../controllers/user/userController'

const router = express.Router()

router.post('/sign-up',registerUser)

router.post('/login',userLogin)

export default router;