varying vec3 vColor; // Color from vertex shader

void main() {
    // Disc pattern
    // float strength = distance(gl_PointCoord, vec2(0.5)); // Distance from the center of the point
    // strength = 1.0 - step(0.5, strength); // Step function to create a disc shape

    // Diffuse point
    // float strength = distance(gl_PointCoord, vec2(0.5)); // Distance from the center of the point
    // strength *= 2.0;
    // strength = 1.0 - strength;

    // Light Point
    float strength = distance(gl_PointCoord, vec2(0.5)); // Distance from the center of the point
    strength = 1.0 - strength; // Invert the distance to create a light point effect
    strength = pow(strength, 10.0); // Apply a power function to enhance the effect

    // Final color
    vec3 finalColor = mix(vec3(0.0), vColor, strength); // Mix the vertex color with white based on strength

    // cannot send the uv bacause each vertex is a particle
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0); // point coord is specific to the point
    gl_FragColor = vec4(finalColor, 1.0); // Set color based on strength
    #include <colorspace_fragment>
}