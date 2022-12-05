import gql              from "../helpers/gql"
import {actionPromise}  from "./actionPromise"
import history          from "../data/history"       

const actionAboutMe = (_id) =>
async (dispatch, getState) => {
    
    // followers{_id nick} following{_id nick login} 
    const gqlQuery = 
    `query users($id: ID!){
    getUser(user_id: $id) {
        user_id user_nick user_createAt user_login user_nick likesCount followers{user_id} followings{user_id}
    }
}`
    const gqlPromise = gql(gqlQuery, {"id": _id})
    if(JSON.stringify(getState().promise.aboutMe?.payload) !== JSON.stringify(await gqlPromise)){
    const action =  actionPromise('aboutMe', gqlPromise)
    await dispatch(action)}
    
    if(history?.location?.pathname === '/login' ){
        // history.push("/content")
    }
}

export default actionAboutMe
