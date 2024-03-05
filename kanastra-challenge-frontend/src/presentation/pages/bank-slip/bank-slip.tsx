import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components";
import { useFileContext } from "@/presentation/contexts";
import Paginate from "@/presentation/layout/components/pagination/pagination";
import { CurrencyFormat, DateFormat } from "@/infra/utils";

function BankSlipComponent(): React.ReactElement {
  const { bankSlips, handleChangePage, page } = useFileContext();

  if (!Object.entries(bankSlips).length) return null;

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <h1>Boletos</h1>
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
              <TableRow key={bankSlip.debtId}>
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
        <Paginate
          count={bankSlips.meta.last_page}
          page={page}
          onChange={handleChangePage}
        ></Paginate>
      </div>
    </>
  );
}

export default BankSlipComponent;
