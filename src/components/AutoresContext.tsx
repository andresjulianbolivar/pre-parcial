"use client";
import { createContext, useState, useEffect, useContext } from "react";

interface Autor {
    birthDate: string;
    description: string;
    image: string;
    name: string;
    id: number;
}

const AutoresContext = createContext<{ autores: Autor[], actualizarAutores: (nuevos: Autor[]) => void } | null>(null);
export function AutoresProvider({ children }: { children: React.ReactNode }) {
    
    const api = "http://127.0.0.1:8080/api/authors";

    const [autores, setAutores] = useState<Autor[]>([]);

    useEffect(() => {
        fetch(api)
        .then(response => response.json())
        .then(data => data.map((user) => ({
            birthDate: user.birthDate,
            description: user.description,
            image: user.image,
            name: user.name,
            id: user.id
        })))
        .then(data => setAutores(data))
        .catch(error => console.error("Error fetching data:", error))
    }, [api]
    )

    const actualizarAutores = (nuevos: Autor[]) => setAutores(nuevos);

    return (
        <AutoresContext.Provider value={{autores, actualizarAutores}}>
            {children}
        </AutoresContext.Provider>
    )
}

export function useAutores() {
    const context = useContext(AutoresContext);
    if (!context) {
        throw new Error("useAutores must be used within an AutoresProvider");
    }
    return context;
}