export class Libro{
    _id?: number;
    nombre: string;
    categoria: string;
    autor: string;
    precio: number;

    constructor (nombre: string, categoria: string, autor: string, precio: number ){
        this.nombre = nombre;
        this.categoria = categoria;
        this.autor = autor;      
        this.precio = precio;
    }
}