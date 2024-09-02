import * as THREE from "three";
import { useEffect, useRef, useMemo } from "react";

export default function CustomObjects() {
	const geometryRef = useRef();

	useEffect(() => {
		geometryRef.current.computeVertexNormals();
	}, []);

	const verticesCount = 10 * 3; // 10 triangles

	// useMemo behaves like cache
	const positions = useMemo(() => {
		const positions = new Float32Array(verticesCount * 3); // 3 vertices per triangle
		for (let i = 0; i < verticesCount; i++) {
			positions[i * 3 + 0] = (Math.random() - 0.5) * 4;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
		}
		return positions;
	}, []);

	return (
		<mesh>
			<bufferGeometry ref={geometryRef}>
				<bufferAttribute attach="attributes-position" /* BufferAttribute attaching itself to geometry.attribute.position */ count={verticesCount} itemSize={3} array={positions} />
			</bufferGeometry>
			<meshStandardMaterial color="hotpink" side={THREE.DoubleSide} />
		</mesh>
	);
}
