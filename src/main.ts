import './style.css';
import { mat3, mat4 } from 'wgpu-matrix';
import {
  cubemapVertexShader,
  cubemapFragmentShader,
  cubemapVertices,
  cubeFragmentShader,
  cubeVertexShader,
  cubeVertices,
  greyRockARMTextureURL,
  greyRockDiffuseTextureURL,
  quadVertexShader,
  quadVertices,
  quadFragmentShader,
} from './assets';
import { dbg } from './debug';
const canvas = document.querySelector('canvas')!;
let width = (canvas.width = canvas.clientWidth);
let height = (canvas.height = canvas.clientHeight);
document.onresize = () => {
  width = canvas.width = canvas.clientWidth;
  height = canvas.height = canvas.clientHeight;
};
async function initWebGPU() {
  const context = canvas.getContext('webgpu')!;
  const adapter = (await navigator.gpu.requestAdapter())!;
  const device = await adapter.requestDevice();
  // prettier-ignore
  device.pushErrorScope('validation');
  device.pushErrorScope('internal');
  const cubeVertexBuffer = device.createBuffer({
    size: cubeVertices.byteLength,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
  });
  device.queue.writeBuffer(cubeVertexBuffer, 0, cubeVertices);
  const quadVertexBuffer = device.createBuffer({
    size: quadVertices.byteLength,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
  });
  device.queue.writeBuffer(quadVertexBuffer, 0, quadVertices);
  const cubemapVertexBuffer = device.createBuffer({
    size: cubemapVertices.byteLength,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
  });
  device.queue.writeBuffer(cubemapVertexBuffer, 0, cubemapVertices);

  const uniformBufferSize = 4 * 4 * 3 * 4;
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const cubemapUniformBufferSize = 4 * 4 * 2 * 4;
  const cubemapUniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const cubeVsShader = device.createShaderModule({
    code: cubeVertexShader,
  });
  const cubeFsShader = device.createShaderModule({
    code: cubeFragmentShader,
  });

  const quadVsShader = device.createShaderModule({
    code: quadVertexShader,
  });
  const quadFsShader = device.createShaderModule({
    code: quadFragmentShader,
  });

  const cubemapVsShader = device.createShaderModule({
    code: cubemapVertexShader,
  });
  const cubemapFsShader = device.createShaderModule({
    code: cubemapFragmentShader,
  });

  const sampleCount = 4;
  const format = 'bgra8unorm';
  context.configure({ device, format, alphaMode: 'premultiplied' });

  const cubePipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      entryPoint: 'main',
      module: cubeVsShader,
      buffers: [
        {
          arrayStride: 8 * 4,
          attributes: [
            {
              format: 'float32x3',
              offset: 0,
              shaderLocation: 0,
            },
            {
              format: 'float32x3',
              offset: 3 * 4,
              shaderLocation: 1,
            },
            {
              format: 'float32x2',
              offset: 6 * 4,
              shaderLocation: 2,
            },
          ],
        },
      ],
    },
    fragment: {
      entryPoint: 'main',
      module: cubeFsShader,
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
    multisample: {
      count: sampleCount,
    },
  });
  const quadPipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      entryPoint: 'main',
      module: quadVsShader,
      buffers: [
        {
          arrayStride: 4 * 4,
          attributes: [
            {
              format: 'float32x2',
              offset: 0,
              shaderLocation: 0,
            },
            {
              format: 'float32x2',
              offset: 2 * 4,
              shaderLocation: 1,
            },
          ],
        },
      ],
    },
    fragment: {
      entryPoint: 'main',
      module: quadFsShader,
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
    },
    multisample: undefined,
  });
  const cubemapPipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      entryPoint: 'main',
      module: cubemapVsShader,
      buffers: [
        {
          arrayStride: 3 * 4,
          attributes: [
            {
              format: 'float32x3',
              offset: 0,
              shaderLocation: 0,
            },
          ],
        },
      ],
    },
    fragment: {
      entryPoint: 'main',
      module: cubemapFsShader,
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
    },
    multisample: {
      count: sampleCount,
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less-equal',
      format: 'depth24plus',
    },
  });
  async function textureFromUrl(url: string) {
    const response = await fetch(url);
    const imageBitmap = await createImageBitmap(await response.blob());
    const texture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });
    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: texture },
      [imageBitmap.width, imageBitmap.height]
    );
    return texture;
  }
  const diffTexture = await textureFromUrl(greyRockDiffuseTextureURL);
  const armTexture = await textureFromUrl(greyRockARMTextureURL);

  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });
  const depthTexture = device.createTexture({
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
    sampleCount,
  });
  const cubeBindGroup = device.createBindGroup({
    layout: cubePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformBuffer,
        },
      },
      {
        binding: 1,
        resource: sampler,
      },
      {
        binding: 2,
        resource: diffTexture.createView(),
      },
      {
        binding: 3,
        resource: armTexture.createView(),
      },
    ],
  });
  const framebuffer = device.createTexture({
    size: [width, height],
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    format: 'bgra8unorm',
  });
  const quadBindGroup = device.createBindGroup({
    layout: quadPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: sampler,
      },
      {
        binding: 1,
        resource: framebuffer.createView(),
      },
    ],
  });
  const cubemapBindGroup = device.createBindGroup({
    layout: cubemapPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: cubemapUniformBuffer,
        },
      },
    ],
  });

  const colorTexture = device.createTexture({
    size: [width, height],
    sampleCount,
    format: format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  });

  device.popErrorScope().then((e) => {
    if (e && e.message && e.message.length != 0) {
      dbg(`error ${e.message}`);
    }
  });
  device.popErrorScope().then((e) => {
    if (e && e.message && e.message.length != 0) {
      dbg(`error ${e.message}`);
    }
  });

  function loop(time: number) {
    const commandEncoder = device.createCommandEncoder();

    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          loadOp: 'clear',
          storeOp: 'discard',
          clearValue: { r: 0.03, g: 0.06, b: 0.12, a: 1.0 },
          view: colorTexture.createView(),
          resolveTarget: framebuffer.createView(),
        },
      ],
      depthStencilAttachment: {
        view: depthTexture.createView(),

        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    });

    const modelMatrix = mat4.identity();

    const aspect = width / height;
    const near = 0.1;
    const far = 1000;
    const perspectiveMatrix = mat4.perspective(1.4, aspect, near, far);

    const eye = [Math.sin(time / 1000.0) * 3, -1, Math.cos(time / 1000.0) * 3];
    const target = [0, 0, 0];
    const up = [0, 1, 0];

    const viewMatrix = mat4.lookAt(eye, target, up);
    const cubemapViewMatrix = mat4.fromMat3(mat3.fromMat4(viewMatrix));

    const uniformArray = new Float32Array(uniformBufferSize / 4);
    uniformArray.set(modelMatrix, 0);
    uniformArray.set(perspectiveMatrix, modelMatrix.length);
    uniformArray.set(viewMatrix, modelMatrix.length + perspectiveMatrix.length);
    device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

    const cubemapUniformArray = new Float32Array(cubemapUniformBufferSize / 4);
    cubemapUniformArray.set(cubemapViewMatrix);
    cubemapUniformArray.set(perspectiveMatrix, cubemapViewMatrix.length);
    device.queue.writeBuffer(cubemapUniformBuffer, 0, cubemapUniformArray);

    renderPass.setVertexBuffer(0, cubemapVertexBuffer);
    renderPass.setPipeline(cubemapPipeline);
    renderPass.setBindGroup(0, cubemapBindGroup);
    renderPass.draw(36);

    renderPass.setVertexBuffer(0, cubeVertexBuffer);
    renderPass.setPipeline(cubePipeline);
    renderPass.setBindGroup(0, cubeBindGroup);
    renderPass.draw(36);
    renderPass.end();
    const secondRenderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          loadOp: 'clear',
          storeOp: 'store',
          clearValue: { r: 0.03, g: 0.06, b: 0.12, a: 1.0 },
          view: context.getCurrentTexture().createView(),
        },
      ],
    });

    // quad render pass
    secondRenderPass.setBindGroup(0, quadBindGroup);
    secondRenderPass.setVertexBuffer(0, quadVertexBuffer);
    secondRenderPass.setPipeline(quadPipeline);
    secondRenderPass.draw(6);

    secondRenderPass.end();

    device.queue.submit([commandEncoder.finish()]);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

initWebGPU();
