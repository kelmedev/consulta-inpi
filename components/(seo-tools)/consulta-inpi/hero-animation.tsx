import * as THREE from 'three';
import { SimplexNoise } from 'simplex-noise';
import chroma from 'chroma-js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface AppConfig {
  fov?: number;
  cameraZ?: number;
  background?: number;
  tubeRadius?: number;
  resY?: number;
  resX?: number;
  noiseCoef?: number;
  timeCoef?: number;
  mouseCoef?: number;
  heightCoef?: number;
  ambientColor?: number;
  lightIntensity?: number;
  light1Color?: number;
  light2Color?: number;
  light3Color?: number;
  light4Color?: number;
}

interface NoiseConfig {
  coef: number;
  height: number;
  time: number;
  mouseX: number;
  mouseY: number;
  mouse: number;
}

const simplex = new SimplexNoise();

function App(conf: AppConfig = {}) {
  conf = {
    fov: 75,
    cameraZ: 150,
    background: 0x000000,
    tubeRadius: 3,
    resY: 10,
    resX: 4,
    noiseCoef: 50,
    timeCoef: 50,
    mouseCoef: 50,
    heightCoef: 20,
    ambientColor: 0xcccccc,
    lightIntensity: 1,
    light1Color: 0x24f59e,
    light2Color: 0xe15040,
    light3Color: 0x1b859e,
    light4Color: 0x4cb04b,
    ...conf
  };

  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let cameraCtrl: OrbitControls;
  let width: number, height: number, cx: number, cy: number, wWidth: number, wHeight: number;
  const TMath = THREE.MathUtils;

  let light1: THREE.PointLight, light2: THREE.PointLight, light3: THREE.PointLight, light4: THREE.PointLight;
  let objects: Tube[] = [];
  let noiseConf: NoiseConfig = {} as NoiseConfig;
  let cscale: chroma.Scale;
  updateCScale(chroma('#d11f6c'));

  const mouse = new THREE.Vector2();

  init();

  function init(): void {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;
    cameraCtrl = new OrbitControls(camera, renderer.domElement);

    updateSize();
    window.addEventListener('resize', updateSize, false);

    document.addEventListener('mousemove', (e: MouseEvent) => {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
    });

    initScene();
    initGui();
    animate();
  }

  function initGui(): void {
    document.body.addEventListener('click', () => {
      updateColors();
    });
  }

  function initScene(): void {
    scene = new THREE.Scene();
    if (conf.background) scene.background = new THREE.Color(conf.background);
    initLights();
    initObjects();

    camera.position.z = 130;
  }

  function initLights(): void {
    scene.add(new THREE.AmbientLight(conf.ambientColor));

    const z = 50;
    const lightDistance = 500;
    light1 = new THREE.PointLight(conf.light1Color, conf.lightIntensity, lightDistance);
    light1.position.set(0, wHeight / 2, z);
    scene.add(light1);
    light2 = new THREE.PointLight(conf.light2Color, conf.lightIntensity, lightDistance);
    light2.position.set(0, -wHeight / 2, z);
    scene.add(light2);
    light3 = new THREE.PointLight(conf.light3Color, conf.lightIntensity, lightDistance);
    light3.position.set(wWidth / 2, 0, z);
    scene.add(light3);
    light4 = new THREE.PointLight(conf.light4Color, conf.lightIntensity, lightDistance);
    light4.position.set(-wWidth / 2, 0, z);
    scene.add(light4);
  }

  function initObjects(): void {
    updateNoise();
    const nx = Math.round(wWidth / conf.resX) + 1;
    const ny = Math.round(wHeight / conf.resY) + 1;
    objects = [];
    let tube: Tube;
    let color: string;
    for (let j = 0; j < ny; j++) {
      color = cscale(TMath.randFloat(0, 1)).hex();
      tube = new Tube(-wWidth / 2, -wHeight / 2 + j * conf.resY, wWidth, nx, conf.tubeRadius, color, noiseConf);
      objects.push(tube);
      scene.add(tube.mesh);
    }
  }

  function updateNoise(): void {
    noiseConf.coef = conf.noiseCoef * 0.00012;
    noiseConf.height = conf.heightCoef;
    noiseConf.time = Date.now() * conf.timeCoef * 0.000002;
    noiseConf.mouseX = mouse.x / 2;
    noiseConf.mouseY = mouse.y / 2;
    noiseConf.mouse = mouse.x + mouse.y;
  }

  function updateColors(): void {
    const color = chroma.random();
    updateCScale(color);
    for (let i = 0; i < objects.length; i++) {
      objects[i].material.color = new THREE.Color(cscale(TMath.randFloat(0, 1)).hex());
    }
    light1.color = new THREE.Color(chroma.random().hex());
    light2.color = new THREE.Color(chroma.random().hex());
    light3.color = new THREE.Color(chroma.random().hex());
    light4.color = new THREE.Color(chroma.random().hex());
  }

  function updateCScale(color: chroma.Color): void {
    const colors = [
      color.set('hsl.s', TMath.randFloat(0, 1)).set('hsl.l', TMath.randFloat(0, 0.3)).hex(),
      color.set('hsl.s', TMath.randFloat(0, 1)).set('hsl.l', 0.3 + TMath.randFloat(0, 0.4)).hex(),
      color.set('hsl.s', TMath.randFloat(0, 1)).set('hsl.l', 0.7 + TMath.randFloat(0, 0.3)).hex(),
      0xffffff,
    ];
    cscale = chroma.scale(colors);
  }

  function animate(): void {
    requestAnimationFrame(animate);

    animateObjects();
    animateLights();

    if (cameraCtrl) cameraCtrl.update();
    renderer.render(scene, camera);
  }

  function animateObjects(): void {
    updateNoise();
    for (let i = 0; i < objects.length; i++) {
      objects[i].update();
    }
  }

  function animateLights(): void {
    const time = Date.now() * 0.001;
    const dx = wWidth / 2;
    const dy = wHeight / 2;
    light1.position.x = Math.sin(time * 0.1) * dx;
    light1.position.y = Math.cos(time * 0.2) * dy;
    light2.position.x = Math.cos(time * 0.3) * dx;
    light2.position.y = Math.sin(time * 0.4) * dy;
    light3.position.x = Math.sin(time * 0.5) * dx;
    light3.position.y = Math.sin(time * 0.6) * dy;
    light4.position.x = Math.sin(time * 0.7) * dx;
    light4.position.y = Math.cos(time * 0.8) * dy;
  }

  function updateSize(): void {
    width = window.innerWidth;
    cx = width / 2;
    height = window.innerHeight;
    cy = height / 2;
    if (renderer && camera) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const wsize = getRendererSize();
      wWidth = wsize[0];
      wHeight = wsize[1];
    }
  }

  function getRendererSize(): [number, number] {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
  }
}

