import * as THREE from 'three';
import * as dat from 'dat.gui';

export interface SIZE {
    width: number,
    height: number
}

const scene = new THREE.Scene();
const canvas: any = document.querySelector('#webgl');
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas, alpha: true});

const gui = new dat.GUI();
const paramter: any = {
    materialColor: 0xff0000
}

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/3.jpg');
texture.magFilter = THREE.NearestFilter;

// Size
function getSize(): SIZE {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

// const sphere
const toonMaterial = new THREE.MeshToonMaterial({color: 0xff0000, gradientMap: texture});
gui.addColor(paramter,'materialColor').onChange(() => {
    console.log("Here",paramter.materialColor);
    toonMaterial.color.set(paramter.materialColor);
    toonMaterial.needsUpdate = true;
});
const torus: THREE.Mesh = new THREE.Mesh(new THREE.TorusGeometry(3,1,16,60),toonMaterial);
const cone: THREE.Mesh = new THREE.Mesh(new THREE.ConeGeometry(2,6,32),toonMaterial);
const torusKont: THREE.Mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(2,1,100,16),toonMaterial);
scene.add(torus,cone,torusKont);

// position
torus.position.y = - (10 * 0);
cone.position.y = - (10 * 1);
torusKont.position.y = - (10 * 2);

// color
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(2,2,2)
scene.add(directionalLight);

let size: SIZE = getSize();
const fieldOfView: number = 45;
const aspectRatio: number = size.width / size.height;
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(fieldOfView,aspectRatio);
camera.position.z = 15;
scene.add(camera);

renderer.setSize(size.width,size.height);
renderer.render(scene,camera);

function animation() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animation);
}

animation();

window.addEventListener('resize',() => {
    size = getSize();
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size.width,size.height);
});