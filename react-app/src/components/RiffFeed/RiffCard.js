import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RiffFeed.css";
// import { genRiffs } from "../../store/riff";
import CommentDisplay from "./CommentDisplay";

const RiffCard = ( {riff} ) => {
	// const user = useSelector((state) => state.session.user);
	// const [errors, setErrors] = useState([]);

	//maybe to re-render the whole card??????
    // const riffs = useSelector((state) => state.riffs);
	// const dispatch = useDispatch();
    
    // null before riffs / riff prop loads from the store
    if (!riff) {
        return null;
    }

	// if (riff.author_img === '') {
	// 	riff.author_img =
	// 		"https://images.pexels.com/photos/7899456/pexels-photo-7899456.png?auto=compress&cs=tinysrgb&w=126&h=75&dpr=1";
	// }

	return (
		<div id={`riff-card-${riff.id}`} className="riff-cards">
			<div className="riff-header">
				<img
					className="card-user-img"
					src={riff?.author_img}
					alt="default-remove"
				>
                </img>
				<p className='authorname'>{riff.author_username}</p>
			</div>
			<div className="riff-player">
				Individual riff player will go here!
			</div>
			<div className='card-caption'>
                <span className='authorname'> {riff.author_username}</span>
                <span>{riff.note}</span>
            </div>
            <CommentDisplay riff={riff}/>
		</div>
	);
};

export default RiffCard;
