"use client"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';




export default function Scene(){
    const [file,setfile] = useState<File>()

    const  onSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if (!file){return}
            
            const data = new FormData()
            data.set('file', file )
            const res = await fetch('api/upload', {
                method:'POST',
                body:data
            })

            if(!res){
                console.log("NIGGA SOME THING BAD HAPPENED")
            }
            
        }

    const ThreeScene:React.FC = ()=>{
        const cret = useRef<HTMLElement>(null)

        

        if(typeof window !== 'undefined'){

            useEffect(()=>{
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth/1.3,window.innerHeight/1.3);
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