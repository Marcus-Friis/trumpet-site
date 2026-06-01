export type Route = {
	href: string;
	label: string;
	type: string;
	content?: string;
	contentType?: string;
	tags?: string[];
	source?: string;
};

export const routes: Route[] = [
	{
		href: '/snake-eater',
		label: 'Snake Eater',
		type: 'tune',
		content: '/pdf/metal-gear-solid-3-snake-eater.pdf',
		contentType: 'pdf',
		source:
			'https://www.vgleadsheets.com/view/metal-gear-solid-3-snake-eater/snake-eater?transposition=Bb'
	},
	{
		href: '/wynton-all-of-me',
		label: 'All of me improv',
		type: 'improv',
		content:
			'<iframe width="1200" height="600" src="https://www.youtube.com/embed/umJB6J87k0A?si=vM6t42-nIBZVQHfh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
		contentType: 'iframe',
		source: 'https://www.youtube.com/watch?v=umJB6J87k0A'
	},
	{
		href: '/the-good-the-bad-the-ugly',
		label: 'The Good, The Bad, The Ugly',
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="80%" height="1000" src="https://musescore.com/user/175294/scores/168248/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/175294/scores/168248" target="_blank">The Good, The Bad, The Ugly - The Triello</a> by <a href="https://musescore.com/user/175294">ingegnere</a></span>',
		contentType: 'iframe',
		source: 'https://musescore.com/user/175294/scores/168248'
	},
	{
		href: '/the-chicken-backing',
		label: 'The Chicken: Backing track',
		type: 'backing',
		content:
			'<iframe width="1200" height="600" src="https://www.youtube.com/embed/CrZ_bAZn0JA?si=kq7j_a4oJwuTz47Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
		contentType: 'iframe',
		source: 'https://www.youtube.com/watch?v=CrZ_bAZn0JA'
	},
	{
		href: '/joy-spring',
		label: 'Joy Spring',
		type: 'tune',
		content: '/pdf/Joy-Spring-Bb.pdf',
		contentType: 'pdf',
		source:
			'https://dpu-p-001.sitecorecontenthub.cloud/api/public/content/c25d27380de24fa49a8d4f561d11b7a6?v=011c4e4a'
	},
	{
		href: '/groovin-high',
		label: 'Groovin High',
		type: 'tune',
		content: '/pdf/Groovin-High-Bb.pdf',
		contentType: 'pdf',
		source: 'https://communityartsprogram.org/wp-content/uploads/2016/05/Groovin-High-Bb.pdf'
	},
	{
		href: '/so-what',
		label: 'So What Solo Transcription',
		type: 'improv',
		content: '/pdf/So-What-Solo.pdf',
		contentType: 'pdf',
		source:
			'http://www.thetuningnote.com/_transcriptions/jazz%20trumpet/Miles%20Davis%20-%20So%20What%20(Kind%20of%20Blue,%201959).pdf'
	},
	{
		href: '/sandu-solo',
		label: 'Clifford Brown Sandu solo transcription',
		type: 'improv',
		content:
			'<iframe id="score-iframe" width="100%" height="394" src="https://musescore.com/user/27189085/scores/6198365/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/27189085/scores/6198365" target="_blank">Clifford Brown Sandu solo transcription</a> by <a href="https://musescore.com/user/27189085">LucasDavis6</a></span>',
		contentType: 'iframe',
		source: 'https://musescore.com/user/27189085/scores/6198365'
	}
];
