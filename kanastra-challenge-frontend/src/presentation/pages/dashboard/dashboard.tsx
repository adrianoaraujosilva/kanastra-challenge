import { DashboardProps } from "@/domain/protocols";
import { FileProvider } from "@/presentation/contexts";

function DashboardComponent(props: Readonly<DashboardProps>) {
  return (
    <FileProvider {...props}>
      <div className="flex flex-row justify-center items-center">
        <h1>Dashboard</h1>
      </div>
    </FileProvider>
  );
}

export default DashboardComponent;
