import {Outlet} from "react-router-dom";
import {AppBarTag} from "@/presentation/layout/components";

function BaseLayoutComponent() {
  return (
    <main className="parent h-screen flex flex-col gap-8 bg-[#D0FFE055]">
      <AppBarTag/>

      <Outlet/>
    </main>
  );
}

export default BaseLayoutComponent;
