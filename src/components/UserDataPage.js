import AccessibleForwardIcon    from '@mui/icons-material/AccessibleForward';
import AccessTimeIcon           from '@mui/icons-material/AccessTime';
import ModeIcon                 from '@mui/icons-material/Mode';
import SportsMartialArtsIcon    from '@mui/icons-material/SportsMartialArts';
import {TextField }             from '@mui/material';
import Avatar                   from '@mui/material/Avatar';
import Box                      from '@mui/material/Box';
import Button                   from '@mui/material/Button';
import CardHeader               from '@mui/material/CardHeader';
import CardMedia                from '@mui/material/CardMedia';
import { red }                  from '@mui/material/colors';
import Stack                    from '@mui/material/Stack';
import { useEffect, useState }  from 'react';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../App.css';
import deletePost               from "../helpers/deletePost";
import uploadFile               from '../helpers/uploadFile';
import CreatePost               from './ChangePost.js';
import ChangeUserData           from './ChangeUserData';
import PostWrapper              from './PostWrapper';
import SavedCollections         from './SavedCollections';
import actionProfileInf         from "../actions/actionProfileInf.js";
import actionProfilePosts       from '../actions/actionProfilePosts';
import actionProfileCollections from '../actions/actionProfileCollections';
import actionFollow from '../actions/actionFollow';
import actionUnfollow from '../actions/actionUnfollow';
import actionChangeProfile from '../actions/actionChangeProfile';

