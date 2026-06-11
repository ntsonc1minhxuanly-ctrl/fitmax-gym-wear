import { readFileSync } from 'fs';
import { join } from 'path';
import LandingPage from '@/components/LandingPage';

export const dynamic = 'force-dynamic';

async function getContent() {
  const filePath = join(process.cwd(), 'data', 'content.json');
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default async function Home() {
  const content = await getContent();
  return <LandingPage content={content} />;
}
