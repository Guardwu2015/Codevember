// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D textureNormal;

uniform vec3 uColor;

float diffuse(vec3 N, vec3 L) {
	return max(dot(N, normalize(L)), 0.0);
}


vec3 diffuse(vec3 N, vec3 L, vec3 C) {
	return diffuse(N, L) * C;
}


const vec3 LIGHT = vec3(1.0, .8, 1.6);


void main(void) {
	vec3 N = texture2D(textureNormal, vTextureCoord).rgb * 2.0 - 1.0;
    float d = diffuse(N, LIGHT);
	d = mix(d, 1.0, .5);
	vec3 color = uColor * d;
    gl_FragColor = vec4(color, 1.0);
}