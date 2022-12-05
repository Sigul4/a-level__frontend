type promisePayload = {
    type: string,
    id: string,
}
type state = {
    posts: [],
}

export default function changePostReducer(state : state, {type, id}: promisePayload) {
    console.log("type", type, id)
    // console.log(type === "ADD_POST",state === undefined)
    
    if (state === undefined) {
        return {};
    }

    if (type === "ADD_POST") {
        console.log('ADD_POST')
        const newPosts = state.posts?.length ? [...state.posts, id] : [id]
        return {
        ...state,
        posts: newPosts,
        };
    }
    if (type === "REMOVE_POST") {
        console.log('REMOVE_POST')
        const newPosts = state.posts.filter(post => post !== id)
        return {
        ...state,
        posts: newPosts,
        };
    }

    if (type === "CONFIRM_POST") {
        console.log('CONFIRM_POST')
        return {
        ...state,
        posts: [],
        };
    }
    
    return state;
}
