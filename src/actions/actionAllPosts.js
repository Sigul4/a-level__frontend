import gql                  from "../helpers/gql"
import {actionFulfilled}    from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";


const actionAllPosts = (clearPosts = false) =>
async (dispatch, getState) => {
    let howMuchToSkip
    await dispatch(actionAboutMe(getState().auth.payload.id))

    const posts = getState().promise?.AllPosts?.payload
    const arrOfFollows = getState().promise?.aboutMe?.payload?.following?.map(follow => follow._id)
    
    posts ? howMuchToSkip = posts.length: howMuchToSkip = 0 

    // console.log('howMuchToSkip',howMuchToSkip, posts)

    const gqlQuery = 
    `query post($query:String){
        getPosts(query:$query){
            post_id
            post_title
            post_text
            post_createAt
            likesCount
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
    const gqlPromise = await gql(gqlQuery, {"query":  {SortObj:{byWhat:"user_id", value:"56", how: "eq"},SortInput:{limit:100,skip:howMuchToSkip,sort:{key:"post_id", type:"ASC"}}}})

    const action = !clearPosts ? posts ? actionFulfilled('AllPosts', [...posts, ...gqlPromise]) : actionFulfilled('AllPosts', gqlPromise):actionFulfilled('AllPosts', [])  
    await dispatch(action)
}

export default actionAllPosts 
