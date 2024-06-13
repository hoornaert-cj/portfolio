import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BackgroundAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        // Scene Setup
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Create Stars
        const starCount = 30;
        const starGeometry = new THREE.SphereGeometry(1.5, 24, 24); // Adjust size if needed
        const starMaterial = new THREE.MeshBasicMaterial({ color: '#424242' }); // Set star color

        for (let i = 0; i < starCount; i++) {
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.position.set(
                THREE.MathUtils.randFloatSpread(100),  // Spread the stars around the scene
                THREE.MathUtils.randFloatSpread(100),
                THREE.MathUtils.randFloatSpread(100)
            );
            scene.add(star);
        }

        camera.position.z = 50;

        // Animation Function
        const animate = () => {
            requestAnimationFrame(animate);
            // Rotate stars slightly for a twinkling effect
            scene.children.forEach(star => {
                star.rotation.x += 0.001;
                star.rotation.y += 0.001;
            });
            renderer.render(scene, camera);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mount.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default BackgroundAnimation;
