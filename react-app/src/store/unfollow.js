// const ADD_FOLLOW = "follows/addFollow";
// const REMOVE_FOLLOW = "follows/removeFollow";
const LOAD_UNFOLLOWS = "unfollows/loadUnfollows";

// const addFollow = (follow) => {
// 	// console.log('inside action');
// 	return {
// 		type: ADD_FOLLOW,
// 		payload: follow,
// 	};
// };

// const removeFollow = (follow) => {
// 	return {
// 		type: REMOVE_FOLLOW,
// 		payload: follow,
// 	};
// };

const loadUnfollows = (unfollows) => {
    console.log(unfollows);
	return {
		type: LOAD_UNFOLLOWS,
		payload: unfollows.unfollows,
	};
};

// export const makeFollow = (followed_id, follower_id) => async (dispatch) => {
// 	const form = new FormData();
// 	// form.append("user_id", follow.user_id);
// 	// form.append("riff_id", riffId);
// 	// form.append("text", follow.text);

// 	const response = await fetch(`/api/users/follow/${followed_id}/`, {
// 		method: "POST",
// 		body: form,
// 	});

// 	const followData = await response.json();

// 	if (response.ok) {
// 		dispatch(addFollow(followData));
// 		return followData;
// 	} else {
// 		return followData;
// 	}
// };

// export const deleteFollow = (followed_id, follower_id) => async (dispatch) => {
// 	const form = new FormData();

// 	const response = await fetch(`/api/users/unfollow/${followed_id}/`, {
// 		method: "POST",
// 		body: form,
// 	});

// 	const followData = await response.json();

// 	if (response.ok) {
// 		dispatch(removeFollow(followData));
// 		return followData;
// 	} else {
// 		return followData;
// 	}
// };

export const genUnfollows = () => async (dispatch) => {
	// can add more types of responses later

    console.log('think thunk thuuuuunk--------------')


	const [unfollowsResponse] = await Promise.all([
		fetch(`/api/users/unfollows/`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);

    console.log(unfollowsResponse);

	const [unfollows] = await Promise.all([unfollowsResponse.json()]);

	console.log(unfollows);

	if (unfollowsResponse.ok) {
		dispatch(loadUnfollows(unfollows));
		return unfollows;
	}
};

const unfollowReducer = (state = {}, action) => {
	switch (action.type) {
		// case ADD_FOLLOW:
		// 	return { ...state, [action.payload.id]: action.payload };
		// case REMOVE_FOLLOW:
		// 	const copyState = { ...state };
		// 	delete copyState[action.payload.id];
		// 	return copyState;
		case LOAD_UNFOLLOWS:
			const unfollowData = {};
            for (let user of action.payload) {
                unfollowData[user.id] = user;
            }
			return { ...unfollowData };
            // return { ...action.payload }
		default:
			return state;
	}
};

export default unfollowReducer;