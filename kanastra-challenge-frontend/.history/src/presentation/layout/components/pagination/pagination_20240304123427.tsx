import * as React from "react";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

// export type PaginateProps = {
//   count: number;
// };

// function Paginate({ count }: PaginateProps): React.ReactElement {
//   return (
//     <Stack spacing={2}>
//       <Pagination count={count} showFirstButton showLastButton />
//     </Stack>
//   );
// }

function Content() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  return (
    <Pagination
      page={page}
      count={10}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

function Paginate(): React.ReactElement {
  return (
    <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
      <Routes>
        <Route path="*" element={<Content />} />
      </Routes>
    </MemoryRouter>
  );
}

export default Paginate;
