import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export type PaginateProps = {
  count: number;
};

function Paginate({ count }: Readonly<PaginateProps>): React.ReactElement {
  return (
    <Stack spacing={2}>
      <Pagination count={count} showFirstButton showLastButton />
    </Stack>
  );
}

export default Paginate;
