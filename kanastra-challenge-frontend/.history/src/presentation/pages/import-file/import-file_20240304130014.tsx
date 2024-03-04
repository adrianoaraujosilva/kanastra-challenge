import { BankSlipProps } from "@/domain/protocols";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components";
import { BankSlipProvider } from "@/presentation/contexts";
import {
  CurrencyFormat,
  DateFormat,
  Title,
} from "@/presentation/layout/components";
import Paginate from "@/presentation/layout/components/pagination/pagination";
import { ReactElement } from "react";

function ImportFileComponent(props: BankSlipProps): ReactElement {
  const bankSlips = {
    success: true,
    data: [
      {
        id: 330628,
        name: "Gary Harris MD",
        governmentId: 2681,
        email: "christophersmith@example.com",
        debtAmount: "2496.0000",
        debtDueDate: "2023-07-31",
        debtId: "9f4f064c-abec-4285-abef-ade93c9ea76e",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330629,
        name: "Bryan Wilcox",
        governmentId: 6002,
        email: "christopherhoover@example.net",
        debtAmount: "4712.0000",
        debtDueDate: "2024-04-28",
        debtId: "45922eaf-91a9-4539-91de-68f60b9565c8",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330630,
        name: "Brianna Gonzalez",
        governmentId: 6342,
        email: "dylansanchez@example.com",
        debtAmount: "4045.0000",
        debtDueDate: "2024-05-05",
        debtId: "c23ebfc6-2b96-4444-ac00-ae0f39a35d0d",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330631,
        name: "Charles Woodard",
        governmentId: 2764,
        email: "qevans@example.org",
        debtAmount: "1186.0000",
        debtDueDate: "2024-09-07",
        debtId: "9c4e7a6c-cf50-4530-a44b-4cee4f4a4ec0",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330632,
        name: "Lawrence Wallace",
        governmentId: 9158,
        email: "joel66@example.net",
        debtAmount: "9189.0000",
        debtDueDate: "2023-08-21",
        debtId: "f1eb5e1a-41d6-4713-b685-c72dfeafef60",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330633,
        name: "Jessica Cook",
        governmentId: 6298,
        email: "bakeredward@example.com",
        debtAmount: "7453.0000",
        debtDueDate: "2024-07-13",
        debtId: "2578bdd3-9abc-4c01-951f-af2196e87094",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330634,
        name: "Michael Peters",
        governmentId: 5255,
        email: "matthewgriffin@example.net",
        debtAmount: "6222.0000",
        debtDueDate: "2024-08-01",
        debtId: "e24fb2b0-e2e9-41ed-ab5b-8d66b582d2e9",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330635,
        name: "Anna Smith",
        governmentId: 6331,
        email: "craigmichael@example.com",
        debtAmount: "3230.0000",
        debtDueDate: "2023-03-15",
        debtId: "27c47a98-e241-4f50-a54f-b971df0c2d30",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330636,
        name: "Allison Sanchez",
        governmentId: 5936,
        email: "jennifer43@example.org",
        debtAmount: "5717.0000",
        debtDueDate: "2023-11-15",
        debtId: "a8020f38-23e0-41b0-9e30-8f7fbb283d11",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
      {
        id: 330637,
        name: "Mark Thompson",
        governmentId: 2114,
        email: "teresa50@example.com",
        debtAmount: "3078.0000",
        debtDueDate: "2023-11-22",
        debtId: "6780bb9a-e939-4920-b862-4c7e39e4b19d",
        bank_slip_status: "Enviado",
        is_paid: false,
        created_at: "2024-03-02T23:43:00.000000Z",
        updated_at: "2024-03-02T23:43:00.000000Z",
      },
    ],
    meta: {
      current_page: 1,
      total_page: 1100000,
    },
    message: "",
  };

  const weights = [...Array(101).keys()].map((i) => ({
    label: `${i + 40} Kg`,
    value: `${i + 40}`,
  }));

  return (
    <BankSlipProvider {...props}>
      <div className="flex flex-row justify-center items-center">
        <Title text="Boletos" />
      </div>
      <div className="flex flex-row justify-center items-center p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Debt Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Government Id</TableHead>
              <TableHead>Debt Amount</TableHead>
              <TableHead>Debt Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bankSlips.data.map((bankSlip) => (
              <TableRow key={bankSlip.id}>
                <TableCell>{bankSlip.debtId}</TableCell>
                <TableCell>{bankSlip.name}</TableCell>
                <TableCell>{bankSlip.governmentId}</TableCell>
                <TableCell>
                  <CurrencyFormat value={bankSlip.debtAmount} />
                </TableCell>
                <TableCell>
                  <DateFormat date={bankSlip.debtDueDate} />
                </TableCell>
                <TableCell>{bankSlip.bank_slip_status}</TableCell>
                <TableCell>{bankSlip.is_paid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-center items-center p-5">
        <Paginate count={bankSlips.meta.total_page}></Paginate>
      </div>
    </BankSlipProvider>
  );
}

export default ImportFileComponent;
