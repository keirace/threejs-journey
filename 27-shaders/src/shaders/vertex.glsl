// prebuilt variables are commented out and are not necessary to declare when using ShaderMaterial
// uniforms are values that are constant for all vertices
// uniform mat4 projectionMatrix; // projectionMatrix is the matrix that represents the camera lens
// uniform mat4 viewMatrix; // viewMatrix is the matrix that represents the camera position and orientation
// uniform mat4 modelMatrix; // modelMatrix is the matrix that represents the position, rotation and scale of the object

// attributes are values that are different for each vertex
// attribute vec3 position;
// attribute vec2 uv;

uniform vec2 uFrequency; // passed from the javascript
uniform float uTime; // passed from the javascript

// attribute float aRandom;

// varying is a value that is passed from the vertex shader to the fragment shader
// varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {

    // Variable instantiation examples
    // vec2 ins = vec2(0.0);
    // vec3 foo = vec3(1.0, 0.0, 0.0);
    // vec2 bar = foo.xy; // bar is now vec2(1.0, 0.0) called swizzling

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1; // waves
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1; // waves

    modelPosition.z += elevation;
    // modelPosition.z = aRandom * 0.1; // spikes

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition; // set the position of the vertex

    // vRandom = aRandom; // pass the random value to the fragment shader
    vUv = uv;
    vElevation = elevation;
}