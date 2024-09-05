type Lesson = {
	lesson: number;
	title: string;
	url: string;
};

type Content = {
	title: string;
	lessons: Lesson[];
};

export const content: Content[] = [
	{
		title: "Basics",
		lessons: [
			{ lesson: 3, title: "First Three.js Project", url: "" },
			{ lesson: 4, title: "Transform Objects", url: "" },
			{ lesson: 5, title: "Animations", url: "" },
			{ lesson: 6, title: "Camera", url: "" },
			{ lesson: 7, title: "Fullscreen and Resizing", url: "" },
			{ lesson: 8, title: "Geometries", url: "" },
			{ lesson: 9, title: "Debug UI", url: "" },
			{ lesson: 10, title: "Textures", url: "" },
			{ lesson: 11, title: "Materials", url: "" },
			{ lesson: 12, title: "3D Text", url: "" },
			{ lesson: 13, title: "Go Live", url: "https://webgl-3d-text-ten-amber.vercel.app/" },
		],
	},
	{
		title: "Classic Techniques",
		lessons: [
			{ lesson: 14, title: "Lights", url: "https://webgl-lights-silk.vercel.app/" },
			{ lesson: 15, title: "Shadows", url: "https://shadows-puce.vercel.app/" },
			{ lesson: 16, title: "Haunted House", url: "https://haunted-house-sand-zeta.vercel.app/" },
			{ lesson: 17, title: "Particles", url: "https://particles-gamma.vercel.app/" },
			{ lesson: 18, title: "Galaxy Generator", url: "https://galaxy-generator-eight-chi.vercel.app/" },
			{ lesson: 19, title: "Scroll-based Animation", url: "https://scroll-based-animation-silk.vercel.app/" },
		],
	},
	{
		title: "Advanced Techniques",
		lessons: [
			{ lesson: 20, title: "Physics", url: "https://physics-smoky.vercel.app/" },
			{ lesson: 21, title: "Imported Models", url: "https://imported-models-six.vercel.app/" },
			{ lesson: 22, title: "Raycaster and Mouse Events", url: "https://raycaster-and-mouse-events-sigma.vercel.app/" },
			{ lesson: 24, title: "Environment Maps", url: "https://environment-map-mu.vercel.app/" },
			{ lesson: 25, title: "Realistic Render", url: "https://realistic-render-sigma.vercel.app/" },
			{ lesson: 26, title: "Code Structuring for Bigger Projects", url: "" },
		],
	},
	{
		title: "Shaders",
		lessons: [
			{ lesson: 27, title: "Shader", url: "" },
			{ lesson: 28, title: "Shader Patterns", url: "" },
			{ lesson: 29, title: "Raging Sea", url: "https://raging-sea-pink.vercel.app/" },
		],
	},
	{
		title: "Extra",
		lessons: [
			{ lesson: 45, title: "Post Processing", url: "" },
			{ lesson: 46, title: "Performace Tips", url: "" },
			{ lesson: 47, title: "Intro and loading progress", url: "" },
			{ lesson: 48, title: "Mixing HTML and WebGL", url: "" },
		],
	},
	{
		title: "Portal Scene",
		lessons: [
			{ lesson: 49, title: "Creating a Scene in Blender", url: "" },
			{ lesson: 50, title: "Baking and Exporting the Scene", url: "" },
			{ lesson: 51, title: "Importing and Optimizing the Scene", url: "" },
			{ lesson: 52, title: "Adding Details to the Scene", url: "" },
		],
	},
	{
		title: "React Three Fiber",
		lessons: [
			{ lesson: 55, title: "First R3F Application", url: "https://first-r3f-application-self.vercel.app/" },
			{ lesson: 56, title: "Drei", url: "https://r3f-drei-brown.vercel.app/" },
			{ lesson: 57, title: "Debug", url: "https://debug-r3f-application.vercel.app/" },
			{ lesson: 58, title: "Environment and Staging", url: "https://environment-and-staging-with-r3f-seven.vercel.app/" },
			{ lesson: 59, title: "Load Models", url: "https://load-models-with-r3f-snowy.vercel.app/" },
			{ lesson: 60, title: "3D Text", url: "https://3d-text-with-r3f-bice.vercel.app/" },
			{ lesson: 61, title: "Portal Scene", url: "https://portal-scene-with-r3f-pi.vercel.app/" },
			{ lesson: 62, title: "Mouse Events", url: "https://mouse-events-with-r3f-alpha.vercel.app/" },
			{ lesson: 63, title: "Post Processing", url: "" },
			{ lesson: 64, title: "Fun and Simple Portfolio", url: "" },
		],
	},
];
