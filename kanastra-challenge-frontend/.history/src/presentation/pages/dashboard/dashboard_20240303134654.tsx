import { DashboardProps } from "@/domain/protocols";
import { FileProvider } from "@/presentation/contexts";

function DashboardComponent(props: DashboardProps) {
  return (
    <FileProvider {...props}>
      <h1>Dashboard1</h1>
    </FileProvider>
  );
}

export default DashboardComponent;
