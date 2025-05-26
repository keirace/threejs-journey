uniform float uTime; // Time uniform for animation
uniform sampler2D uPerlinTexture; // Texture for Perlin noise

varying vec2 vUv;

#include includes/rotate2D.glsl;

void main() {
    vec3 newPosition = position; // position is an attribute, need to update the postion value via a new variable

    // Twist
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.01)).r; 
    float angle = twistPerlin * 10.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5, // Wind effect from negative to positive
        texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
    );
    windOffset *= pow(uv.y, 2.0) * 10.0; // Scale the wind effect based on the y coordinate
    newPosition.xz += windOffset;

    // Set the final position of the vertex
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Pass the texture coordinates to the fragment shader
    vUv = uv;
}