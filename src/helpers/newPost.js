import gql  from "./gql"

const newPost = async (title, text, _id) => {
    // console.log('_id',_id)
    if (!_id){
        const gqlQuery = `
            mutation ADDpost($text:String, $title:String){
                addPosts(posts: 
                {

                    post_title: $title, 
                    post_text: $text
                }
                )
                {

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
            }
        `
        
        const gqlPromise = gql(gqlQuery, {title, text})
        const action = await gqlPromise
        return action
    }
    else{
        // console.log('_id',_id)
        const gqlQuery = 
        `mutation newPost($id:ID, $text:String, $title:String, $images:[ImageInput]){
            PostUpsert(post:{_id:$id title: $title, text :$text, images: $images}){
                _id title text images{url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
                owner{_id login} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {id:_id, title, text, images: {}})
        const action = await gqlPromise
        return action
            
    }
}

export default newPost
