import { Injectable } from '@angular/core';
import { Item } from '../types/itens.type';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() { }

  carrinho: Item[] = []

  addCart(item: Item): void {
    const itemIndex = this.carrinho.findIndex(cartItem =>
      cartItem.title === item.title
    )
    if (itemIndex > -1) {
      console.log('Ja tem um item no carrinho.')

    } else {
      this.carrinho.push({ ...item });

    }
    console.log('item adicionado no service.', this.carrinho)
  }

  getCarrinho() {
    return this.carrinho.length
  }

}