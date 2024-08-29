// precision mediump float;
// cannot use attributes in the fragment shader
// varying float vRandom; // passed from the vertex shader
varying vec2 vUv; // passed from the vertex shader
varying float vElevation; // passed from the vertex shader

uniform vec3 uColor; // passed from the javascript
uniform sampler2D uTexture; // passed from the javascript

void main() {
    // gl_FragColor = vec4(vRandom, vRandom * 0.5, 1, 1.0);
    vec4 texture = texture2D(uTexture, vUv);
    texture.rgb *= vElevation * 2.0 + 0.9;
    gl_FragColor = texture;
    
    // gl_FragColor = vec4(vUv, 1.0, 1.0); // vUv debugging example
}