import React from 'react';

function LoadingBar() {
	let circleCommonClasses =
		'h-5.5 w-5.5 bg-gray-base rounded-full content-center';

	return (
		<div className="flex">
			<div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
			<div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
			<div className={`${circleCommonClasses} mr-1 animate-bounce400`}></div>
		</div>
	);
}

export default LoadingBar;
