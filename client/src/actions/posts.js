import * as api from '../api';
import { FETCH_ALL,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE,START_LOADING,END_LOADING,FETCH_POST,COMMENT} from '../constants/actionTypes';
export const getPosts=(page)=> async(dispatch)=>{
  
    try{
        dispatch({type:START_LOADING});
const {data}=await api.fetchPosts(page);
console.log(data);
dispatch({type:FETCH_ALL,
        payload:data})
dispatch({type:END_LOADING});


}
    catch(error){
        console.log(error);
    }
            

}
export const getPost=(id)=> async(dispatch)=>{
  
    try{
        dispatch({type:START_LOADING});
const {data}=await api.fetchPost(id);
console.log(data);
dispatch({type:FETCH_POST,
        payload:data})
dispatch({type:END_LOADING});


}
    catch(error){
        console.log(error);
    }
            

}

export const createPost = (newPost,history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(newPost);
        console.log(newPost)
        history.push(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
    
        const { data } = await api.updatePost(id, updatedPost);
        console.log(id)
        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {

        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        console.log(data);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const commentPost = (comment, postId) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, postId);
        console.log(data);
        dispatch({ type: COMMENT,payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
          console.log(searchQuery);
        const { data } = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};