import IProjeto from "./IProjeto";

export default interface ITarefa {
  duracaoSegundos: number;
  descricao: 'string';
  projeto: IProjeto;
}
