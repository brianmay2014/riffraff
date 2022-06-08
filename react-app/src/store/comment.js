const ADD_COMMENT = "comments/addComment";
const REMOVE_COMMENT = "comments/removeComment";
const LOAD_COMMENTS = 'comments/loadComments';
const CLEAR_COMMENTS = 'comments/clearComments';

// const addComment = (comment) => {
//     return {
//         type: ADD_COMMENT,
//         payload: comment,
//     };
// };

// const removeComment = (comment) => {
//     return {
//         type: REMOVE_COMMENT,
//         payload: comment,
//     };
// };

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS, 
        payload: comments,
    };
};


export const genComments = () => async (dispatch) => {
    // can add more types of responses later
    
    const [commentsResponse] = await Promise.all([
        fetch(`/api/comments`),
    ]);

    const [comments] = await Promise.all([commentsResponse.json()]);

    if (commentsResponse.ok) {
        // console.log('comments', comments);
        dispatch(loadComments(comments.comments))
        return comments.comments;
    };
};


const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVE_COMMENT:
            const copyState = { ...state };
            delete copyState[action.payload.id];
            return copyState;
        case LOAD_COMMENTS:
            const commentData ={};
            for (let comment of action.payload) {
                commentData[comment.id] = comment;
            }
            return { ...commentData };
        case CLEAR_COMMENTS:
            return {};
        default:
            return state;
    }
};

export default commentReducer;