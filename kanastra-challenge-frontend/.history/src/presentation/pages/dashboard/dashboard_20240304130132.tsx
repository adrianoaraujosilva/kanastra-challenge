import { DashboardProps } from "@/domain/protocols";
import { FileProvider } from "@/presentation/contexts";
import { Title } from "@/presentation/layout/components";

function DashboardComponent(props: Readonly<DashboardProps>) {
  return (
    <FileProvider {...props}>
      <div className="flex flex-row justify-center items-center">
        <Title text="Dashboard" />
      </div>
    </FileProvider>
  );
}

export default DashboardComponent;
