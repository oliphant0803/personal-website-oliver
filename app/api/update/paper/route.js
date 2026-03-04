import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Read current publications
    const filePath = path.join(process.cwd(), 'data', 'publications.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const publicationsData = JSON.parse(fileContent);
    
    // Generate new ID
    const maxId = Math.max(...publicationsData.publications.map(p => p.id), 0);
    const newId = maxId + 1;
    
    // Create new paper object
    const newPaper = {
      id: newId,
      title: data.title,
      titleShort: data.titleShort || '',
      venue: data.venue,
      authors: data.authors.split(',').map(a => a.trim()),
      links: data.links || {},
      teaserImage: data.teaserImage || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      selected: data.selected || 'yes'
    };
    
    // Add abstract to links if provided
    if (data.abstract) {
      newPaper.links.abs = data.abstract;
    }
    
    // Add to publications array at the beginning if selected for homepage
    if (data.selected === 'yes') {
      publicationsData.publications.unshift(newPaper); // Add to top
    } else {
      publicationsData.publications.push(newPaper); // Add to end
    }
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(publicationsData, null, 2));
    
    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    console.error('Error adding paper:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
