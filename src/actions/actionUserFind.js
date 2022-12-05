import gql                  from "../helpers/gql"
import { actionPromise }    from "./actionPromise"


const actionUserFind = (text) =>
async (dispatch) => {
    const gqlQuery = 
    `query actionUserFind($query: SortObj){
        getUsers(query: $query){
            user_id
            user_nick 
            user_createAt 
            user_login  
        }
    }`
    
    const gqlPromise = await gql(gqlQuery, {"query": {byWhat:"user_nick", value:text, how:"regexp"}})

    const action = actionPromise('requiredNicknames', gqlPromise) 
    await dispatch(action)
}

export default actionUserFind
