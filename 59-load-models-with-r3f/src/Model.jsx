import { Clone, useGLTF } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function Model() {
	/* const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	}); */

	// Drei shorthand for the above commented out code
	const model = useGLTF("./hamburger.glb");
	return (
		<>
			<Clone scale={0.3} position-x={-3} object={model.scene} />;
			<Clone scale={0.3} position-x={0} object={model.scene} />;
			<Clone scale={0.3} position-x={3} object={model.scene} />;
		</>
	);
}

useGLTF.preload("./hamburger.glb");
