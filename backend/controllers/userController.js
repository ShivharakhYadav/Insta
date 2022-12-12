const user = require('../models/userSchema');
const publicPost = require('../models/publicPost');
const fs = require('fs')
const path = require('path');

const getSingleUserDetails = async (req, res) => {
    try {
        console.clear();
        const username = req.params.username
        const singleUser = await user.find({ username: username });
        if (singleUser.length > 0) {

            res.status(200).json({ data: singleUser[0], success: true, message: "" })
        }
        else {
            res.status(404).json({ data: "", success: false, message: "User not Found" })
        }
    }
    catch (err) { res.status(500).send("Internal Server Error") }
}

const registerUser = async (req, res) => {
    try {
        let keys = Object.keys(req.body);
        if (keys.length < 1) {
            res.status(415).json({ message: "Provide Valid Details" })
        } else {
            const alreadyuser = await user.find({ emailorphone: req.body.emailorphone });
            if (alreadyuser.length > 0) {
                res.status(200).json({
                    success: false,
                    data: "",
                    message: "Already user"
                })
            }
            else {
                const newuser = await user.create(req.body);
                res.status(200).json({ success: true, message: "", data: newuser })
            }
        }
    }
    catch (err) { res.status(500).send("Internal Error"); }
}

const loginUser = async (req, res) => {
    try {
        console.clear();
        let keys = Object.keys(req.body);
        if (keys.length > 0) {
            const validateuser = await user.find({
                $and: [{ $or: [{ username: req.body.emailorphone }, { emailorphone: req.body.emailorphone }] }, { password: req.body.password }]
            })
            if (validateuser.length) {
                res.status(200).json({
                    success: true,
                    data: validateuser[0],
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    data: "",
                    message: "Invalid User"
                })
            }
        }
        else {
            res.status(200).send("Hello, User")
        }
    }
    catch (err) {
        console.log("err", err)
    }
}

const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        
        if (req.url.includes("updateProfileImage")) {
            id = req.query.userid;
            let staticPath = `http://localhost:4100/images/${req.imageName}`;
            await user.findByIdAndUpdate({ _id: req.query.userid }, { profileimg: staticPath }, { new: true })
        }

        let bodyArray = Object.keys(req.body);
        let item;
        if (bodyArray.includes("followers")) {
            item = await user.findByIdAndUpdate({ _id: req.params.id },
                {
                    $push: {
                        followers: req.body.followers
                    }
                })
        }
        if (bodyArray.includes("followings")) {
            item = await user.findByIdAndUpdate({ _id: req.params.id },
                {
                    $push: {
                        followings: req.body.followings
                    }
                })
        }

        if ((!bodyArray.includes("followings")) && (!bodyArray.includes("followers"))) {
            let body = req.body;
            let newBody = {};
            for (const property in body) {
                if (property != "followers" && property != "followings") {
                    newBody[property] = body[property]
                }
            }

            const updated = await user.findOneAndUpdate({ _id: req.params.id }, newBody, {
                new: true
            })

        }

        let updatedDetails = await user.find({ _id: id });
        //console.log("updatedDetails", updatedDetails)
        res.status(200).json({ data: updatedDetails[0], success: true, message: "User Updated" })
    }
    catch (err) { res.status(404).json(err) }
}

const uploadimg = async (req, res) => {
    try {
        let userid = req.query.userid;
        let username = req.query.username;
        let uploadTime = req.uploadTime;
        let staticPath = `http://localhost:4100/images/${req.imageName}`;

        let postBody = {
            postid: uploadTime,
            username: username,
            userid: userid,
            uploadTime: uploadTime,
            postLink: staticPath,
            postType: "image",
            like: 2,
        }

        await publicPost.create(postBody);
        const addPostToUserArray = await user.findOneAndUpdate({ _id: userid }, {
            $push: {
                post: postBody
            }
        }, { new: true })

        res.status(200).json({
            success: true,
            data: addPostToUserArray,
            message: ""
        })
    }
    catch (err) { res.status(500).send(err) }
}

