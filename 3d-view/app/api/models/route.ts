import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';


export async function GET(){

    
    const fliepath = path.join(process.cwd(), 'public', 'models', 'meta.glb')
    const fileBuffer = fs.readFileSync(fliepath)
    console.log("file sent !!!!")
    return new NextResponse(fileBuffer,{
        headers:{
            'Content-Type':'models/gltf-binary'
        }
    })
}