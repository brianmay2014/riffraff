const ADD_RIFF = 'riffs/addRiff';
const REMOVE_RIFF = 'riffs/removeRiff';
const LOAD_RIFFS = 'riffs/loadRiffs';
const UPDATE_RIFF = 'riffs/updateRiff';

const addRiff = (riff) => {
    console.log('inside action');
    return {
        type: ADD_RIFF,
        payload: riff,
    };
};

const removeRiff = (riff) => {
    return {
        type: REMOVE_RIFF,
        payload: riff,
    };
};

const loadRiffs = (riffs) => {
    return {
        type: LOAD_RIFFS,
        payload: riffs,
    };
};

// const updateRiff = (riff) => {
//     return {
//         type: UPDATE_RIFF,
//         payload: riff,
//     };
// };


export const genRiffs = () => async (dispatch) => {
    //open to adding more types of responses later
    const [riffsResponse] = await Promise.all([
        fetch("/api/riffs/"),
    ]);
    const [riffs] = await Promise.all([
        riffsResponse.json(),
    ]);
    if (riffsResponse.ok) {
        dispatch(loadRiffs(riffs.riffs))
        return riffs;
    }
};

export const makeRiff = (riff, link) => async (dispatch) => {

    // console.log ('inside thunk');
    // console.log('riff', riff)

    const form = new FormData();
	form.append("link", link);
    form.append("user_id", riff.user_id);
	form.append("title", riff.title);
	form.append("note", riff.note);

    // console.log('form', form);

    const response = await fetch(`/api/riffs/new`,
        {method: "POST", body: form});

    const riffData = await response.json();

    if (response.ok) {
        dispatch(addRiff(riffData));
        return riffData;
    } else {
        return riffData;
    }
}

export const deleteRiff = (riff) => async (dispatch) => {
    // const { id } = riff;

    const response = await fetch(`api/riffs/${riff.id}/`, {
        method: "DELETE",
        body: JSON.stringify({ riff_id: riff.id })
    });
    if (response.ok) {
        dispatch(removeRiff(riff));
    }
};

const riffReducer = (state = {}, action) => {

    switch (action.type) {
        case ADD_RIFF:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVE_RIFF:
            const copyState = { ...state };
            delete copyState[action.payload.id];
            return copyState;
        case LOAD_RIFFS:
            const riffData = {};
            for (let riff of action.payload) {
                riffData[riff.id] = riff;
            }
            return { ...riffData };
        default:
            return state;
    }
}

export default riffReducer;