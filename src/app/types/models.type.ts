export type Item = {
  title: string;
  description: string;
  quantity: number;
  price: number;
  class: string;
}

export type historicoCompra = {
  nome: string,
  dataCompra: string,
  produto: string,
  valor: number
}

export type historicoSuporte = {
  nome: string,
  dataSuporte: string,
  personagem: string,
  status: string
}