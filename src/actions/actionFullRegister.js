
import gql               from "../helpers/gql";
import actionFullLogin   from "./actionFullLogin";
import { actionPromise } from "./actionPromise";

const actionFullRegister = (login, password) =>
async (dispatch) => {

    const gqlQuery = `mutation register($login:String!, $password:String!){
            register(login: $login, password: $password nick:"VasyaNomer_${Date.now()}") {
              user_id
              user_nick
              user_login
              user_pass
              user_createAt
            }
    }`
    const gqlPromise = gql(gqlQuery, {login, password})
    const action     = actionPromise('register', gqlPromise) 
    const result     = await dispatch(action)
    if (result) await dispatch(actionFullLogin(login, password))
    else alert("Така юзера уже есть!")
}

export default actionFullRegister
