import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormatoPregunta ,Pregunta } from "./../Interface/Ipregunta";

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private page:string[] = ["1","2","3"];

  constructor(private api:HttpClient) { }

  async getPreguntas(){
    const obs = this.api.get("https://api.quiz-contest.xyz/questions?limit=10&page="+ this.page[Math.floor(Math.random() * 3)] +"&category=sports%26leisure&format=multiple",{
      headers:{Authorization: "$2b$12$jTWfTxDwcgUiDK.V4JtQE.3/LT3KWU8n/v89RiGO60Ed/D3VB8j62"}
    }) as Observable<FormatoPregunta>
    return await new Promise<Pregunta[]>((resolve,reject) =>{
      obs.subscribe((data)=>{
        resolve(data.questions);
      });
    }
  );
  }
}