class CustomCurve extends THREE.Curve<THREE.Vector3> {
  private x: number;
  private y: number;
  private l: number;
  private noise: NoiseConfig;
  private yn: number;

  constructor(x: number, y: number, l: number, noise: NoiseConfig) {
    super();
    this.x = x;
    this.y = y;
    this.l = l;
    this.noise = noise;
    this.yn = this.y * this.noise.coef;
  }

  getPoint(t: number): THREE.Vector3 {
    let x = this.x + t * this.l;
    let xn = x * this.noise.coef;
    let noise1 = simplex.noise2D(xn + this.noise.time + this.noise.mouseX/2, this.yn - this.noise.time + this.noise.mouseY/2);
    let noise2 = simplex.noise2D(this.yn + this.noise.time, xn - this.noise.time);
    let z = noise2 * this.noise.height;
    let y = this.y + noise1 * this.noise.height;
    return new THREE.Vector3(x, y, z);
  }
}

class Tube {
  private segments: number;
  private radialSegments: number;
  private radius: number;
  private curve: CustomCurve;
  public geometry: THREE.TubeGeometry;
  public material: THREE.MeshStandardMaterial;
  public mesh: THREE.Mesh;
  private frames: { tangents: THREE.Vector3[]; normals: THREE.Vector3[]; binormals: THREE.Vector3[] };

  constructor(x: number, y: number, l: number, segments: number, radius: number, color: string, noise: NoiseConfig) {
    this.segments = segments;
    this.radialSegments = 8;
    this.radius = radius;

    this.curve = new CustomCurve(x, y, l, noise);
    this.geometry = new THREE.TubeGeometry(this.curve, segments, radius, this.radialSegments, false);
    this.material = new THREE.MeshStandardMaterial({ color, metalness: 1 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  update(): void {
    this.frames = this.curve.computeFrenetFrames(this.segments, false);
    this.updateGeometry();
  }

  private updateGeometry(): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    const normals = this.geometry.attributes.normal.array as Float32Array;
    const P = new THREE.Vector3();
    const normal = new THREE.Vector3();

    for (let i = 0; i <= this.segments; i++) {
      const point = this.curve.getPointAt(i / this.segments, P);
      const N = this.frames.normals[i];
      const B = this.frames.binormals[i];

      for (let j = 0; j <= this.radialSegments; j++) {
        const v = (j / this.radialSegments) * Math.PI * 2;
        const sin = Math.sin(v);
        const cos = -Math.cos(v);

        normal.x = cos * N.x + sin * B.x;
        normal.y = cos * N.y + sin * B.y;
        normal.z = cos * N.z + sin * B.z;
        normal.normalize();

        const index = (i * (this.radialSegments + 1) + j) * 3;

        normals[index] = normal.x;
        normals[index + 1] = normal.y;
        normals[index + 2] = normal.z;

        positions[index] = point.x + this.radius * normal.x;
        positions[index + 1] = point.y + this.radius * normal.y;
        positions[index + 2] = point.z + this.radius * normal.z;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.normal.needsUpdate = true;
  }
}

export default App;
