import { Injectable } from '@angular/core';
import { collection, getDocs, Firestore, addDoc, collectionData} from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { Mensaje } from "./../Interface/Imensaje";

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  public chats$ : Observable<Mensaje[]>;
  
  constructor(
    private fireStore: Firestore,
    private fStore : AngularFirestore
    ) { 
      this.chats$ = fStore.collection("chat").valueChanges() as Observable<Mensaje[]>
    }

  addLogins(email:string){

    


    let col = collection(this.fireStore,"logins");
    addDoc(col, {"usuario": email, "fecha-ingreso" : new Date})
    .then(()=> console.log("Log agregado exitosamente"))
    .catch(e=>console.error(e));
  }

  addChat(msj:string, usuario:any ){
    let col = collection(this.fireStore,"chat");
    addDoc(col, {"mensaje":msj,"usuario":usuario,"fecha":new Date})
    .then(()=> console.log("Chat agregado exitosamente"))
    .catch(e=>console.error(e));
  }

  getObsChat(){
    return this.chats$;
  }

  getPuntuacionUsuario(uid:string){
    
  }


}
