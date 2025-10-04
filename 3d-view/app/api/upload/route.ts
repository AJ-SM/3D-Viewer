import { writeFile } from "fs/promises";
import {join} from 'path'
import { NextRequest,NextResponse } from "next/server";



export async function POST(request:NextRequest){
    const data = await request.formData()
    const file:File | null = data.get('file') as unknown as File

    if (!file){
        return NextResponse.json({success:false})

    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const path = join('D:/CLEAN_CODE/Projects/3D-Product-Viewer/tmp','meta.png');
    await writeFile(path,buffer)
    console.log(`Your file is saved at ${path}`)

    return NextResponse.json({success:true})


}