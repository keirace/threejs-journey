import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    // Define the keyboard controls
	<KeyboardControls
		map={[
			{ name: "rightward", keys: ["ArrowRight", "KeyD"] },
			{ name: "leftward", keys: ["ArrowLeft", "KeyA"] },
			{ name: "forward", keys: ["ArrowUp", "KeyW"] },
			{ name: "backward", keys: ["ArrowDown", "KeyS"] },
			{ name: "jump", keys: ["Space"] },
		]} // Add Key + [letter] for other keyboard layouts
	>
		<Canvas
			shadows
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [2.5, 4, 6],
			}}
		>
			<Experience />
		</Canvas>
		<Interface />
	</KeyboardControls>
);
