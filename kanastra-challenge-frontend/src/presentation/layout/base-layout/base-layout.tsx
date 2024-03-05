import { Outlet } from "react-router-dom";
import { AppBarTag } from "@/presentation/layout/components";

function BaseLayoutComponent() {
  return (
    <main className="parent h-screen flex flex-col gap-8">
      <AppBarTag />

      <Outlet />
    </main>
  );
}

export default BaseLayoutComponent;
