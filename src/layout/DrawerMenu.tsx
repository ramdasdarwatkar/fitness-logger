import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/auth.store";

interface Props {
  mobileOnly?: boolean;
}

export const DrawerMenu = ({ mobileOnly }: Props) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogout = () => {
    setAuth(null, null);
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
        bg-surface
        h-full
        w-64
        flex flex-col
        ${mobileOnly ? "w-full" : ""}
      `}
    >
      {/* Title */}
      <div className="h-12 flex items-center px-4 font-semibold">
        Fitness Logger
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-1">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate("/exercises")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10"
        >
          <span className="text-lg">📋</span>
          <span>Exercises</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 mt-2 rounded-lg text-red-400 hover:bg-white/10"
        >
          <span className="text-lg">→</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
