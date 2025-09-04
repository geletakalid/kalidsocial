import React,{useState,useRef} from "react";
import { Typography,TextField,Button,Divider ,Paper } from "@material-ui/core";
import { useDispatch,useSelector} from 'react-redux';
import { commentPost } from "../../actions/posts";
import useStyles from './styles'
const CommentSection=({post })=>{
    console.log('comment Section')
    const classes = useStyles();

    const dispatch = useDispatch();
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');
    const user=JSON.parse(localStorage.getItem("profile"));

    const commentsRef = useRef();
    const handleClick =  async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        //nst pst=await dispatch(commentPost(finalComment,post._id));
        const  comments=await dispatch(commentPost(finalComment,post._id));
        console.log(comments);



    setComments(comments);
    setComment('')
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
<div>
    <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom varient="h6">No comments yet.</Typography>
          {comments.map((c,i)=>(
<Typography key={i} gutterBottom varient="subtitle1">
<strong>{c.split(':')[0]}</strong>
{c.split(':')[1]}
 
</Typography>

          ))}
          <div ref={commentsRef} />
        </div>
{user?.result?.name && (

        <div style ={{width:'70%'}}>
        <Typography gutterBottom variant="h6">Add a comment</Typography>
        <TextField label="Comment" fullWidth  rows={4} multiline value ={comment} onChange={(e)=>setComment(e.target.value)}/>
        <Button color="primary" style={{marginTop:'10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>  Comment
        </Button>
        </div>)}
    </div>
</div> 
    )
    
}

export default CommentSection