import React from 'react';

export const UploadIcon = ({
	color = '#57277C',
	style = {},
	size = 66,
}: {
	color?: string;
	style?: React.CSSProperties;
	size?: number;
}) => {
	const width = 66;
	const height = 66;

	return (
		<div
			style={{
				width: size,
				height: size * (height / width),
				...style,
			}}
		>
			<svg
				width="100%"
				height="100%"
				viewBox={`0 0 ${width} ${height}`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M30.25 44V21.5875L23.1 28.7375L19.25 24.75L33 11L46.75 24.75L42.9 28.7375L35.75 21.5875V44H30.25ZM11 55V41.25H16.5V49.5H49.5V41.25H55V55H11Z"
					fill={color}
				/>
			</svg>
		</div>
	);
};
