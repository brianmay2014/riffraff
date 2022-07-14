const ADD_RIFF = 'riffs/addRiff';
const REMOVE_RIFF = 'riffs/removeRiff';
const LOAD_RIFFS = 'riffs/loadRiffs';
const UPDATE_RIFF = 'riffs/updateRiff';

const addRiff = (riff) => {
    // console.log('inside action');
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
		fetch("/api/riffs/", {
            mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*"},
		}),
	]);
    const [riffs] = await Promise.all([
        riffsResponse.json(),
    ]);
    if (riffsResponse.ok) {
        // console.log(riffs)
        // console.log(riffs.riffs)
        dispatch(loadRiffs(riffs.riffs))
        return riffs;
    }
};

//gets all riffs for a specific user
export const genRiffsUser = (userId) => async (dispatch) => {
	//open to adding more types of responses later
	const [riffsResponse] = await Promise.all([
		fetch(`/api/riffs/users/${userId}/`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);
	const [riffs] = await Promise.all([riffsResponse.json()]);
	if (riffsResponse.ok) {
		// console.log(riffs)
		// console.log(riffs.riffs)
		dispatch(loadRiffs(riffs.riffs));
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

    // console.log('riffData', riffData);
    // console.log('response', response);
    // console.log('response.ok', response.ok);

    if (response.ok) {
        dispatch(addRiff(riffData));
        return riffData;
    } else {
        return riffData;
    }
}

export const deleteRiff = (riff) => async (dispatch) => {
    // const { id } = riff;

    const response = await fetch(`/api/riffs/${riff.id}/`, {
        method: "DELETE",
        body: JSON.stringify({ riff_id: riff.id })
    });
    if (response.ok) {
        dispatch(removeRiff(riff));
    }
};

export const editRiff = (riff) => async (dispatch) => {
    const {id, title, note} = riff;

    const form = new FormData();
    form.append('title', title);
    form.append('note', note);

    const response = await fetch(`/api/riffs/${id}`, {
        method: "PATCH",
        body: form,
    });
    const riffData = await response.json();
    
    // console.log('*-//*-*-/-/**-/*/-', riffData);
    dispatch(addRiff(riffData))
    return { ...riffData }


    // if (response.ok) {
	// 	dispatch(addRiff(riffData));
	// 	return { ...riffData }
	// } else {
    //     return { ...riffData };
    // }
}

export const likeRiff = (riff_id) => async (dispatch) => {

    const response = await fetch(`/api/riffs/like/${riff_id}/`, {
        method: "PATCH",
    });
    const riffData = await response.json();

    dispatch(addRiff(riffData))
    return { ...riffData }
}
export const unlikeRiff = (riff_id) => async (dispatch) => {
	const response = await fetch(`/api/riffs/unlike/${riff_id}/`, {
		method: "PATCH",
	});
	const riffData = await response.json();

	dispatch(addRiff(riffData));
	return { ...riffData };
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