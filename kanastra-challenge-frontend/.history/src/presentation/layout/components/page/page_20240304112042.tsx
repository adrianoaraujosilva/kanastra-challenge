import Moment from "moment";

export type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => <h1>{text}</h1>;

export type DateFormatProps = {
  date: string;
};

const DateFormat = ({ date }: DateFormatProps) =>
  `${Moment(date).format("DD/MM/YYYY")}`;

export type CurrencyFormatProps = {
  value: number;
};

const CurrencyFormat = ({ value }: CurrencyFormatProps) => {
  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return `${amount}`;
};

export { Title, DateFormat, CurrencyFormat };
