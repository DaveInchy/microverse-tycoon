varying vec3 vNormal;

void main() {
  float i = pow(0.75 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * i;
}