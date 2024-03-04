type PaginationProps = {
  text: string;
};

function Pagination({ text }: PaginationProps) {
  console.log(text);
  return <div>{text}</div>;
}

export default Pagination;
