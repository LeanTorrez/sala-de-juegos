import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CartasService} from "./../../../modules/cartas.service";
import { Carta,httpCarta } from "./../../../Interface/getHttpCarta";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../../modules/auth.service';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent {

  public deck_id!:string;

  public cartasCrupier:Carta[] = new Array<Carta>;
  public cartasJugador:Carta[] = new Array<Carta>;

  public puntosCrupier:number = 0;
  public puntosJugador:number = 0;

  public mostrarCartas:boolean = false;

  public partidaTerminada:boolean = false;
  public mensajePartida:string = "Tu puntaje es mayor que el Crupier";
  public mensajeTitulo:string = "";

  constructor(
    private srvCartas:CartasService,
    private api:HttpClient,
    private toast:ToastrService,
    private authFire:AuthService,
    private router:Router)
  {
    console.log(authFire.enSesion);
    if(!authFire.enSesion){
      router.navigate(["/home"]);
    }else{
      this.comenzarBlackjack();
    }
  }

  comenzarBlackjack(){
    this.partidaTerminada = false;
    this.puntosCrupier = 0;
    this.puntosJugador = 0;
    this.mostrarCartas = false;
    this.cartasCrupier.length = 0;
    this.cartasJugador.length = 0;

    this.srvCartas.getCartasBlackJack()
    .then(carta => {
      this.deck_id = carta.deck_id;
      console.log(this.deck_id +" constructor");

      this.getComienzoBlackJack().then(carta => {

        this.cartasJugador.push(carta.cards[0]);
        this.cartasCrupier.push(carta.cards[1]);
        this.cartasJugador.push(carta.cards[2]);
        this.cartasCrupier.push(carta.cards[3]);

        this.puntosJugador = this.calcularPuntos(this.cartasJugador,"jugador");
        this.puntosCrupier = this.calcularPuntos(this.cartasCrupier,"crupier");

        console.log(this.cartasCrupier);
      });

    });
  }

  async getComienzoBlackJack(){
    console.log(this.deck_id+ " get primera carta");
    const obs = this.api.get("https://www.deckofcardsapi.com/api/deck/"+ this.deck_id +"/draw/?count=4") as Observable<httpCarta>;
    return await new Promise<httpCarta>((resolve,reject) =>{
      obs.subscribe((carta => {
        resolve(carta);
      }))
    })
  }

  async getCarta(){
    console.log(this.deck_id+ " get primera carta");
    const obs = this.api.get("https://www.deckofcardsapi.com/api/deck/"+ this.deck_id +"/draw/?count=1") as Observable<httpCarta>;

    return await new Promise<httpCarta>((resolve,reject) =>{
      obs.subscribe((carta => {
        resolve(carta);
      }))
    })
  }

  valorCartas(valor:string){
    let number = 0;
    switch(valor){
      case "KING":
        number = 10;
        break;
      case "QUEEN":
        number = 10;
        break;
      case "JACK":
        number = 10;
        break;
      case "ACE":
        number = 1;
        break;
      default:
        number = parseInt(valor); 
        break;
    }
    return number;
  }

  calcularPuntos(array:Carta[],jugador:string){
    let contador = 0;
    for(let i = 0;i < array.length;i++){
      if(!this.mostrarCartas && jugador=="crupier" && i == 1) continue
        
      contador += this.valorCartas(array[i].value);
     
    }
    return contador;
  }

  hit(){
    this.getCarta()
    .then(carta => {
      this.cartasJugador.push(carta.cards[0]);
      this.puntosJugador = this.calcularPuntos(this.cartasJugador,"");
      if(this.puntosJugador > 21){  
        this.stand();
      }else if(this.puntosJugador == 21){
        this.stand();
      }
    });
  }

  async stand(){
    this.mostrarCartas = true;

    this.puntosCrupier = this.calcularPuntos(this.cartasCrupier,"");

    while(this.puntosCrupier < 17 && this.puntosJugador < 22){

      await this.getCarta()
      .then(carta => {
        
        this.cartasCrupier.push(carta.cards[0]);
        this.puntosCrupier = this.calcularPuntos(this.cartasCrupier,"");
  
      })

      if(this.puntosCrupier > 16) break;
    }
    
    if(this.puntosJugador > 21){
      //PERDISTE
      this.conclusionPartida("Superaste el puntaje 21","PERDISTE","error");
      
    }else if(this.puntosJugador != this.puntosCrupier){

      if( this.puntosJugador > this.puntosCrupier || this.puntosCrupier > 21){
        this.conclusionPartida("Tu puntaje es mayor que el Crupier","GANASTE"," ");
        //GANASTE con o sin blackjack
        //REGISTRO
      }else{
        this.conclusionPartida("Tu puntaje es menor que el Crupier","PERDISTE","error");
        //PERDISTE
      }
    }else{
      //EMPATE
      this.conclusionPartida("Tienes los mismo puntos que el crupier","EMPATE"," ");
    }

  }

  conclusionPartida(mensaje:string,titulo:string,tipoMensaje:string){
    if(tipoMensaje=="error"){
      this.toast.error(mensaje,titulo,{
        positionClass:"toast-top-center",timeOut:1500
      });
    }else{
      this.toast.success(mensaje,titulo,{
        positionClass:"toast-top-center",timeOut:1500
      });
    }
    this.partidaTerminada = true;
    this.mensajePartida = mensaje;
    this.mensajeTitulo = titulo;
  }

}
