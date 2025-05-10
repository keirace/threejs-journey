import { use, useEffect, useState } from "react";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import useGame from "./useGame.js";

function Player() {
	const player = useRef();
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();

	const [smoothCameraPosition] = useState(() => new THREE.Vector3());
	const [smoothCameraLookAt] = useState(() => new THREE.Vector3());

	const start = useGame((state) => state.start);
    const end = useGame((state) => state.end);
    const restart = useGame((state) => state.restart);
    const blocksCount = useGame((state) => state.blocksCount);

	// console.log(world);
	const jump = () => {
		const origin = player.current.translation(); // get the current position of the player
		origin.y -= 0.31; // move the origin down to check for ground collision
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true); // check for collision with the ground
		// console.log(hit);
		if (hit.timeOfImpact < 0.15) {
			// distance to the ground
			player.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
		}
	};

    const reset = () => {
        player.current.setTranslation({ x: 0, y: 1, z: 0 });
        player.current.setLinvel({ x: 0, y: 0, z: 0 }); // reset the linear velocity
        player.current.setAngvel({ x: 0, y: 0, z: 0 }); // reset the angular velocity
    }
    
	useEffect(() => {
        const subscribeReset = useGame.subscribe((state) => state.phase, (value) => {
            if (value === "ready") {
                reset();
            }
        });
		const unsubscribeJump = subscribeKeys(
			(state) => state.jump, // selector
			(value) => {
				if (value) {
					jump();
				}
			}
		);

		const unsubscribeAny = subscribeKeys(() => {
			// detect any key pressed down to start the game
			start();
		});
		return () => {
			unsubscribeJump();
			unsubscribeAny();
            subscribeReset();
		};
	}, []);

	useFrame((state, delta) => {
		/**
		 * Movement
		 */
		const { forward, backward, leftward, rightward, jump } = getKeys();
		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };
		const impulseStrength = 0.6 * delta;
		const torqueStrength = 0.2 * delta;
		if (forward) {
			impulse.z -= impulseStrength;
			torque.x -= torqueStrength;
		}
		if (leftward) {
			impulse.x -= impulseStrength;
			torque.z += torqueStrength;
		}
		if (rightward) {
			impulse.x += impulseStrength;
			torque.x -= torqueStrength;
		}
		if (backward) {
			impulse.z += impulseStrength;
			torque.x += torqueStrength;
		}
		player.current.applyImpulse(impulse);
		player.current.applyTorqueImpulse(torque);

		/**
		 * Camera
		 */
		const playerPosition = player.current.translation();
		const { camera } = state;

		const cameraPosition = new THREE.Vector3();
		cameraPosition.copy(playerPosition);
		cameraPosition.y += 0.65;
		cameraPosition.z += 2.25;

		const cameraLookAt = new THREE.Vector3();
		cameraLookAt.copy(playerPosition);
		cameraLookAt.y += 0.25;
		smoothCameraPosition.lerp(cameraPosition, 5 * delta); // smooth the camera position with frame rate taking into account
		smoothCameraLookAt.lerp(playerPosition, 5 * delta);
		camera.position.copy(smoothCameraPosition);
		camera.lookAt(smoothCameraLookAt);

        /**
         * Game Over
         */
        if (playerPosition.z < -(blocksCount * 4) + 2) {
            end();
        }
        if (playerPosition.y < -4) {
            restart();
        }
	});
	return (
		<RigidBody ref={player} position={[0, 1, 0]} colliders="ball" restitution={0.2} friction={1} canSleep={false} angularDamping={0.5} linearDamping={0.5}>
			<mesh castShadow>
				<icosahedronGeometry args={[0.3, 1]} />
				<meshStandardMaterial flatShading color="mediumpurple" />
			</mesh>
		</RigidBody>
	);
}

export default Player;
