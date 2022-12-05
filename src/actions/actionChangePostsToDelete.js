const actionChangePostsToDelete = (id) =>{
    return (dispatch) => {
        dispatch({type: 'ADD_POST',name:'post', id: id})
    }
}
export default actionChangePostsToDelete
