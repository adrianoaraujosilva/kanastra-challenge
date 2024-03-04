// import * as React from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// type PaginationProps = {
//   text: string;
// };

// function Pagination({ text }: PaginationProps): React.ReactElement {
//   return (
//     <Stack spacing={2}>
//       <Pagination count={10} />
//       <Pagination count={10} color="primary" />
//       <Pagination count={10} color="secondary" />
//       <Pagination count={10} disabled />
//     </Stack>
//   );
// }

// export default Pagination;

import * as React from "react";
import { Pagination as MuiPagination } from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Pagination(): React.ReactElement {
  return (
    <Stack spacing={2}>
      <MuiPagination count={10} />
      <MuiPagination count={10} color="primary" />
      <MuiPagination count={10} color="secondary" />
      <MuiPagination count={10} disabled />
    </Stack>
  );
}

export default Pagination;
