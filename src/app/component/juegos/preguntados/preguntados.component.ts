import { Component } from '@angular/core';
import { PreguntasService } from "./../../../modules/preguntas.service";
import { Pregunta } from "./../../../Interface/Ipregunta";
import { Router } from '@angular/router';
import { AuthService } from './../../../modules/auth.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  public arrayPreguntas!:Pregunta[];
  public contadorPreguntas:number = 0;

  public pregunta!:string;

  public opciones!:string[]

  public correcta!:string;
  public indexCorrecta!:number;
  public puntos:number = 0;

  public juegoFinalizado:boolean = false;

  constructor(
    private questions:PreguntasService,
    private router:Router,
    private auth:AuthService
  ){
    if(!auth.enSesion){
      router.navigate(["/home"]);
    }
  }

  ngOnInit(){
    this.getPreguntas();
  }

  configurarPregunta(){
    this.correcta = this.arrayPreguntas[this.contadorPreguntas].correctAnswers;
    this.pregunta = this.arrayPreguntas[this.contadorPreguntas].question;
    this.opciones = this.arrayPreguntas[this.contadorPreguntas].incorrectAnswers;

    this.opciones.push(this.correcta);
    this.opciones = this.sufflePreguntas(this.opciones);

    this.indexCorrecta = this.opciones.indexOf(this.correcta);

    this.contadorPreguntas += 1;
  }

  sufflePreguntas(array: string[]){
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }

  responderPregunta(respuesta:string){
    if(respuesta == this.correcta){
      this.btnCorrecta();
    
      this.puntos += 1;

    }else{
      this.btnCorrecta();
    }

    setTimeout(() => {
      this.btnDefault();
      this.configurarPregunta();
      if(this.contadorPreguntas == 9){
        this.juegoFinalizado = true;
        //ENVIAR REGISTRO
      }
    }, 1500);
  }

  btnCorrecta(){
    for(let i = 0;i < this.opciones.length;i++){
      const btn = document.getElementById("opcion"+i);
      if(this.indexCorrecta != i){
        btn?.classList.remove("btn-primary");
        btn?.classList.add("btn-danger");
      }else{ 
        btn?.classList.remove("btn-primary");
        btn?.classList.add("btn-success");
      }
    }
  }

  btnDefault(){
    for(let i = 0;i < this.opciones.length;i++){
      const btn = document.getElementById("opcion"+i);
      if(this.indexCorrecta != i){
        btn?.classList.remove("btn-danger");
        btn?.classList.add("btn-primary");
      }else{ 
        btn?.classList.remove("btn-success");
        btn?.classList.add("btn-primary");
      }
    }
  }

  getPreguntas(){
    this.contadorPreguntas=0;
    this.questions.getPreguntas().then(preguntas => {
      this.arrayPreguntas = preguntas;
      console.log(this.arrayPreguntas); 
      this.configurarPregunta();
    });
    this.puntos = 0;
    this.juegoFinalizado = false;
  }

}