const UserPage = ({match: {params: {_id}}, onProfileChange, onFollow, onUnfollow, onLoadCollection }) => {
    
    console.log('_id',_id)
    const aboutMe     = useSelector(state => state?.promise?.aboutMe?.payload)
    const props       = useSelector(state => state?.promise?.ProfileInf?.payload)
    const takingPosts = useSelector(state => state?.promise?.ProfilePosts?.payload)
    const dispatch    = useDispatch()

    let   [SmthToView,             ChangeView]   = useState([])
    const [takingData,          SetTakingData]   = useState(false)
    const [posts,                    SetPosts]   = useState([])
    const [follow,                  SetFollow]   = useState()
    const [postsToDelete, changePostsToDelete]   = useState([]);
    const [avatarSrc,         changeAvatarSrc]   = useState('')
    const [popUpDropMenu, changePopUpDropMenu]   = useState(false)
    const [profileImage,   ChangeProfileImage]   = useState([])
    const [nick,                   changeNick]   = useState(props?.user_nick)
    const [nickChanged,        setNickChanged]   = useState(false)
    const [checkedProps,      setCheckedProps]   = useState(false)

    const onLoadUserInf   = (_id) => dispatch(actionProfileInf(_id))
    const onLoadUserPosts = (_id, clear) => dispatch(actionProfilePosts(_id, clear))

    const addPostToDelete = (id) =>{
        changePostsToDelete(postsToDelete.push(id))
    }    

    const recoverPost = (id) =>{
        changePostsToDelete(postsToDelete.filter(posts !== id))
    }
    
    useEffect(() => {
        dispatch(actionProfileCollections)
        return () => console.log(postsToDelete,"Posts To Delete",postsToDelete?.map(id => deletePost(id)))
    }, []);

    useEffect(()=>{
        onLoadUserInf(_id)
        onLoadCollection(_id)
        onLoadUserPosts(_id, true)
    },[_id])
    
    useEffect(()=>{
        onLoadUserPosts(_id)
    },[takingData])
    
    useEffect(()=>{
        document.addEventListener('scroll', onScroll)

        return function(){
            document.removeEventListener('scroll', onScroll)
        }
    },[])

    useEffect(()=>{
        if(!!aboutMe && props !== checkedProps){
            setCheckedProps(props)
            SetFollow(props?.followers?.map((follower) => follower.user_id === aboutMe.user_id).includes(true))
        }
    },[props])
    
    useEffect(()=>{
        console.log('takingPosts has been updated IN USEFECT',takingPosts,posts)
        if(!!aboutMe)ChangeView(posts?.map(post => <PostWrapper key={post._id} post={post} aboutMe={aboutMe} changePostsToDelete={addPostToDelete} recoverPost={recoverPost} className="post"/> ))
    },[posts])
    
    useEffect(()=>{
        if(props?.avatar?.url)changeAvatarSrc(`http://hipstagram.node.ed.asmer.org.ua/${props?.avatar?.url}`)
    },[props])
    
    
    useEffect(()=>{
        console.log('posts has been updated IN USEFECT',posts)
        SetPosts(takingPosts)
    },[takingPosts])
    

    function onScroll(e) {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            SetTakingData(takingData => takingData = !takingData)
        }
    }

        return (
            
            <Box sx={{width: "100%",display: "flex", justifyContent: "center" }}>
                <ChangeUserData popUpDropMenu={popUpDropMenu} ChangeProfileImage={ChangeProfileImage} uploadFile={uploadFile} changePopUpDropMenu={changePopUpDropMenu} profileImage={profileImage} onProfileChange={onProfileChange} _id={_id}/>
                
                <Box sx={{display: "block", justifyContent: "center"}}>
                    <CardMedia
                        component="img"
                        height="300"
                        image="https://orname.ru/wp-content/uploads/2017/05/orname_ru_F009.png"
                        sx={{width: "100%"}}
                        alt="Background"
                    />
                        
                    <Stack
                    sx={{padding: 1, display:"flex", flexDirection:"row"}}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={0}
                    >
                        <Box sx={{position: "relative", left:30, top:-70,width: 350, height: 100}}>                    
                            <CardHeader
                                avatar={
                                <div onClick={() => !!aboutMe && _id === aboutMe.user_id ? changePopUpDropMenu(!popUpDropMenu): ()=>{}} style={{width: 100, height: 100,}}>
                                {!!aboutMe && _id === aboutMe.user_id ?<ModeIcon sx={{fontSize: 50, color: 'white',zIndex: 3,position: "absolute",left:"42px", top:"42px", opacity: "0","&:hover": {opacity: "1"}}}/>: ''}
                                <Avatar sx={{ bgcolor: red[500], width: 100, height: 100,}} alt='' aria-label="recipe" src={avatarSrc}><h1>{props?.login? props?.login[0].toUpperCase(): '' }</h1></Avatar>
                                </div>
                                }/>
                                
                            <Box sx={{position: "absolute", left:180, top:70}}>
                                {/* {!!nickChanged === true? 'wdwd':'' */}
                                {!!aboutMe && _id !== aboutMe.user_id 
                                    ?<h2>{props?.user_nick ? props?.user_nick :props?.user_login}</h2>
                                    :!nickChanged
                                        ?<Box style={{display:"flex", flexDirection:"row"}}><h2>{props?.user_nick ? props?.user_nick : "Set Nick"}</h2>{!!aboutMe && _id === aboutMe.user_id ? <Button onClick={() => setNickChanged(!nickChanged)}><ModeIcon sx={{fontSize: 20, opacity: "1","&:hover": {opacity: "1"}}}/></Button>: ''}</Box>
                                        :<Box style={{display:"flex", flexDirection:"row", width: 400}}><TextField required id="standard-required" defaultValue={props?.user_nick} variant="standard" onChange={(e) => {changeNick(nick => nick = e.target.value)}}/><Button onClick={async() =>  {await onProfileChange(null, nick); onLoadUserInf(_id);setNickChanged(!nickChanged)}}>???</Button><Button onClick={() =>  {setNickChanged(!nickChanged)}}>??</Button></Box>}
                            </Box>
                        </Box>
                        <Box sx={{width: 200}}>
                        {!!aboutMe && _id !== aboutMe.user_id? !follow ? <Button variant="contained" onClick={() => {SetFollow(!follow); onFollow(_id)}}>Subscribe</Button>: <Button variant="outlined" onClick={() => {SetFollow(!follow); onUnfollow(_id)}}>Unsubscribe</Button> :''}
                        </Box>
                        <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="baseline"
                        spacing={2}
                        >
                            { <Box><SportsMartialArtsIcon/>followers: {props?.followers?.length}</Box>}
                            { <Box><AccessibleForwardIcon/>following: {props?.following?.length || 0}</Box> }
                            { <Box sx={{display: "flex",alignItems:"center", flexDirection:"column"}}><AccessTimeIcon/>With us since: {new Date(Number(props?.user_createAt)).toDateString()}</Box>}
                        </Stack>
                    </Stack>   
                            
                    <SavedCollections/>

                    <div className="PostList">
                        {!!aboutMe && posts && _id === aboutMe.user_id ?<CreatePost onChange={async (e)=>{ 
                            takingPosts.unshift(await e); 
                            console.log('posts has been updated',takingPosts); 
                            ChangeView(posts?.map(post => <PostWrapper key={post.post_id} post={post} aboutMe={aboutMe} changePostsToDelete={addPostToDelete} recoverPost={recoverPost} className="post"/> ))
                            }}/>:''}
                        
                        {SmthToView}
                    </div>
                    
                </Box>
            </Box>
        )
}

export const CProfilePage = connect(null, {onFollow: actionFollow, onUnfollow: actionUnfollow, onProfileChange:actionChangeProfile, onLoadCollection: actionProfileCollections})(UserPage);
