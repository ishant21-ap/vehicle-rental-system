import React from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CarModel = () => {

    React.useEffect(() => {
        let scene, camera, renderer, controls, car;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 3);

        renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x201e1e, 1); // Set the clear color to #201e1e with full opacity

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;

        controls.enableRotate = true;
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;   

        const rgbeLoader = new RGBELoader();
        rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/autumn_field_2k.hdr', function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = texture;
        });

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('./generic_sedan_car.glb', function (gltf) {
            car = gltf.scene;
            scene.add(car);
            car.position.set(0, 0, 0);
            car.scale.set(0.5, 0.5, 0.5);
        }, undefined, function (error) {
            console.error(error);
        });

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        animate();

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
            if (car) {
                car.rotation.y = -0.8;
                car.rotation.x = 0.1;
            }
        }
    })
    return (
        <canvas style={{ width: '100%', height: '100%' }}>

        </canvas>
    )
}

export default CarModel
