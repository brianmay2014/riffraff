const LOAD_USER = 'users/loadUser';

const loadUser = (user) => {
    return {
        type: LOAD_USER,
        payload: user,
    };
};

export const genUser = (userId) => async (dispatch) => {
    const [userResponse] = await Promise.all([
		fetch(`/api/users/${userId}`, {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);
    const [user] = await Promise.all([
        userResponse.json(),
    ]);
    if (userResponse.ok) {
        // console.log(userResponse);
        // console.log(user.user);
        // console.log(user);
        dispatch(loadUser(user))
        return user;
    }
}

const userReducer = (state = {}, action) => {

    switch (action.type) {
		case LOAD_USER:
			// const userData = {};
			// console.log(action);
			// userData[action.payload.id] = action.payload;
			// userData = {action.payload};
			return { ...action.payload };
		default:
			return state;
	}
}

export default userReducer;