const addPostToUser = async (req, res) => {
    try {
        const addItem = await publicPost.create(req.body);
        res.status(200).json({
            success: true,
            item: addItem,
            message: ""
        })
    }
    catch (err) {
        console.log("add post", err)
    }
}

const getAllFileNames = async () => {
    try {
        let arr = [];
        fs.readdir('D:/Projects/social_media-mern-ts/backend/src/All_Post', function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            files.forEach(function (file) {
                let staticPath = `http://localhost:4100/images/${file}`;
                arr.push(staticPath)
            });
        });
    }
    catch (err) {
        console.log(err)
    }
}

const searchUser = async (req, res) => {
    const { name } = req.query;
    try {
        let result = await user.find({ $or: [{ name: { '$regex': name, '$options': 'i' } }, { username: { '$regex': name, '$options': 'i' } }] });
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
    }
}

const getFollowingsPost = async (req, res) => {
    try {
        let data;
        let sorted;
        let ids = req.body.followings;
        let unSorted = [];
        data = await user.find({
            '_id': {
                $in: ids
            }
        }).select('post -_id');
        data.filter((item) => item.post.length > 0).map((item) => item.post.map((item) => unSorted.push(item)));
        sorted = unSorted.sort((a, b) => b.postid - a.postid)
        res.status(200).json(sorted);
    }
    catch (err) {
        console.log(err)
    }
}

const requestFollow = async (req, res) => {
    try {
        //console.clear();
        //console.log(req.body)
        let acceptedId = req.body.accepter._id;
        let requesterId = req.body.requester._id;

        let newPendingRequestsBody = {
            _id: req.body.requester._id,
            username: req.body.requester.username,
            profileimg: req.body.requester.profileimg,
            name: req.body.requester.name
        }
        console.log("newPendingRequestsBody", newPendingRequestsBody);
        let notificationBody = {
            time: `${Date.now()}`,
            type: "RequestedToFollow",
            requester: newPendingRequestsBody
        }
        let acceptedRequest = await user.findOneAndUpdate({ _id: acceptedId }, {
            $push: {
                notification: notificationBody,
                pendingRequests: newPendingRequestsBody
            }
        })
        console.log("acce", acceptedRequest);
        //let updatedDetail = await getSingleUserDetails(acceptedId)
        res.status(200).json({ data: {}, message: "Added Successfully", success: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getSingleDetails = async (req, res) => {
    try {
        let result = await getSingleUserDetails(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
            message: ""
        })
    }
    catch (err) {
        res.status(500).send("Internal server error")
    }
}


const confirmFollowRequest = async (req, res) => {
    try {
        console.clear();
        console.log(req.body)
        let acceptedID = req.body.acceptedId;
        let requestedID = req.body.requestedId;
        let pendingRequestID = req.body.pendingRequestId;

        if (!acceptedID || !requestedID) {
            res.status(400).json({ data: {}, success: false, message: "Id is Missing" })
        }
        const acceptedAccount = await user.findOneAndUpdate({ _id: acceptedID }, {
            $push: {
                followers: requestedID
            },
            $pull: {
                pendingRequests: { _id: pendingRequestID }
            }
        })

        //console.log("acceptedAccount", acceptedAccount)
        const requesterAccount = await user.findOneAndUpdate({ _id: requestedID }, {
            $push: {
                followings: acceptedID
            }
        })

        let ids = [acceptedID, requestedID];
        let allData = await user.find({ '_id': { $in: ids } })
        res.status(200).json({ data: {}, success: true, message: "Follow Accepted" });
        // console.log("requesterAccount", requesterAccount);
        // res.status(200).json({ data: req.body })
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
module.exports = {
    registerUser, loginUser, addPostToUser, updateUser, uploadimg, getAllFileNames, getSingleDetails, searchUser,
    getFollowingsPost, requestFollow, getSingleUserDetails, confirmFollowRequest
}