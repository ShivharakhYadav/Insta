import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import actions from '../store/actions/actionTypes';
import PostCard from './PostCard';
function Homepage() {
    const userDetails = useSelector((state: any) => state);
    let dispatch = useDispatch();
    useEffect(() => {
        //console.log("useEffect called")
        console.log("userDetails", userDetails);
        if (userDetails?.user?.followings?.length > 0) {
            getAllPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails?.user?.followings])
    const getAllPost = async () => {
        //console.log("Method called")
        try {
            let response = await fetch('http://localhost:4100/getFollowingsPost', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify({ followings: userDetails.user.followings })
            });
            let result = await response.json();
            //console.log("result", result)
            if (result.length) {
                dispatch({ type: actions.FOLLOWING_POSTS, payload: result })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Stack alignItems="center" spacing={3} mt={2}>
            {
                userDetails?.posts?.length > 0 ? <>
                    {userDetails?.posts?.map((post: any, i: any) => {
                        return <PostCard post={post} userDetails={userDetails} key={`${post.userid}${post.username}${i}`} />
                    })}
                </>
                    : <h1>No Post Available</h1>
            }
        </Stack>
    )
}
export default Homepage;