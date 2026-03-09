"use client";
import { useAutores } from "./AutoresContext";
import { useState } from "react";
import Formulario from "./Formulario";

interface Autor {
    birthDate: string;
    description: string;
    image: string;
    name: string;
    id: number;
}

export default function Lista(){
    const {autores, actualizarAutores} = useAutores();

    const [autorEditando, setAutorEditando] = useState<Autor|null>();

    const [nombre, setNombre] = useState("");

    const [listItems, setListItems] = useState(autores.map(autor =>
        <tr className="bg-neutral-primary border-b border-default" key={autor.id}>
            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {autor.name}
            </th>
            <td className="px-6 py-4">
                {autor.birthDate}
            </td>
            <td className="px-6 py-4">
                {autor.description}
            </td>
            <td>
                <img src={autor.image} alt={autor.name} className="w-24 h-24 mx-auto rounded-base mb-4"/>
            </td>
            <td>
                <div className="d-flex flex-wrap gap-2 justify-content-end">
                    <button onClick={ () => handleEditar(autor)} disabled={false} type="button" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" title="Editar">Editar</button>
                    <button onClick={ () => handleEliminar(autor.id)} disabled={false} type="button" className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" title="Eliminar">Eliminar</button>
                </div>
            </td>
        </tr>
    ));

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNombre(value);
        if (nombre === "") {
            setListItems(autores.map(autor =>
                <tr className="bg-neutral-primary border-b border-default" key={autor.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {autor.name}
                    </th>
                    <td className="px-6 py-4">
                        {autor.birthDate}
                    </td>
                    <td className="px-6 py-4">
                        {autor.description}
                    </td>
                    <td>
                        <img src={autor.image} alt={autor.name} className="w-24 h-24 mx-auto rounded-base mb-4"/>
                    </td>
                    <td>
                        <div className="d-flex flex-wrap gap-2 justify-content-end">
                            <button onClick={ () => handleEditar(autor)} disabled={false} type="button" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" title="Editar">Editar</button>
                            <button onClick={ () => handleEliminar(autor.id)} disabled={false} type="button" className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" title="Eliminar">Eliminar</button>
                        </div>
                    </td>
                </tr>
    ))
        }
        else{
            setListItems(
                autores.filter(autor=> autor.name.toLowerCase().trim() === nombre.toLowerCase().trim()).map(autor =>
                    <tr className="bg-neutral-primary border-b border-default" key={autor.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            {autor.name}
                        </th>
                        <td className="px-6 py-4">
                            {autor.birthDate}
                        </td>
                        <td className="px-6 py-4">
                            {autor.description}
                        </td>
                        <td>
                            <img src={autor.image} alt={autor.name} className="w-24 h-24 mx-auto rounded-base mb-4"/>
                        </td>
                        <td>
                            <div className="d-flex flex-wrap gap-2 justify-content-end">
                                <button onClick={ () => handleEditar(autor)} disabled={false} type="button" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" title="Editar">Editar</button>
                                <button onClick={ () => handleEliminar(autor.id)} disabled={false} type="button" className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" title="Eliminar">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                )
            )
        }
    }

    function handleEditar(autor: { name: string; birthDate: string; description: string; image: string; id:number }) {
        setAutorEditando(autor);
    }

    function handleEliminar(id: number) {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este autor?");

        if (confirmar) {
            const nuevosAutores = autores.filter(autor => autor.id !== id);
            actualizarAutores(nuevosAutores);
        }

        setNombre("");
    }

    return (
     <div className="mb-4">
        {autorEditando && (
            <Formulario
                key={autorEditando.id}
                {...autorEditando}
                edicion={true}
            />
        )}
        <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-body">
                    Filtro por Nombre
                </label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={nombre}
                    placeholder="Ingrese el nombre del autor"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
        </div>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">Nombre</th>
                            <th scope="col" className="px-6 py-3 font-medium">Fecha de nacimiento</th>
                            <th scope="col" className="px-6 py-3 font-medium">Descripción</th>
                            <th scope="col" className="px-6 py-3 font-medium">Imagen</th>
                            <th scope="col" className="px-6 py-3 font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.length > 0 ? listItems : (
                            <tr className="bg-neutral-primary border-b border-default">
                                <td colSpan={5} className="px-6 py-4 text-center text-body">
                                    No se encontraron autores con el nombre {nombre}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </div>
    );
}