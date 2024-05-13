import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaHttp, httpCarta } from "./../Interface/getHttpCarta";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  public datoDeck:CartaHttp = new CartaHttp;
  public datoCarta:httpCarta = new httpCarta;

  constructor(private api:HttpClient) { }

  async getCartasMayorMenor(){
    const obs = this.api.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=3") as Observable<CartaHttp>;
    return await new Promise<CartaHttp>((resolve, reject) => {
      obs.subscribe((data: CartaHttp) => {
        resolve(data);
      });
    });
  } 

  async getCartasBlackJack(){
    const obs = this.api.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6") as Observable<CartaHttp>;;
    return await new Promise<CartaHttp>((resolve, reject) => {
      obs.subscribe((data: CartaHttp) => {
        resolve(data);
      });
    });
  }

}
