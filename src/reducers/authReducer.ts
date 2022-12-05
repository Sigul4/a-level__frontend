type authInput = {
    type: 'AUTH_LOGIN' | 'AUTH_LOGOUT',
    token: string,
}
type initialState = {
    token: string | null,
    payload: {
        iat: number,
        sub: {
            acl: Array<string>
            id: string,
            login: string,
        } 
    } | null
} | {}


function jwtDecode(token :string){
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch (e) {
    }
}

export default function authReducer(state = {}, {type, token} :authInput): initialState {
    if (type === 'AUTH_LOGIN'){
        const payload = jwtDecode(token)
        if (payload){
            console.log('token, payload',token, payload)
            return {token, payload}
        }
    }
    if (type === 'AUTH_LOGOUT'){
        return {
            token: null,
            payload: null
        }
    }
    return state
}
