import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    if (!filename) {
      return NextResponse.json({ success: false, error: 'No filename provided' }, { status: 400 });
    }

    // Get file extension
    const originalFilename = file.name;
    const extension = originalFilename.split('.').pop();

    // Create the directory path
    const staticDir = path.join(process.cwd(), 'static', 'paper_image');
    
    // Ensure directory exists
    if (!existsSync(staticDir)) {
      await mkdir(staticDir, { recursive: true });
    }

    // Create the full filename with extension
    const fullFilename = `${filename}.${extension}`;
    const filePath = path.join(staticDir, fullFilename);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the file
    await writeFile(filePath, buffer);

    // Return the path for the database
    const publicPath = `/static/paper_image/${fullFilename}`;

    return NextResponse.json({ 
      success: true, 
      path: publicPath,
      filename: fullFilename 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
