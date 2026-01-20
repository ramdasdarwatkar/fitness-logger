import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DrawerMenu } from "./DrawerMenu";
import { useAuthStore } from "../auth/auth.store";
import { Suspense } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isHome = location.pathname === "/";

  // 🔑 AUTO-CLOSE MOBILE DRAWER ON ROUTE CHANGE
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setAuth(null, null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* MOBILE TOP BAR */}
      <header className="md:hidden h-12 flex items-center px-4 bg-surface">
        {/* LEFT: Back or Drawer */}
        {!isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded hover:bg-white/10"
          >
            ←
          </button>
        ) : (
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded hover:bg-white/10"
          >
            ☰
          </button>
        )}

        <div className="flex-1" />

        {/* RIGHT: Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded hover:bg-white/10"
        >
          →
        </button>
      </header>

      <div className="flex">
        {/* DESKTOP DRAWER */}
        <aside className="hidden md:block">
          <DrawerMenu />
        </aside>

        {/* MOBILE DRAWER */}
        {mobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="w-64 bg-surface h-full">
              <DrawerMenu mobileOnly />
            </div>
            <div
              className="flex-1 bg-black/60"
              onClick={() => setMobileDrawerOpen(false)}
            />
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-hidden">
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center text-gray-500">
                Loading…
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
