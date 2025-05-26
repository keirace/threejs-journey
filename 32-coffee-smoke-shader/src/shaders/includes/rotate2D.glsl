vec2 rotate2D(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(
        uv.x * c - uv.y * s,
        uv.x * s + uv.y * c
    );
}