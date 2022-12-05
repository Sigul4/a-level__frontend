import { Alert, AlertTitle, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreatePost from "./ChangePost.js";
import Post from "./Post";
import actionAddLike from "../actions/actionAddLike.js";
import actionRemoveLike from "../actions/actionRemoveLike.js";


export default function PostWrapper({ post, aboutMe, changePostsToDelete, recoverPost}) {
    const dispatch = useDispatch()
    const [changer,        switchChange] = useState(true);
    const [postData,         changeData] = useState(post);
    const [deletedPost, changeDeletness] = useState(false)
    
    const postLike   = () => dispatch(actionAddLike(post._id))
    const postUnlike = (id) => dispatch(actionRemoveLike(id))

    useEffect(() => {
        console.log("postData", postData,postData.post_title);
    }, [postData]);

    const deletePost = () =>{
        // console.log('postData',postData)
        changeDeletness(!deletedPost)
        changePostsToDelete(postData._id)
    }

    const recover = (id) =>{
        changeDeletness(!deletedPost)
        recoverPost(id)
    }

    const showData = async (data) => {
        switchChange(!changer);
        changeData(await data);
        // console.log('data',data)
    };
    return (
        <>
        {!!changer ? (
            !deletedPost
                ?<Post
                    className="post"
                    user_id={aboutMe.user_id}
                    post_id={postData.post_id}
                    post_title={postData.post_title}
                    post_text={`${postData.post_text}`}
                    post_createAt={`${postData.post_createAt}`}
                    comments={postData.comments}
                    user={postData.user}
                    images={postData.images}
                    postLikes={postData.postLikes}
                    postLike={postLike}
                    postUnlike={postUnlike}
                    onChangePost={() => switchChange(!changer)}
                    onDeletePost={deletePost}
                />
                :<Alert style={{width: 400, margin: 40}} severity="error">
                    <AlertTitle>Post has been deleted</AlertTitle>
                    <span>if u wont to recover this one, just click here <br/>{`===>`}
                    <Button onClick={() => recover(postData._id)}><strong>Give me back my post!!!!111</strong></Button></span>
                </Alert>
        ) : (
            <CreatePost
                _id={postData._id}
                defaultTitle={postData.title}
                defaultText={postData.text}
                defaultImages={postData?.images}
                onChange={showData}
                onStopChange={() => switchChange(!changer)}
            />
        )}
        {/* {console.log('postData.images',postData)} */}
        </>
    );
}
