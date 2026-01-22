'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import UpdatesSidebar from './UpdatesSidebar';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isTravelsPage = pathname === '/travels';

  if (isTravelsPage) {
    return (
      <div className="layout-wrapper-full">
        {children}
      </div>
    );
  }

  return (
    <div className="layout-wrapper">
      <div className="grid-container">
        {/* Left Sidebar Column (3/12) */}
        <div className="col-sidebar-left">
          <Sidebar />
        </div>

        {/* Main Content Column (6/12) */}
        <main className="col-main">
          <div className="main-content">
            {children}
          </div>
        </main>

        {/* Right Sidebar Column (3/12) */}
        <div className="col-sidebar-right">
          <UpdatesSidebar />
        </div>
      </div>
    </div>
  );
}
