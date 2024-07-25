import React from 'react';

export const GenerateIcon = ({
	color = 'currentColor',
	style = {},
	size = 18,
}: {
	color?: string;
	style?: React.CSSProperties;
	size?: number;
}) => {
	const width = 18;
	const height = 18;

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
					d="M14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V4L14 0ZM16 16H2V2H13.17L16 4.83V16ZM9 9C7.34 9 6 10.34 6 12C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12C12 10.34 10.66 9 9 9ZM3 3H12V7H3V3Z"
					fill={color}
				/>
			</svg>
		</div>
	);
};
