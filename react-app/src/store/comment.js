const ADD_COMMENT = "comments/addComment";
const REMOVE_COMMENT = "comments/removeComment";
const LOAD_COMMENTS = 'comments/loadComments';
const CLEAR_COMMENTS = 'comments/clearComments';

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    };
};

const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        payload: comment,
    };
};

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS, 
        payload: comments,
    };
};

export const makeComment = (comment) => async (dispatch) => {
    
    const riffId = comment.riff_id
    const form = new FormData();
    form.append("user_id", comment.user_id);
    form.append("riff_id", riffId);
    form.append("text", comment.text);

    const response = await fetch(`/api/riffs/${riffId}/comments`,
        {method: "POST", body:form});
    
    const commentData = await response.json();

    if (response.ok) {
        dispatch(addComment(commentData));
        return commentData;
    } else {
        return commentData;
    }
};

export const editComment = (comment) => async (dispatch) => {
    const { id, text } = comment;

    const form = new FormData();
    form.append("text", text);

    const response = await fetch(`api/comments/${id}`, {
        method: "PATCH",
        body: form,
    });
    const commentData = await response.json();
    dispatch(addComment(commentData))
    return { ...commentData }
}



export const deleteComment = (comment) => async (dispatch) => {
    const {id} = comment;

    const response = await fetch(`api/comments/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ comment_id: comment.id })
    });
    if (response.ok) {
        dispatch(removeComment(comment));
    }
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