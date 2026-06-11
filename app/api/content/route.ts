import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const contentPath = join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = readFileSync(contentPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Không thể đọc dữ liệu' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    writeFileSync(contentPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Không thể lưu dữ liệu' }, { status: 500 });
  }
}
