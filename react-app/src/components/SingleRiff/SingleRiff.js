import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RiffCard from "../RiffFeed/RiffCard";
import { genRiffs } from "../../store/riff";
import { genComments } from "../../store/comment";
import FourOhFour from "../FourOhFour/FourOhFour";

function SingleRiff() {
	const [riff, setRiff] = useState({});
	const { riffId } = useParams();
    const dispatch = useDispatch();
    const riffs = useSelector((state) => state.riffs);
    const comments = useSelector((state) => state.comments);

	useEffect(() => {
		if (!riffId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/riffs/${riffId}`);
			const riff = await response.json();
			setRiff(riff);
		})();
	}, [riffId, riffs]);
 
    useEffect(() => {
		dispatch(genRiffs());
		dispatch(genComments());
	}, [dispatch]);

    // console.log(riffs);
    // console.log(riffId);
    // console.log(riffs[riffId]);



	if (!riff) {
        return null;
	}

	return (
        <>
                  <RiffCard riff={riff} />
        </>

	);
}
export default SingleRiff;
