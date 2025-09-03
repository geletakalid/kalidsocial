import * as api from '../api';
import { FETCH_ALL,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE,START_LOADING,END_LOADING} from '../constants/actionTypes';
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

export const createPost = (newPost) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(newPost);
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