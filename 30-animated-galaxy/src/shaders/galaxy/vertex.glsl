uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceFromCenter = length(modelPosition.xz); // Distance from the center of the galaxy
    float angleOffset = (1.0 / distanceFromCenter) * uTime * 0.2; // Offset based on distance and time
    angle += angleOffset; // Apply the angle offset to create the spin effect
    modelPosition.x = cos(angle) * distanceFromCenter;
    modelPosition.z = sin(angle) * distanceFromCenter;

    // Randomness
    modelPosition.xyz += aRandomness; // Apply randomness to the position

    vec4 viewPosition = modelViewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    gl_PointSize *= ( 1.0 / - viewPosition.z ); // Size attenuation

    // Color
    vColor = color;
}