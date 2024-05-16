export interface FormatoPregunta{
    page:number,
    perPage:number,
    total:number,
    questions:Pregunta[]
}

export interface Pregunta{
    id:string,
    category:string,
    format:string,
    question:string,
    correctAnswers:string,
    incorrectAnswers:string[]
}