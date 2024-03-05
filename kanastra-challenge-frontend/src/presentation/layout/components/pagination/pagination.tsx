import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export type PaginateProps = {
  count: number;
  page: number;
};

function Paginate({
  count,
  page,
  ...props
}: Readonly<PaginateProps>): React.ReactElement {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={page}
        siblingCount={1}
        showFirstButton
        showLastButton
        {...props}
      />
    </Stack>
  );
}

export default Paginate;
