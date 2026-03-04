import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { paperId, links } = await request.json();
    
    // Read current publications
    const filePath = path.join(process.cwd(), 'data', 'publications.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const publicationsData = JSON.parse(fileContent);
    
    // Find the paper
    const paperIndex = publicationsData.publications.findIndex(p => p.id === parseInt(paperId));
    
    if (paperIndex === -1) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 });
    }
    
    // Update links (only update non-empty values)
    if (!publicationsData.publications[paperIndex].links) {
      publicationsData.publications[paperIndex].links = {};
    }
    
    if (links.arxiv) {
      publicationsData.publications[paperIndex].links.arxiv = links.arxiv;
    }
    if (links.demo) {
      publicationsData.publications[paperIndex].links.demo = links.demo;
    }
    if (links.poster) {
      publicationsData.publications[paperIndex].links.poster = links.poster;
    }
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(publicationsData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating paper links:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
