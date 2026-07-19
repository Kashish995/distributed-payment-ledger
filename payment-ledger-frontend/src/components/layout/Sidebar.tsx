import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  History,
  HeartPulse,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: Users,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Health",
    path: "/health",
    icon: HeartPulse,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Payment Ledger
        </h1>
      </div>

      <nav className="px-4 space-y-2">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={20} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;