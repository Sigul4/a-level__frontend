import { Box, Button, TextField } from '@mui/material';
import Avatar                     from '@mui/material/Avatar';
import Card                       from '@mui/material/Card';
import CardContent                from '@mui/material/CardContent';
import CardHeader                 from '@mui/material/CardHeader';
import Collapse                   from '@mui/material/Collapse';
import { red }                    from '@mui/material/colors';
import Typography                 from '@mui/material/Typography';
import { useEffect, useState }    from 'react';
import { Link }                   from 'react-router-dom';
import actionNewComment           from "../actions/actionNewComment";
import CardFooter                 from './CardFooter';
import CardInfСontainer           from './CardInfСontainer';
import Comments                   from './Comments.js';
import CardComments               from './CardComments';



export default function Post({user_id, post_id, post_title, post_text, post_createAt, comments, user, images, postLikes, postLike, postUnlike, onChangePost, onDeletePost, commentAdditionality = true}) {
  const [myComments, changeComments] = useState(comments?comments:[]);
  const [expanded,      setExpanded] = useState(false);
  const [likesLength,changelikesLength] = useState(postLikes?.length);

  
  useEffect(()=>{
    console.log('post_title',post_title)
  },[post_title])

  const date = new Date(post_createAt*1).toDateString()
  // console.log('postLikes',postLikes)

  // console.log('user', user)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likesInf = postLikes ? Object.values(postLikes).map(like => {if(like.user_id === user_id) return like._id}).filter(element => element !== undefined) :() =>{}
  const [statusOfLike, setStatus] = useState(!!likesInf.length)

  if (images) console.log('images!!!!!!!!!!!!',images)

  return (
    <Card sx={{ maxWidth: 500, width: "100%", marginBottom: "40px" }}  >
      <CardHeader 
      
        avatar={
          <Link to={`/profile/${user?.user_id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
            <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src={`http://hipstagram.node.ed.asmer.org.ua/${user?.avatar?.url}`}></Avatar>
            <strong><h3>{user?.user_nick ? user.user_nick : user?.user_login}</h3></strong>
          </Link>
        }
        action={user_id === user?.user_id
                  ?<><Button 
                      onClick={onChangePost}
                    >Change</Button>
                    <Button       
                      sx={{backgroundColor: 'red'}} 
                      variant="contained"
                      onClick={onDeletePost}
                    >Delete</Button>
                  </>:''
        }
        subheader={date.substr(0,30)}/>

      <CardInfСontainer images={images} postId={post_id} title={post_title} text={post_text}/>

      <CardFooter statusOfLike={statusOfLike} postUnlike={postUnlike} postLike={postLike} likesInf={likesInf} setStatus={setStatus} changelikesLength={changelikesLength} likesLength={likesLength} commentAdditionality={commentAdditionality} postId={post_id} expanded={expanded} handleExpandClick={handleExpandClick}/>

      <CardComments expanded={expanded} commentAdditionality={commentAdditionality} postId={post_id} actionNewComment={actionNewComment} myComments={myComments} changeComments={changeComments}/>


    </Card>
  );
}
