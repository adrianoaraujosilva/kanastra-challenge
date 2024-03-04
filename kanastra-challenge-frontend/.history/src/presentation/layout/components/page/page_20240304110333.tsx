import Moment from "moment";

// export type TitleProps = {
//   text: string;
// };

// const Title = ({ text }: TitleProps) => <h1>{text}</h1>;
const Title = (text: string) => <h1>{text}</h1>;

const DateFormat = (date: string) => {
  Moment.locale("pt-BR");

  return <>{Moment(date).format("d/m/Y")}</>;
};

export { Title, DateFormat };
