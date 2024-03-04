import { Outlet } from "react-router-dom";
import { AppBarTag } from "@/presentation/layout/components";

function BaseLayoutComponent() {
  return (
    // FDFFFE55
    // D0FFE055
    <main className="parent h-screen flex flex-col gap-8">
      <AppBarTag />

      <Outlet />
    </main>
  );
}

export default BaseLayoutComponent;
