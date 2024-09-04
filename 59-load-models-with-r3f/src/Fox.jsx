import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox(props) {
	const fox = useGLTF("./Fox/glTF/Fox.gltf");
	const animations = useAnimations(fox.animations, fox.scene);

	const { animationsName } = useControls({
		animationsName: { options: animations.names },
	});

	useEffect(() => {
		const action = animations.actions[animationsName]
        action.reset().fadeIn(0.5).play();

        return () => {
            action.fadeOut(0.5)
        }
	}, [animationsName]);

	return <primitive object={fox.scene} scale={0.02} position-y={-1}></primitive>;
}
