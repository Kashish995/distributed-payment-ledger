import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold text-slate-800">
        Distributed Payment Ledger
      </h2>

      <div className="flex items-center gap-5">
        <Bell className="text-slate-500 cursor-pointer" size={22} />
        <UserCircle className="text-slate-600 cursor-pointer" size={30} />
      </div>
    </header>
  );
}

export default Navbar;