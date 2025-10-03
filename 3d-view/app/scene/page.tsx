"use client"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
export default function scene(){

    const ThreeScene:React.FC = ()=>{
        const cret = useRef<HTMLElement>(null)

        if(typeof window !== 'undefined'){

            useEffect(()=>{
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth/2,window.innerHeight/2);
            cret.current?.appendChild(renderer.domElement)
            camera.position.z=5;
            



            if (typeof window !== 'undefined'){
            const geom = new THREE.BoxGeometry(1,1,1);
            const mat = new THREE.MeshBasicMaterial({color:0x00ff00})
            const cub  = new THREE.Mesh(geom,mat);
            scene.add(cub)
            renderer.render(scene,camera)

            const animate = ()=>{
            cub.rotation.x += 0.01;
            cub.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);

            }
            animate()


        }
        },[])




        }

        return <div ref={cret}/>

    }
    return (
    
    <>
    <div className='flex justify-center items-center h-screen w-screen'>
        <ThreeScene  />
    </div>
    
    </>)
}