const ADD_FOLLOW = "follows/addFollow";
const REMOVE_FOLLOW = "follows/removeFollow";
const LOAD_FOLLOWS = "follows/loadFollows";


const addFollow = (follow) => {
	// console.log('inside action');
	return {
		type: ADD_FOLLOW,
		payload: follow,
	};
};

const removeFollow = (follow) => {
	return {
		type: REMOVE_FOLLOW,
		payload: follow,
	};
};

const loadFollows = (follows) => {
	return {
		type: LOAD_FOLLOWS,
		payload: follows,
	};
};

export const makeFollow = (followed_id, follower_id) => async (dispatch) => {
	
	const form = new FormData();
	// form.append("user_id", follow.user_id);
	// form.append("riff_id", riffId);
	// form.append("text", follow.text);

	const response = await fetch(`/api/users/follow/${followed_id}/`, {
		method: "POST",
		body: form,
	});

	const followData = await response.json();

	if (response.ok) {
		dispatch(addFollow(followData));
		return followData;
	} else {
		return followData;
	}
};

export const deleteFollow = (followed_id, follower_id) => async (dispatch) => {

    const form = new FormData();

	const response = await fetch(`/api/users/unfollow/${followed_id}/`, {
		method: "POST",
		body: form,
	});

    const followData = await response.json();

	if (response.ok) {
		dispatch(removeFollow(followData));
        return followData;
	} else {
        return followData;
    }
};

export const genFollows = () => async (dispatch) => {
	// can add more types of responses later

	const [followsResponse] = await Promise.all([
		fetch(`/api/users/follows/`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);

	const [follows] = await Promise.all([followsResponse.json()]);

    // console.log(follows)

	if (followsResponse.ok) {
		
		dispatch(loadFollows(follows));
		return follows;
	}
};

export const genUserFollows = (id) => async (dispatch) => {
	// can add more types of responses later

	const [followsResponse] = await Promise.all([
		fetch(`/api/users/${id}/follows/`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);

	const [follows] = await Promise.all([followsResponse.json()]);

	// console.log(follows)

	if (followsResponse.ok) {
		dispatch(loadFollows(follows.follows));
		return follows;
	}
};

const followReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_FOLLOW:
			return { ...state, [action.payload.id]: action.payload };
		case REMOVE_FOLLOW:
			const copyState = { ...state };
			delete copyState[action.payload.id];
			return copyState;
		case LOAD_FOLLOWS:
			// const followData = {};
			return { ...action.payload };
		default:
			return state;
	}
};

export default followReducer;
