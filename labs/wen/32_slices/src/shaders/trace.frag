precision highp float;

varying vec2 uv;

const float PI      = 3.141592657;
const int NUM_ITER  = {{NUM_ITER}};
// const float maxDist = 5.0;

uniform sampler2D texture;
uniform sampler2D textureBlur;
uniform sampler2D textureMap;
uniform float time;
uniform float focus;
uniform float metaK;
uniform float zGap;
uniform float maxDist;
uniform vec2 theta;


//	TOOLS
vec2 rotate(vec2 pos, float angle) {
	float c = cos(angle);
	float s = sin(angle);

	return mat2(c, s, -s, c) * pos;
}

float smin( float a, float b, float k ) {
    float res = exp( -k*a ) + exp( -k*b );
    return -log( res )/k;
}

float smin( float a, float b ) {	return smin(a, b, 7.0);	}

//	GEOMETRY
float sphere(vec3 pos, float radius) {
	return length(pos) - radius;
}

float displacement(vec3 p) {
	return sin(20.0*p.x+time*.232)*sin(20.0*p.y+time*.25)*sin(20.0*p.z+time*.33);
}

float rep(float p, float c) {	return mod(p, c) - 0.5*c;	}
vec2 rep(vec2 p, float c) {		return mod(p, c) - 0.5*c;	}

vec2 repAng(vec2 p, float n) {
    float ang = 2.0*PI/n;
    float sector = floor(atan(p.x, p.y)/ang + 0.5);
    p = rotate(p, sector*ang);
    return p;
}

vec3 repAngS(vec2 p, float n) {
    float ang = 2.0*PI/n;
    float sector = floor(atan(p.x, p.y)/ang + 0.5);
    p = rotate(p, sector*ang);
    return vec3(p.x, p.y, mod(sector, n));
}

float box( vec3 p, vec3 b ) {
	vec3 d = abs(p) - b;
	return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

const float size = 2.0;

vec2 map(vec3 pos) {
	float colorIndex = 1.0;
	vec3 posSlice = pos;
	posSlice.z = rep(clamp(posSlice.z, -size, size), size*.1);
	float dBox = box(posSlice, vec3(size*2.0, size*2.0, .01));


	float dSphere0 = sphere(pos+vec3(.5, sin(time*.234325)*.2, cos(time*.3) * .4), size+cos(time*.5)*.2);
	float dNoise0 = displacement(pos*.2) * .1;
	float dSphere1 = sphere(pos+vec3(-.5, sin(time*.5)*.3, cos(time*.234325)*.2), size+sin(time)*.2);
	float dNoise1 = displacement(pos*.2) * .1;
	float d = smin(dSphere0 + dNoise0, dSphere1 + dNoise1);

	// if(dBox > d ) {
	// 	d = dBox;
	// }
	d = max(d, dBox);
	
	return vec2(d, colorIndex);
}

vec3 computeNormal(vec3 pos) {
	vec2 eps = vec2(0.001, 0.0);

	vec3 normal = vec3(
		map(pos + eps.xyy).x - map(pos - eps.xyy).x,
		map(pos + eps.yxy).x - map(pos - eps.yxy).x,
		map(pos + eps.yyx).x - map(pos - eps.yyx).x
	);
	return normalize(normal);
}


//	LIGHTING
const vec3 lightPos0 = vec3(-0.6, 0.7, -0.5);
const vec3 lightColor0 = vec3(1.0, 1.0, .96);
const float lightWeight0 = 0.15;

const vec3 lightPos1 = vec3(-1.0, -0.75, -.6);
const vec3 lightColor1 = vec3(.96, .96, 1.0);
const float lightWeight1 = 0.15;

float ao( in vec3 pos, in vec3 nor ){
	float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float hr = 0.01 + 0.12*float(i)/4.0;
        vec3 aopos =  nor * hr + pos;
        float dd = map( aopos ).x;
        occ += -(dd-hr)*sca;
        sca *= 0.95;
    }
    return clamp( 1.0 - 3.0*occ, 0.0, 1.0 );    
}

vec3 envLight(vec3 normal, vec3 dir, sampler2D tex) {
	vec3 eye    = -dir;
	vec3 r      = reflect( eye, normal );
	float m     = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );
	vec2 vN     = r.xy / m + .5;
	vN.y        = 1.0 - vN.y;
	vec3 color  = texture2D( tex, vN ).rgb;
	float power = 10.0;
	color.r     = pow(color.r, power);
	color       = color.rrr;
    return color;
}


float softshadow( in vec3 ro, in vec3 rd, in float mint, in float tmax ) {
	float res = 1.0;
    float t = mint;
    for( int i=0; i<16; i++ ) {
		float h = map( ro + rd*t ).x;
        res = min( res, 8.0*h/t );
        t += clamp( h, 0.02, 0.10 );
        if( h<0.001 || t>tmax ) break;
    }
    return clamp( res, 0.0, 1.0 );
}


float diffuse(vec3 normal, vec3 light) {
	return max(dot(normal, light), 0.0);
}

vec4 getColor(vec3 pos, vec3 dir, vec3 normal, float colorIndex) {
	vec3 baseColor = vec3(0.0);
	vec3 env = vec3(.0);
	if(colorIndex == 0.0) {
		baseColor = vec3(1.0, 1.0, .96) * .05;
		env      = envLight(normal, dir, texture);
	} else {
		baseColor = vec3(.5, 0.25, 0.25);
		env      = envLight(normal, dir, texture);
	}

	vec2 uv 	 = vec2(fract(pos.z*.5-time*.1), .5);
	baseColor    = texture2D(textureMap, uv).rgb;

	env *= .5;
	vec3  lig     = normalize( lightPos0 );
	float shadow  = softshadow(pos, lig, 0.02, 2.5 );
	shadow        = mix(shadow, 1.0, .5);
	float _ao     = ao(pos, normal);
	vec3 _diffuse = diffuse(normal, normalize(lightPos0)) * lightColor0 * lightWeight0;
	_diffuse      += diffuse(normal, normalize(lightPos1)) * lightColor1 * lightWeight1;
	return vec4(vec3(baseColor+env+_diffuse)*_ao*shadow, 1.0);	
	
}

mat3 setCamera( in vec3 ro, in vec3 ta, float cr ) {
	vec3 cw = normalize(ta-ro);
	vec3 cp = vec3(sin(cr), cos(cr),0.0);
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

void main(void) {
	float r  = 5.0;
	float tr = cos(theta.x) * r;
	vec3 pos = vec3(cos(theta.y) * tr, sin(theta.x) * r, sin(theta.y) * tr);
	vec3 ta  = vec3( 0.0, 0.0, 0.0 );
	mat3 ca  = setCamera( pos, ta, 0.0 );
	vec3 dir = ca * normalize( vec3(uv,focus) );

	vec4 color = vec4(0.0);
	float prec = pow(.1, 7.0);
	float d;
	float colorIndex = 0.0;
	bool hit = false;
	
	for(int i=0; i<NUM_ITER; i++) {
		vec2 result = map(pos);						//	distance to object
		d = result.x;
		colorIndex = result.y;

		if(d < prec) {						// 	if get's really close, set as hit the object
			hit = true;
		}

		pos += d * dir;						//	move forward by
		if(length(pos) > maxDist) break;
	}


	if(hit) {
		color = vec4(1.0);
		vec3 normal = computeNormal(pos);
		color = getColor(pos, dir, normal, colorIndex);
	}
	

    gl_FragColor = color;
}