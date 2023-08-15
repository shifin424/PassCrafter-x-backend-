import express from 'express'
import {registerUser,userLogin,savedPassword,fetchSavedData} from '../../controllers/user/userController'
import verifyUserToken from '../../middlewares/authorisation/authorisation'

const router = express.Router()

router.post('/sign-up',registerUser)

router.post('/login',userLogin)

router.post('/saved-password',verifyUserToken,savedPassword)

router.get('/fetchSavedData',verifyUserToken,fetchSavedData)

export default router;