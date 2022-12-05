const actionChangePostsToRecover = (id) =>{
    return (dispatch) => {
        dispatch({type: 'REMOVE_POST',name:'post', id: id})
    }
}
export default actionChangePostsToRecover
