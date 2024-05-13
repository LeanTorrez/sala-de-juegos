
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faArrowRotateForward } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './../../../modules/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  public reinicio = faArrowRotateForward;
  public caracter:string = "";

  public contadorExitos:number = 0;
  public contadorErrores:number = 0;
  public errores:string = "0";

  public palabras= ["ARBOL","BICICLETA","AVION","SILLA"];
  public palabraSelec!:string;

  public alfabeto = ["A","B","C","D","E","F","G","H","I",
                     "J","K","L","M","N","O","P","R",
                     "S","T","U","V","W","X","Y","Z"];
      
  constructor(
    private authFire:AuthService,
    private router:Router
  ){
    /* if(!authFire.enSesion){
      router.navigate(["/home"]);
    } */
  }

  letraAhorcado(letra:string){
    this.caracter = letra;
    console.log(this.caracter);

    if(this.palabraSelec.includes(this.caracter)){
      if(this.contadorExitos == this.palabraSelec.length)
        return console.log("GANASTE");
      if(this.contadorErrores >= 6) 
        return false;

      const letra = document.getElementById("letra"+this.caracter);

      let index = this.indexLetras();

      this.contadorExitos += index.length;
      
      this.asignarLetrasSpan(index)
      letra?.setAttribute("disabled","");
      letra?.classList.remove("btn-primary");
      letra?.classList.add("btn-success");

      if(this.contadorExitos == this.palabraSelec.length)
        return console.log("GANASTE");

      console.log("Esta en la palabra");
    }else{
      if(this.contadorExitos == this.palabraSelec.length)
        return console.log("GANASTE");
      if(this.contadorErrores >= 6) 
        return false;

      this.contadorErrores++;

      
      this.errores = this.contadorErrores.toString();
      const letra = document.getElementById("letra"+this.caracter);
      letra?.setAttribute("disabled","");
      letra?.classList.remove("btn-primary");
      letra?.classList.add("btn-danger");

      if(this.contadorErrores >= 6) 
        return console.error("Sos boleta");
        
      console.log("No esta en la palabra");
    }
  }

  ngOnInit(){
    this.palabraSelec = this.palabras[1];
  }

  indexLetras(){
    let indices:number[] = [];
    for(let i = 0;i < this.palabraSelec.length; i++){
      if(this.palabraSelec[i]==this.caracter) indices.push(i);
    }
    return indices;
  }

  asignarLetrasSpan(index:number[]){
    index.forEach(e => {
      const span = document.getElementById("caracter" + e);
      if(span != null){
        span.innerText = this.caracter;
        span.classList.remove("span-ahorcado");
        span.classList.add("span-exito");
      }
    });
  }

  reiniciarAhorcado(){
    for(let i = 0;i < this.palabraSelec.length;i++){
      const span = document.getElementById("caracter" + i);
      if(span != null){
        span.innerText = "___";
        span.classList.remove("span-exito");
        span.classList.add("span-ahorcado");
      }
    }
    this.alfabeto.forEach(c=>{
      const letra = document.getElementById("letra"+c);
      letra?.removeAttribute("disabled");
      letra?.classList.remove("btn-success");
      letra?.classList.remove("btn-danger");
      letra?.classList.add("btn-primary");
    })
    this.errores = "0";
    this.contadorErrores = 0;
    this.contadorExitos = 0;
  }

}
