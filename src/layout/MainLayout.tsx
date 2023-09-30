import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

import Header from '@components/Header';
import Nav from '@common/Nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const route = router.pathname.substring(1);

  const withoutMainLayout = ['login'];

  return (
    <>
      <div className="min-h-full">
        {!withoutMainLayout.includes(route) && (
          <>
            <Header />
            <Nav />
          </>
        )}

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
