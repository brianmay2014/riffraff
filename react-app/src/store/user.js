const LOAD_USER = 'users/loadUser';

const loadUser = (user) => {
    return {
        type: LOAD_USER,
        payload: user,
    };
};

export const genUser = (userId) => async (dispatch) => {
    const [userResponse] = await Promise.all([
		fetch("/api/user/", {
			mode: "no-cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		}),
	]);
    const [user] = await Promise.all([
        userResponse.json(),
    ]);
    if (userResponse.ok) {
        dispatch(loadUser(user.user))
        return user;
    }
}

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_USER:
            const userData = {};
            userData[action.payload.id] = action.payload;
            return { ...userData };
        default:
            return state;
    }
}

export default userReducer;