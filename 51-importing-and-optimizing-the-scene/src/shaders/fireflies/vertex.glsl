uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 2.0 + uTime) * aScale * 0.2;
    // modelPosition.y += sin(modelPosition.z * 2.0 + uTime) * 0.1;
    // modelPosition.y += sin(modelPosition.x * 2.0 + modelPosition.z * 2.0 + uTime) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uPixelRatio * uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z); // perspective correction
}