import gql                  from "../helpers/gql"
import {actionFulfilled}    from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";

const actionProfilePosts = (_id, clear) =>
async (dispatch,getState) => {
    console.log('_id',_id)
    let howMuchToSkip
    let posts = getState().promise?.ProfilePosts?.payload
    
    if(clear){
        posts = false
        // console.log('posts',posts)
    }
    // if (posts) console.log('posts[0]',posts[0]?.owner?.login === getState().promise.ProfileInf.payload.login)
    // const userLogin =  
    // if(getState().promise.ProfileInf.payload.login === posts[0].owner.login) console.log('getState()')
    
    posts ? howMuchToSkip = posts.length: howMuchToSkip = 0 
    
    // console.log('howMuchToSkip',howMuchToSkip, posts)

    if (!getState().promise?.aboutMe?.payload)await dispatch(actionAboutMe(getState().auth.payload.id))

    const gqlQuery = 
    `query posTTT($query:PostsQuery){
        getPosts(query:$query){
            post_id
            post_title
            post_text
            post_createAt
            likesCount 
            images{
              post_image_id
              image{
                image_id
                image_originalname
              }
            }
    		postLikes{
                user_id
            }
            user{
                user_id 
                user_nick 
                user_login
            }
            comments{
                comment_id 
                comment_createAt 
                comment_text 
                likesCount     
                user{
                    user_id 
                    user_nick 
                    user_login
                    commentLikes{
                        comment_id 
                        user_id
                    }
                } 
            }  
        }
    }`

        
    const gqlPromise = await gql(gqlQuery, {query: {SortObj:{byWhat:"user_id", value:`${_id}`, how: "eq"},SortInput:{limit:5,skip:howMuchToSkip,sort:{key:"post_id", type:"DESC"}}}})
    const action = posts? actionFulfilled('ProfilePosts', [...posts, ...gqlPromise]) : actionFulfilled('ProfilePosts', gqlPromise) 
    // console.log('action',JSON.stringify(action.payload) === JSON.stringify(posts))
    if(JSON.stringify(action.payload) !== JSON.stringify(posts))await dispatch(action)
} 

export default actionProfilePosts
