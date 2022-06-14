import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
// import { login } from "../../store/session";
import "./RiffFeed.css";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import RiffCard from "./RiffCard";

const RiffFeed = () => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);
    const riffs = useSelector((state) => state.riffs);
	// const comments = useSelector((state) => state.comments);

	const dispatch = useDispatch();
	// const history = useHistory();

    useEffect(() => {
        dispatch(genRiffs());
		dispatch(genComments());
    }, [dispatch]);

    
    // null before riffs loads from the store
    if (!riffs) {
        return null;
    } 		
		// console.log(riffs);
		const riffArr = Object.values(riffs)
		//sort by id
		// console.log(riffArr);
		riffArr.sort((a, b) => {
			return b.id - a.id;
		});

		// console.log(riffArr);

		// console.log(riffArr);
		
		return (
			<div id="feed-body">
			    {riffArr && (riffArr.map((riff) => {
				        return <RiffCard key={`key-${riff?.id}`} riff={riff}/>;
				    }))}
			</div>
				
	);

};

export default RiffFeed;
