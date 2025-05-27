'use client'
// app/_components/_pages/TaxGuide.tsx

import dynamic from 'next/dynamic';

const TaxGuideClient = dynamic(() => import('../TaxGuideClient'), { ssr: false });

export default function TaxGuide() {
  return <TaxGuideClient />;
}
