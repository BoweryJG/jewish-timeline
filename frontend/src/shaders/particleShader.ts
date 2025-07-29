export const particleVertexShader = `
  uniform float time;
  uniform float size;
  
  attribute float aScale;
  attribute vec3 aVelocity;
  attribute float aLifetime;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vColor = aColor;
    
    // Calculate particle position based on velocity and time
    vec3 pos = position + aVelocity * mod(time, aLifetime);
    
    // Fade out as particle ages
    float life = mod(time, aLifetime) / aLifetime;
    vOpacity = 1.0 - life;
    
    // Add some turbulence
    pos.x += sin(time + position.y * 0.1) * 0.5;
    pos.y += cos(time + position.x * 0.1) * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = size * aScale * (300.0 / -mvPosition.z) * (1.0 - life * 0.5);
  }
`;

export const particleFragmentShader = `
  uniform sampler2D pointTexture;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vec4 color = vec4(vColor, vOpacity);
    vec4 texture = texture2D(pointTexture, gl_PointCoord);
    
    gl_FragColor = color * texture;
    
    // Discard fully transparent pixels
    if (gl_FragColor.a < 0.01) discard;
  }
`;

export const populationFlowVertexShader = `
  uniform float time;
  uniform float flowSpeed;
  uniform vec3 sourcePos;
  uniform vec3 targetPos;
  
  attribute float aProgress;
  attribute float aOffset;
  
  varying float vProgress;
  varying vec3 vColor;
  
  vec3 bezierCurve(vec3 p0, vec3 p1, vec3 p2, float t) {
    float u = 1.0 - t;
    float tt = t * t;
    float uu = u * u;
    
    vec3 p = uu * p0;
    p += 2.0 * u * t * p1;
    p += tt * p2;
    
    return p;
  }
  
  void main() {
    // Calculate progress along the flow
    float progress = mod(aProgress + time * flowSpeed + aOffset, 1.0);
    vProgress = progress;
    
    // Create control point for bezier curve
    vec3 control = mix(sourcePos, targetPos, 0.5);
    control.y += distance(sourcePos, targetPos) * 0.3;
    
    // Calculate position along bezier curve
    vec3 pos = bezierCurve(sourcePos, control, targetPos, progress);
    
    // Add some variation
    pos.x += sin(aOffset * 10.0 + time) * 0.2;
    pos.z += cos(aOffset * 10.0 + time) * 0.2;
    
    // Color based on progress (golden at source, fading at target)
    vColor = mix(vec3(1.0, 0.84, 0.0), vec3(0.5, 0.4, 0.0), progress);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = (1.0 - progress * 0.5) * 10.0 * (300.0 / -mvPosition.z);
  }
`;

export const populationFlowFragmentShader = `
  varying float vProgress;
  varying vec3 vColor;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    float opacity = 1.0 - vProgress * 0.7;
    opacity *= 1.0 - dist * 2.0;
    
    gl_FragColor = vec4(vColor, opacity);
  }
`;