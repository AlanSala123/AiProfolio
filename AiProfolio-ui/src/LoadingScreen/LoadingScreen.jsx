import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import "./LoadingScreen.css"

function LoadingScreen() {
  return (
    <div className='loadingScreen'>
    <MorphingBall/>
    <h1 className = 'loading-text' style={{
        position: "absolute",
        bottom: "17.5vh",
        width: "100vw",
        textAlign: "center",
    }}>Creating Portfolio<span className="loading-dots"></span></h1>
    </div>

  )
}

export default LoadingScreen;

function MorphingBall() {
  const refDiv = useRef(null);

  useEffect(() => {

    

    const onWindowResize = () => {
        // Update camera aspect ratio and renderer size
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
  
      window.addEventListener('resize', onWindowResize, false);

    const noise3D = createNoise3D(Math.random);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    if(refDiv.current.firstChild){
      refDiv.current.firstChild.remove();
    }
    refDiv.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const originalGeometry = geometry.clone(); // Clone the original geometry

    // add color attribute
    const colors = new Float32Array(geometry.attributes.position.count * 3);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Increase canvas size for higher resolution
    // const scale = window.devicePixelRatio; // Change to 1 on devices that don't support high-res canvas
    // canvas.width = 1024 * scale;
    // canvas.height = 512 * scale;

    // // Ensure all future drawing operations are scaled
    // context.scale(scale, scale);

    // // Adjust the font size to be larger to account for the increased canvas size
    // context.font = '100px Franklin Gothic Medium';
    // context.textAlign = 'center';
    // context.textBaseline = 'middle';

    // context.fillStyle = 'white';
    // context.fillText('Profolio', canvas.width / 2 / scale, canvas.height / 2 / scale);
    // context.fillStyle = 'green';
    // context.fillText('Ai', canvas.width / 3.5 / scale, canvas.height / 2 / scale);

    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Use the texture when creating the material for the sphere
    const material = new THREE.MeshBasicMaterial({ map: texture, vertexColors: THREE.VertexColors });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add light to the scene
    const light = new THREE.DirectionalLight(0x89ffaa, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Add ambient light
    scene.add(ambientLight);

    const color = new THREE.Color();
    const clock = new THREE.Clock();

    let explodeFactor = 5;
    let reforming = false;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onDocumentMouseDown = (event) => {
      event.preventDefault();

      // Update mouse position for raycasting
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Compute intersections
      const intersects = raycaster.intersectObject(sphere);

      if (intersects.length > 0) {
        console.log("Sphere was clicked."); // Debug log
        explodeFactor += 0.7
        reforming = false;
        setTimeout(() => {
          reforming = true;
        }, 200);
      }
    }

    const onTouchStart = (event) => {
      event.preventDefault();

      // Update touch position for raycasting
      mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Compute intersections
      const intersects = raycaster.intersectObject(sphere);

      if (intersects.length > 0) {
        console.log("Sphere was touched."); // Debug log
        explodeFactor = 5;
        reforming = false;
        setTimeout(() => {
          reforming = true;
        }, 200);
      }
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onTouchStart, false);

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      const { position, color: colorAttribute } = sphere.geometry.attributes;
      const originalPosition = originalGeometry.attributes.position;

      for(let i = 0; i < position.count; i++) {
        const offset = noise3D(originalPosition.getX(i), originalPosition.getY(i), originalPosition.getZ(i) + elapsedTime);
        const direction = Math.sign(offset);

        const multiplier = 1 + Math.pow(0.1 * explodeFactor * offset * direction, 2);
        // const multiplier = 1 + Math.abs(Math.sin(explodeFactor * offset * direction)) / 5;

       

        position.setXYZ(i, originalPosition.getX(i) * multiplier, originalPosition.getY(i) * multiplier, originalPosition.getZ(i) * multiplier);

        color.setHSL(0.33, 1, (offset + 1) / 2);
        colorAttribute.setXYZ(i, color.r, color        .g, color.b);
    }

    position.needsUpdate = true;
    colorAttribute.needsUpdate = true;

    // gradually reform the sphere
    if (reforming && explodeFactor > 5) {
      explodeFactor = explodeFactor * 0.99;
      if (explodeFactor < 5) {
        explodeFactor = 5;
        reforming = false;
      }
    }
    sphere.rotation.y -= 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  return () => {
    originalGeometry.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    // remove event listener when component unmounts
    document.removeEventListener('mousedown', onDocumentMouseDown, false);
    document.removeEventListener('touchstart', onTouchStart, false);
    window.removeEventListener('resize', onWindowResize, false);
  };
}, []);

return <div ref={refDiv} />;
}

