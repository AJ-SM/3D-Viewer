"use client"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from 'mongoose';

const loader = new GLTFLoader();


export default function Scene(){

    const [file,setfile] = useState<File>()
    const [load,setLoad] = useState<boolean>(false)



    
        

    const ThreeScene:React.FC = ()=>{
        const cret = useRef<HTMLDivElement>(null)

        

        if(typeof window !== 'undefined'){

            useEffect(()=>{
            if (!cret.current) return;
            const scene = new THREE.Scene();
            scene.background= new THREE.Color(0x282c34)
            const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth/1.3,window.innerHeight/1.3);
            cret.current.innerHTML= ""
            cret.current?.appendChild(renderer.domElement)
            camera.position.z=5;

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            // === 2. Add Lighting! This is crucial. ===
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
            scene.add(ambientLight);
            
            let activeModel: THREE.Object3D | null = null;


            


          
            if(file){
                const url = URL.createObjectURL(file);
                console.log(`url is ${url}`)
             
                loader.load(url,function (gltf){
                    const model = gltf.scene;
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3())
                    const size = box.getSize(new THREE.Vector3())
                    model.position.sub(center)

                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 5 / maxDim;
                    model.scale.set(scale, scale, scale);
                    scene.add(model);
                     activeModel = model;
                     URL.revokeObjectURL(url);



                },undefined,function(error){
                    console.log(error)
                })

            }else{
                                // If no file, show the default cube
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Use StandardMaterial to react to light
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
                activeModel = cube; // Set the cube as the one to animate
            }

            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };

            animate();

        
            const handleResize = () => {
                if(cret.current) {
                    camera.aspect = cret.current.clientWidth / cret.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(cret.current.clientWidth, cret.current.clientHeight);
                }
            };
            window.addEventListener('resize', handleResize);
    

                return () => {
      // Cleanup on unmount
      renderer.dispose();
      scene.clear();
    };


        
        },[file])




        }

        return <div ref={cret}/>

    }


        const  onSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if (!file){return}
            
            const data = new FormData()
            data.set('file', file )
            const res = await fetch('api/upload', {
                method:'POST',
                body:data
            })
            
            setLoad(true)




            if(!res){
                console.log("NIGGA SOME THING BAD HAPPENED")
            }
            
        }
    return (
    
    <>
    <div className='h-screen w-screen bg-slate-800'>
        <div className='flex'>
            <div className='mt-10 ml-5'>
            <ThreeScene />

            </div>
            <div className='m-5 p-1 '>
                <div className='flex justify-center  w-75 font-bold text-2xl'>
                    Status
                </div>
                <div className=' text-xl font-bold'>COLOR </div>
                <div>RED: <div><input type="range" /></div></div>
                <div>GREEN: <div><input type="range" /></div></div>
                <div>BLUE: <div><input type="range" /></div></div>

                <br />
                <div className=' text-xl font-bold'>MESH </div>
                <div>
                    <div className='p-3'>Mesh-1 <input type="checkbox" /></div>
                    <div className='p-3'>Mesh-2 <input type="checkbox" /></div>
                    <div className='p-3'>Mesh-3 <input type="checkbox" /></div>

                </div>
           
            </div>
        </div>  
        <div className='felx m-5 w-75 '>
            <div>
                 <main>
                    <form onSubmit={onSubmit}>
                        <input type="file" name='file' onChange={(e)=> setfile(e.target.files?.[0])}  />
                        <input type="submit"value="Upload" className='font-bold cursor-pointer w-33 h-11 bg-green-600 flex justify-center items-center hover:bg-green-800 hover:text-slate-300 rounded-md '/>


                    </form>

                 </main>
            </div>

        </div>
    </div>

    
    </>)
}