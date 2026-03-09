"use client";
import { useAutores } from "./AutoresContext";

export default function Lista(){
    const {autores, actualizarAutores} = useAutores();

    const listItems = autores.map(autor =>
        <tr className="bg-neutral-primary border-b border-default" key={autor.name}>
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
                    <button onClick={ () => handleEliminar(autor.name)} disabled={false} type="button" className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" title="Eliminar">Eliminar</button>
                </div>
            </td>
        </tr>
    );

    function handleEditar(autor: { name: string; birthDate: string; description: string; image: string }) {
    }

    function handleEliminar(name: string) {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este autor?");

        if (confirmar) {
            const nuevosAutores = autores.filter(autor => autor.name !== name);
            actualizarAutores(nuevosAutores);
        }
    }

    return (
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
                    {listItems}
                </tbody>
            </table>
        </div>
    );
}