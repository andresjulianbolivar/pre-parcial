"use client";
import { useAutores } from "./AutoresContext";

export default function Lista(){
    const {autores, actualizarAutores} = useAutores();

    const listItems = autores.map(autor =>
        <li key={autor.name}>{autor.name}</li>
    );

    return <ol>{listItems}</ol>;
}