import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Usephotos from '../hooks/use-photos';
import TimelinePost from './timelinePost';

const Timeline = () => {
	const { photos } = Usephotos();
	return (
		<div className="container col-span-2">
			{!photos ? (
				<>
					<Skeleton className="mb-4" count={4} width={540} height={400} />
				</>
			) : photos?.length > 0 ? (
				photos.map((content) => (
					<TimelinePost key={content.docId} content={content} />
				))
			) : (
				<p className="text-center text-2xl">Follow people to see Photos</p>
			)}
		</div>
	);
};

export default Timeline;
