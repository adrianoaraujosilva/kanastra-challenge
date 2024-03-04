import Moment from "moment";

export type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => <h1>{text}</h1>;

export type DateFormatProps = {
  date: string;
};

const DateFormat = ({ date }: DateFormatProps) => (
  <>{Moment(date).format("DD/MM/YYYY")}</>
);

export type CurrencyFormatProps = {
  value: string;
};

const CurrencyFormat = ({ value }: CurrencyFormatProps) => {
  const [valueFormatted, setValueFormatted] = useState("");
  return <>{value.toLocaleString("pt-br")}</>;
};
// <>{Number(value).toFixed(2)}</>
// const CurrencyFormat = ({ value }: CurrencyFormatProps) => (
//   <>
//     {value.toLocaleString("pt-br")}
//   </>
//   // <>{Number(value).toFixed(2)}</>
// );

export { Title, DateFormat, CurrencyFormat };
