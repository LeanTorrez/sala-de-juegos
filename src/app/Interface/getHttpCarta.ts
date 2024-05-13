export class Carta{
    code!:string;
    image!:string;
    images!:string[];
    value!:string;
    suit!:string;

    constructor(){
        this.code = "";
        this.image = "";
        this.images = [];
        this.value = ""
        this.suit = "";
    }
}


export class httpCarta{
    success: boolean;
    deck_id: string;
    cards: Carta[];
    remaining: number;

    constructor(){
        this.success = false;
        this.deck_id = "";
        this.cards = new Array<Carta>;
        this.remaining = 0;
    }
}



export class CartaHttp{
    deck_id:string;
    remaining:number;
    shuffled:boolean;
    success:boolean;

    constructor(){
        this.deck_id = "";
        this.remaining = 0;
        this.shuffled = false;
        this.success = false;
    }
}