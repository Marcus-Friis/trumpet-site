export type RouteType = 'tune' | 'transcription' | 'video' | 'backing' | 'study';

export type Route = {
	href: string;
	label: string;
	type: RouteType;
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
		tags: ['film', 'video game'],
		source:
			'https://www.vgleadsheets.com/view/metal-gear-solid-3-snake-eater/snake-eater?transposition=Bb'
	},
	{
		href: '/wynton-all-of-me',
		label: 'All of me improv',
		type: 'video',
		content:
			'<iframe width="100%" height="600" src="https://www.youtube.com/embed/umJB6J87k0A?si=vM6t42-nIBZVQHfh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
		contentType: 'iframe',
		tags: ['jazz', 'standard', 'wynton marsalis'],
		source: 'https://www.youtube.com/watch?v=umJB6J87k0A'
	},
	{
		href: '/the-good-the-bad-the-ugly',
		label: 'The Good, The Bad, The Ugly',
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/175294/scores/168248/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/175294/scores/168248" target="_blank">The Good, The Bad, The Ugly - The Triello</a> by <a href="https://musescore.com/user/175294">ingegnere</a></span>',
		contentType: 'iframe',
		tags: ['film', 'ennio morricone'],
		source: 'https://musescore.com/user/175294/scores/168248'
	},
	{
		href: '/the-chicken-backing',
		label: 'The Chicken: Backing track',
		type: 'backing',
		content:
			'<iframe width="100%" height="600" src="https://www.youtube.com/embed/CrZ_bAZn0JA?si=kq7j_a4oJwuTz47Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
		contentType: 'iframe',
		tags: ['jazz', 'funk', 'jaco pastorius'],
		source: 'https://www.youtube.com/watch?v=CrZ_bAZn0JA'
	},
	{
		href: '/joy-spring',
		label: 'Joy Spring',
		type: 'tune',
		content: '/pdf/Joy-Spring-Bb.pdf',
		contentType: 'pdf',
		tags: ['jazz', 'bebop', 'clifford brown'],
		source:
			'https://dpu-p-001.sitecorecontenthub.cloud/api/public/content/c25d27380de24fa49a8d4f561d11b7a6?v=011c4e4a'
	},
	{
		href: '/groovin-high',
		label: 'Groovin High',
		type: 'tune',
		content: '/pdf/Groovin-High-Bb.pdf',
		contentType: 'pdf',
		tags: ['jazz', 'bebop', 'dizzy gillespie'],
		source: 'https://communityartsprogram.org/wp-content/uploads/2016/05/Groovin-High-Bb.pdf'
	},
	{
		href: '/so-what',
		label: 'So What Solo Transcription',
		type: 'transcription',
		content: '/pdf/So-What-Solo.pdf',
		contentType: 'pdf',
		tags: ['jazz', 'modal', 'miles davis'],
		source:
			'http://www.thetuningnote.com/_transcriptions/jazz%20trumpet/Miles%20Davis%20-%20So%20What%20(Kind%20of%20Blue,%201959).pdf'
	},
	{
		href: '/sandu-solo',
		label: 'Clifford Brown Sandu solo transcription',
		type: 'transcription',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/27189085/scores/6198365/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/27189085/scores/6198365" target="_blank">Clifford Brown Sandu solo transcription</a> by <a href="https://musescore.com/user/27189085">LucasDavis6</a></span>',
		contentType: 'iframe',
		tags: ['jazz', 'bebop', 'clifford brown'],
		source: 'https://musescore.com/user/27189085/scores/6198365'
	},
	{
		href: '/youre-getting-to-be',
		label: "You're Getting To Be A Habit With Me",
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/70173934/scores/15429895/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/70173934/scores/15429895" target="_blank">You&#39;re Getting To Be A Habit With Me – Harry Warren, Al Dubin You&#39;re getting to be a habit with me – 42nd STREET</a> by <a href="https://musescore.com/user/70173934">realJerryDaHorn</a></span>',
		contentType: 'iframe',
		tags: ['jazz'],
		source: 'https://musescore.com/user/70173934/scores/15429895'
	},
	{
		href: '/its-been-a-long-long-time',
		label: "It's Been A Long, Long Time",
		type: 'tune',
		content: '/pdf/its-been-a-long-long-time.pdf',
		contentType: 'pdf',
		tags: ['jazz'],
		source:
			'http://www.thetuningnote.com/_trumpetsheets/jazz/lead%20sheets/It%27s%20Been%20A%20Long,%20Long%20Time%20(Bb%20part%20in%20concert%20Ab%20Major).pdf'
	},
	{
		href: '/some-skunk-funk',
		label: 'Some Skunk Funk',
		type: 'tune',
		content: '/pdf/some-skunk-funk.pdf',
		contentType: 'pdf',
		tags: ['funk', 'mibb'],
		source: 'MIBB'
	},
	{
		href: '/floral-fury',
		label: 'Floral Fury',
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/15425726/scores/5956939/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/15425726/scores/5956939" target="_blank">Floral Fury (PLAYABLE FULL TRUMPET SOLO)</a> by <a href="https://musescore.com/user/15425726">Kaptain Kaleb</a></span>',
		contentType: 'iframe',
		tags: ['video game', 'cuphead'],
		source: 'https://musescore.com/user/15425726/scores/5956939'
	},
	{
		href: '/autumn-leaves',
		label: 'Autumn Leaves',
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/30275987/scores/7194975/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/30275987/scores/7194975" target="_blank">Autumn Leaves – Chet Baker, Paul Desmond</a> by <a href="https://musescore.com/user/30275987">error129</a></span>',
		contentType: 'iframe',
		tags: ['jazz', 'standard'],
		source: 'https://musescore.com/user/30275987/scores/7194975'
	},
	{
		href: '/fistful-of-dollars',
		label: 'A Fistful of Dollars (Sundown)',
		type: 'tune',
		content:
			'<iframe id="score-iframe" width="100%" height="1000" src="https://musescore.com/user/19837461/scores/5038277/embed" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe><span><a href="https://musescore.com/user/19837461/scores/5038277" target="_blank">Sundown - A Fistful of Dollars - Ennio Morricone</a> by <a href="https://musescore.com/user/19837461">Deura</a></span>',
		contentType: 'iframe',
		tags: ['film', 'ennio morricone'],
		source: 'https://musescore.com/user/19837461/scores/5038277'
	},
	{
		href: '/softly-as-a-morning-sunrise',
		label: 'Softly As A Morning Sunrise',
		type: 'tune',
		content: '/pdf/Bb-Softly-as-a-Morning-Sunrise.pdf',
		contentType: 'pdf',
		tags: ['jazz', 'standard'],
		source: 'https://vtjazz.org/wp-content/uploads/2021/07/Bb-Softly-as-a-Morning-Sunrise.pdf'
	}
];
