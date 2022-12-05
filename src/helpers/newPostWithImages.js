import gql  from "./gql"

const newPostWithImages = async (title, text, images, _id) => {
    console.log('++++images',images)
        
        const gqlQuery = `
            mutation ADDpostWithIma($text:String, $title:String){
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
                    
                    user{
                        user_id 
                        user_login 
                        user_nick 
                        } 
                    }
                }
            
        `
        
        const gqlPromise = gql(gqlQuery, {title, text})
        const action = await gqlPromise
        console.log("ACTION!!",action.post_id)

        images.forEach(async image => {
            const gqlQueryPostsImages = 
            `mutation postIM($image:ID, $user:ID, $post:ID){
                addPostImage(
                    postImage: {
                        image_id:$image
                        user_id: $user 
                        post_id: $post
                    }
                )
                {
                  post_image_id
                  post_id
                  user_id
                  image_id
                }
              }`
            const gqlPromisePostsImages = gql(gqlQueryPostsImages, {image: image._id, post: action.post_id ,user: action.user.user_id })
            await gqlPromisePostsImages
        });

        return action
    
}

export default newPostWithImages
