import { Component } from '@angular/core';
import { CartasService} from "./../../../modules/cartas.service";
import { httpCarta } from "./../../../Interface/getHttpCarta";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {

  private deck_id!:string;

  public imgActualCarta : string = "https://www.deckofcardsapi.com/static/img/back.png";
  public valorCartaActual !:string;

  public imgNuevaCarta : string = "https://www.deckofcardsapi.com/static/img/back.png";
  public valorNuevaCarta !:string;

  public puntos:number = 0;

  constructor(
    private srvCartas:CartasService,
    private api:HttpClient,
    private toast:ToastrService
  ){
    this.srvCartas.getCartasMayorMenor()
    .then(carta => {
      this.deck_id = carta.deck_id;
      console.log(this.deck_id +" constructor");
      this.getCarta().then(carta => {
        
        this.imgActualCarta = carta.cards[0].image;
        this.valorCartaActual = carta.cards[0].value;
      });
    });
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

  mayorMenorCarta(boton:string){
    console.log(this.deck_id + " "  +  this.imgActualCarta + " "+ this.valorCartaActual)
    this.getCarta().then(carta => {
      this.imgNuevaCarta = carta.cards[0].image;
      this.valorNuevaCarta = carta.cards[0].value;

      setTimeout(() => {
        this.imgActualCarta = this.imgNuevaCarta;
        this.valorCartaActual = this.valorNuevaCarta;

        this.imgNuevaCarta = "https://www.deckofcardsapi.com/static/img/back.png";
        this.valorNuevaCarta = "0";
      }, 1250);

      if(this.valorCartas(this.valorCartaActual) != this.valorCartas(this.valorNuevaCarta)){
        switch(boton){
          case "menor":
            console.log("entro menor");
            if(this.valorCartas(this.valorCartaActual) > this.valorCartas(this.valorNuevaCarta)){
              console.log(this.puntos + " true en menor");

              this.toast.success("Ganaste 1 Punto","Ganaste",{
                positionClass:"toast-center-center",timeOut:1500
              })

              this.puntos += 1 ;
            }else{
              console.log(this.puntos + " false en menor");

              this.toast.error("La carta era menor","Perdiste",{
                positionClass:"toast-center-center",timeOut:1500
              })
              
              this.puntos = 0;
            }
            break;
          case "mayor":
            console.log("entro mayor");
            if(this.valorCartas(this.valorCartaActual) < this.valorCartas(this.valorNuevaCarta)){
              console.log(this.puntos + " true en mayor");

              this.toast.success("Ganaste 1 Punto","Ganaste",{
                positionClass:"toast-center-center",timeOut:1500
              })

              this.puntos += 1;
            }else{

              this.toast.error("La carta era mayor","Perdiste",{
                positionClass:"toast-center-center",timeOut:1500
              })

              this.puntos = 0;
              console.log(this.puntos + " false en mayor");
            }
            break;
        }
      }else{
        this.puntos += 1;

        this.toast.success("Ganaste 1 Punto","Ganaste",{
          positionClass:"toast-center-center",timeOut:1500
        })

        //en caso de tener el mismo valor
      }
      console.log(this.puntos);
      console.log("valor actualizar "+ this.valorCartaActual + " valor nueva" + this.valorNuevaCarta);
    });
  }

  valorCartas(valor:string){
    let number = 0;
    switch(valor){
      case "KING":
        number = 13;
        break;
      case "QUEEN":
        number = 12;
        break;
      case "JACK":
        number = 11;
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

  ngOnInit(){

  }
  

}
