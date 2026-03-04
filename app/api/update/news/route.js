import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Read current updates
    const filePath = path.join(process.cwd(), 'data', 'updates.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const updatesArray = JSON.parse(fileContent);
    
    // Generate new ID
    const maxId = Math.max(...updatesArray.map(u => u.id), 0);
    const newId = maxId + 1;
    
    // Create new update object matching the updates.json structure
    const newUpdate = {
      id: newId,
      date: data.date,
      title: data.title,
      content: data.content,
      hasPaper: data.hasPaper || false,
      finalContent: data.finalContent
    };

    // Add first paper/link if exists
    if (data.hasPaper && data.paperTitle) {
      newUpdate.paperTitle = data.paperTitle;
      newUpdate.paperLink = data.paperLink;
      newUpdate.contentAfter = data.contentAfter || '';
    }

    // Add second paper/link if exists
    if (data.hasSecondPaper && data.secondPaperTitle) {
      newUpdate.hasSecondPaper = true;
      newUpdate.secondPaperTitle = data.secondPaperTitle;
      newUpdate.secondPaperLink = data.secondPaperLink;
      newUpdate.contentAfterSecond = data.contentAfterSecond || '';
    }

    // Add third paper/link if exists
    if (data.hasThirdPaper && data.thirdPaperTitle) {
      newUpdate.hasThirdPaper = true;
      newUpdate.thirdPaperTitle = data.thirdPaperTitle;
      newUpdate.thirdPaperLink = data.thirdPaperLink;
    }
    
    // Add to updates array (at beginning for most recent)
    updatesArray.unshift(newUpdate);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(updatesArray, null, 2));
    
    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    console.error('Error adding news:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
