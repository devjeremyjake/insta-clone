import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

const TimelinePost = ({ content }) => {
	const commentInput = useRef(null);
	const handleFocus = () => commentInput.current.focus();
	const {
		imageSrc,
		username,
		caption,
		docId,
		userLikedPhotos,
		likes,
		comments,
		dateCreated,
	} = content;
	return (
		<div className="rounded col-span-3 border bg-white border-gray-primary mb-3">
			<Header username={username} />
			<Image src={imageSrc} caption={caption} />
			<Actions
				docId={docId}
				totalLikes={likes.length}
				handleFocus={handleFocus}
				likedPhoto={userLikedPhotos}
			/>
			<Footer username={username} caption={caption} />
			<Comments
				docId={docId}
				comments={comments}
				posted={dateCreated}
				commentInput={commentInput}
			/>
		</div>
	);
};

TimelinePost.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
};

export default TimelinePost;
