import Moment from "moment/moment";

type DateFormatProps = {
  date: string;
};

type CurrencyFormatProps = {
  value: string;
};

const DateFormat = ({ date }: DateFormatProps): string =>
  `${Moment(date).format("DD/MM/YYYY")}`;

const CurrencyFormat = ({ value }: CurrencyFormatProps): string => {
  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(value));

  return `${amount}`;
};

export { DateFormat, CurrencyFormat };
