attribute v3 position;
attribute v2 uv;
varying vec2 v;

void main(){
	gl_Position= vec4(position, 1.0);
	v = uv;
}