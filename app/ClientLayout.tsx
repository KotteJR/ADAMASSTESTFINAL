// app/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { HeaderMegaMenu } from './LandingPage/components/HeaderMegaMenu';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith('/chatbotpage');

  return (
    <>
      {!hideHeader && <HeaderMegaMenu />}
      <main>{children}</main>
    </>
  );
}
