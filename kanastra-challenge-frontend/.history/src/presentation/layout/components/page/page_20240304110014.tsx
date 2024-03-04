import Moment from "moment";

const Title = (text: string) => <h1>{text}</h1>;

const DateFormat = (date: string) => {
  Moment.locale("pt-BR");

  return <>{Moment(date).format("d/m/Y")}</>;
};

export { Title, DateFormat };
