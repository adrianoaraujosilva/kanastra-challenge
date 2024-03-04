// import * as React from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export type PaginateProps = {
  count: number;
};

function Paginate({ count }: PaginateProps): React.ReactElement {
  return (
    <Stack spacing={2}>
      <Pagination count={count} />
    </Stack>
  );
}

export default Paginate;
