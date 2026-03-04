import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { bio } = await request.json();

    if (!bio) {
      return NextResponse.json({ success: false, error: 'No bio content provided' }, { status: 400 });
    }

    // Store bio in a JSON file
    const filePath = path.join(process.cwd(), 'data', 'bio.json');
    const bioData = {
      content: bio,
      lastUpdated: new Date().toISOString()
    };

    await writeFile(filePath, JSON.stringify(bioData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating bio:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
