// prettier-ignore
export const quadVertices = new Float32Array([
  -1.0, -1.0, 0.0, 0.0, // bottom left
   1.0, -1.0, 1.0, 0.0, // bottom right
   1.0,  1.0, 1.0, 1.0, // top right
   1.0,  1.0, 1.0, 1.0, // top right
  -1.0, -1.0, 0.0, 0.0, // bottom left
  -1.0,  1.0, 0.0, 1.0, // top left
]);
// prettier-ignore

export const cubemapVertices = new Float32Array([
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
  -1.0,  1.0, -1.0,
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
  -1.0, -1.0, -1.0,
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
]);
// prettier-ignore
export const cubeVertices = new Float32Array([
  -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0, 0.0,
   0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0,
   0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 1.0,
   0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 1.0,
  -0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  0.0, 1.0,
  -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0, 0.0,
  -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 0.0,
   0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  1.0, 0.0,
   0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0, 1.0,
   0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0, 1.0,
  -0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0,
  -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 0.0,
  -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0, 0.0,
  -0.5,  0.5, -0.5, -1.0,  0.0,  0.0,  1.0, 1.0,
  -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0, 1.0,
  -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0, 1.0,
  -0.5, -0.5,  0.5, -1.0,  0.0,  0.0,  0.0, 0.0,
  -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0, 0.0,
   0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0, 0.0,
   0.5,  0.5, -0.5,  1.0,  0.0,  0.0,  1.0, 1.0,
   0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0, 1.0,
   0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0, 1.0,
   0.5, -0.5,  0.5,  1.0,  0.0,  0.0,  0.0, 0.0,
   0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0, 0.0,
  -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0, 1.0,
   0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0, 1.0,
   0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0, 0.0,
   0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0, 0.0,
  -0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  0.0, 0.0,
  -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0, 1.0,
  -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0, 1.0,
   0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  1.0, 1.0,
   0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0, 0.0,
   0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0, 0.0,
  -0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0, 0.0,
  -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0, 1.0
]);

export const cubeVertexShader = `
struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) worldPos: vec3f,
  @location(1) normal: vec3f,
  @location(2) texCoords: vec2f,
}
struct Uniforms {
  modelMatrix : mat4x4<f32>,
  projectionMatrix : mat4x4<f32>,
  viewMatrix : mat4x4<f32>,
}
@group(0) @binding(0) var<uniform> uniforms : Uniforms;

@vertex
fn main(@location(0) position: vec3f, @location(1) normal: vec3f, @location(2) texCoords: vec2f) -> VertexOut {
  var vs_out:  VertexOut;
  vs_out.position = uniforms.projectionMatrix * uniforms.viewMatrix * uniforms.modelMatrix * vec4(position, 1.0);
  vs_out.worldPos = (uniforms.modelMatrix * vec4(position, 1.0)).xyz;
  vs_out.normal = normal;
  vs_out.texCoords = texCoords;
  return vs_out;
}`;
export const cubeFragmentShader = `
@group(0) @binding(1) var mySampler: sampler;
@group(0) @binding(2) var diffuseTexture: texture_2d<f32>;
@group(0) @binding(3) var armTexture: texture_2d<f32>;
struct Light {
  position: vec3f,
  color: vec3f,
  kind: u32
}
@fragment
fn main(@location(0) position: vec3f, @location(1) normal: vec3f, @location(2) texCoords: vec2f) -> @location(0) vec4f {
  var lights = array(
    Light(vec3f(0.5, 0.9, 0.3), vec3(1.5, 1.3, 1.2), 0)
  );
  var diffuse = textureSample(diffuseTexture, mySampler, texCoords).rgb;
  var arm = textureSample(armTexture, mySampler, texCoords).rgb;
  var ao = arm.x;
  var roughness = arm.y;
  var metallic = arm.z;
  var color = vec3(0.0, 0.0, 0.0);
  var N = normalize(normal);
  for (var i = 0; i < 1; i++) {
    var light = lights[i];
    var L = vec3(0.0);
    if (light.kind == 0) {
      L = normalize(light.position);
    } else if (light.kind == 1) {
      L = normalize(light.position - position);
    }
    var NdotL = max(0.0, dot(N, L));
    var radiance = light.color * NdotL;
    color += radiance;
  }
  return vec4(color, 1.0);
}`;
export const quadVertexShader = `
struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) texCoords: vec2f,
}
@vertex
fn main(@location(0) position: vec2f, @location(1) texCoords: vec2f) -> VertexOut {
  var vs_out: VertexOut;
  vs_out.position = vec4(position, 0.0, 1.0);
  vs_out.texCoords = texCoords;
  return vs_out;
}
`;
export const quadFragmentShader = `
@group(0) @binding(0) var mySampler: sampler;
@group(0) @binding(1) var myTexture: texture_2d<f32>;
@fragment
fn main(@location(0) texCoords: vec2f) -> @location(0) vec4f {
  var tex = vec2(texCoords.x, 1.0 - texCoords.y);
  var color = textureSample(myTexture, mySampler, tex).rgb;
  return vec4(color, 1.0);
}`;

export const cubemapVertexShader = `
struct Uniforms {
  viewMatrix : mat4x4<f32>,
  projectionMatrix : mat4x4<f32>,
}
@group(0) @binding(0) var<uniform> uniforms : Uniforms;
struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) worldPos: vec3f
}
@vertex
fn main(@location(0) position: vec3f) -> VertexOut {
  var out : VertexOut;
  out.position = uniforms.projectionMatrix * uniforms.viewMatrix * vec4(position, 1.0);
  out.position = out.position.xyww;
  out.worldPos = (vec4(position, 1.0)).xyz;
  return out;
}
`;
export const cubemapFragmentShader = `
@fragment
fn main(@location(0) worldPos: vec3f) -> @location(0) vec4f {
  return vec4(mix(vec3(1.0), vec3(0.5, 0.7, 1.0), worldPos.y*0.5+0.5), 1.0);
}
`;

export const greyRockDiffuseTextureURL =
  'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/gray_rocks/gray_rocks_diff_2k.jpg';
export const greyRockARMTextureURL =
  'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/gray_rocks/gray_rocks_arm_2k.jpg';
