const LOAD_UNFOLLOWS = "unfollows/loadUnfollows";

const loadUnfollows = (unfollows) => {
    console.log(unfollows);
	return {
		type: LOAD_UNFOLLOWS,
		payload: unfollows.unfollows,
	};
};


export const genUnfollows = () => async (dispatch) => {
	// can add more types of responses later

	const [unfollowsResponse] = await Promise.all([
		fetch(`/api/users/unfollows/`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);

    // console.log(unfollowsResponse);

	const [unfollows] = await Promise.all([unfollowsResponse.json()]);

	// console.log(unfollows);

	if (unfollowsResponse.ok) {
		dispatch(loadUnfollows(unfollows));
		return unfollows;
	}
};

const unfollowReducer = (state = {}, action) => {
	switch (action.type) {
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