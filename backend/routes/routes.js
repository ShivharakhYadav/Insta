const express = require('express');
const routes = express.Router();
const { registerUser, loginUser, addPostToUser, updateUser, uploadimg,
    getAllFileNames, getSingleUserDetails, getSingleDetails, searchUser, getFollowingsPost, requestFollow, confirmFollowRequest } = require('../controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './src/All_Post',
    filename: (req, file, cb) => {
        let userid = req.query.userid;
        let username = req.query.username;
        req.uploadTime = Date.now();
        let imageName = `${userid}-${username}-${Date.now()}-${file.originalname}`
        req.imageName = imageName;
        cb(null, imageName);
    }
});

const upload = multer({ storage: storage });

routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.post('/newpost', addPostToUser);
routes.put('/updateuser/:id', updateUser);
routes.put('/updateProfileImage', upload.single('profileimage'), updateUser);
routes.post('/upload', upload.single('img'), uploadimg);
routes.get('/getAllFileNames', getAllFileNames);
routes.get('/user/:username', getSingleUserDetails);
routes.get('/searchUser', searchUser)
routes.post('/getFollowingsPost', getFollowingsPost);
routes.post('/requestFollow', requestFollow);

routes.post('/requestAccept', confirmFollowRequest)

// routes.post('/requestAccept', (req, res) => {
//     console.log("called from routes")
//     res.status(200).send(req.body);
// })
module.exports = routes