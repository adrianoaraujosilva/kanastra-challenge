import { BankSlipProps } from "@/domain/protocols";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/presentation/components";
import { BankSlipProvider, useBankSlipsContext } from "@/presentation/contexts";
import { DateFormat, Title } from "@/presentation/layout/components";
import { ReactElement } from "react";

function BankSlipComponent(props: BankSlipProps): ReactElement {
  // // const useBankSlips = useBankSlipsContext();
  // const { loadBankSlips } = useBankSlipsContext();

  // console.log("useBankSlips:", loadBankSlips);

  const bankSlips = {
    success: true,
    data: [
      {
        id: 11,
        name: "Jessica James",
        governmentId: 1525,
        email: "lisa11@example.net",
        debtAmount: "5829.0000",
        debtDueDate: "2024-01-18",
        debtId: "e2dba21b-5520-4226-82b5-90c6bb3356c6",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:45:04.000000Z",
      },
      {
        id: 17,
        name: "Deanna Williams",
        governmentId: 9954,
        email: "rschmidt@example.net",
        debtAmount: "9619.0000",
        debtDueDate: "2023-11-24",
        debtId: "04b3b8fd-fc5a-42dc-bf37-1719da4ade38",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:45:05.000000Z",
      },
    ],
    links: [
      {
        url: null,
        label: "&laquo; Anterior",
        active: false,
      },
      {
        url: "http://localhost:8000/api/boletos?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://localhost:8000/api/boletos?page=2",
        label: "Próximo &raquo;",
        active: false,
      },
    ],
    meta: {
      current_page: 1,
      total_page: 1100000,
    },
    message: "",
  };

  return (
    <BankSlipProvider {...props}>
      <div className="flex flex-row justify-center items-center">
        <Title text="Boletos" />
      </div>
      <div className="flex flex-row justify-center items-center p-5">
        <Table>
          <TableHeader className="bg-[#14392A] text-white">
            <TableCell>Debt Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Government Id</TableCell>
            <TableCell>Debt Amount</TableCell>
            <TableCell>Debt Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Paid</TableCell>
          </TableHeader>
          <TableBody>
            {bankSlips.data.map((bankSlip) => (
              <TableRow key={bankSlip.id}>
                <TableCell>{bankSlip.debtId}</TableCell>
                <TableCell>{bankSlip.name}</TableCell>
                <TableCell>{bankSlip.governmentId}</TableCell>
                <TableCell>{bankSlip.debtAmount}</TableCell>
                <TableCell>
                  <DateFormat>{bankSlip.debtDueDate}</DateFormat>
                </TableCell>
                <TableCell>{bankSlip.bank_slip_status}</TableCell>
                <TableCell>{bankSlip.is_paid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BankSlipProvider>
  );
}

export default BankSlipComponent;
