uniform sampler2D uPerlinTexture; // Texture for Perlin noise
uniform float uTime; // Time uniform for animation
uniform vec3 uColor; // Color uniform for the smoke
uniform float uOpacity; // Opacity uniform for the smoke

varying vec2 vUv; // Texure coordinates passed from the vertex shader

void main() {
    // Scale and animate the texture coordinates
    vec2 smokeUv = vUv; // Scale the texture coordinates to make the Perlin noise larger
    smokeUv.x *= 0.5; // Scale the x coordinate to make the Perlin noise larger
    smokeUv.y *= 0.3; // Scale the y coordinate to make the Perlin noise larger
    smokeUv.y -= uTime * 0.1; // Animate the y coordinate over time

    // Smoke
    // vec4 smokeColor = texture2D(uPerlinTexture, vUv); // Sample the Perlin noise texture
    // float smokeColor = texture2D(uPerlinTexture, vUv).r; // Sample 1 channel (r) of the Perlin noise texture because it's grayscale
    float smokeColor = texture2D(uPerlinTexture, smokeUv).r; // Sample 1 channel (r) of the Perlin noise texture because it's grayscale

    // Remap the sampled value to a range suitable for alpha blending
    smokeColor = smoothstep(0.4, 1.0, smokeColor);

    // Fade the edge of the smoke
    smokeColor *= smoothstep(0.0, 0.1, vUv.x); // Smooth the left edge of the smoke
    smokeColor *= smoothstep(1.0, 0.9, vUv.x); // Smooth the right edge of the smoke
    smokeColor *= smoothstep(0.0, 0.1, vUv.y); // Smooth the bottom edge of the smoke
    smokeColor *= smoothstep(1.0, 0.4, vUv.y); // Smooth the top edge of the smoke

    // Set the final color of the fragment
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(smokeColor, smokeColor, smokeColor, 1.0); // Use the sampled color with full opacity
    gl_FragColor = vec4(uColor, smokeColor * uOpacity); // Use the sampled color in the alpha channel to make it transparent
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);


    #include <tonemapping_fragment> // Apply tonemapping to the fragment color
    #include <colorspace_fragment> // !important for correct rendering -> Convert the color to the correct colorspace
}