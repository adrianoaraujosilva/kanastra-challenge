import { DashboardProps } from "@/domain/protocols";
import { FileProvider } from "@/presentation/contexts";

function DashboardComponent(props: Readonly<DashboardProps>) {
  return (
    <FileProvider {...props}>
      <h1>Dashboard</h1>
    </FileProvider>
  );
}

export default DashboardComponent;
