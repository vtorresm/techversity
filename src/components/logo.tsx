import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <GraduationCap className="h-8 w-8 text-primary" />
      <span className="text-2xl font-headline font-bold text-primary">Techversity</span>
    </Link>
  );
}