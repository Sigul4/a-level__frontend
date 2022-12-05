import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionProfileInf = (_id) =>
async (dispatch) => {
  const gqlQuery = 
  `query users($id: ID!){
    getUser(user_id:$id) {
      user_id user_nick user_createAt user_login user_nick likesCount followers{user_id} followings{user_id}
    }
  }`
    const gqlPromise = gql(gqlQuery, {"id": _id})
    const action = actionPromise('ProfileInf', gqlPromise)
    await dispatch(action)
  }

export default actionProfileInf 
