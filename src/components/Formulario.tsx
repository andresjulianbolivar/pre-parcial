"use client";
import { useState } from "react";
import { useAutores } from "./AutoresContext";

interface FormularioProps {
    birthDate?: string;
    description?: string;
    image?: string;
    name?: string;
    edicion?: boolean;
}

interface Autor {
    birthDate: string;
    description: string;
    image: string;
    name: string;
    id: number;
}

type Form = {
    nombre: string;
    fechaDeNacimiento: string;
    descripcion: string;
    imagen: string;
}

type Errors = {
    nombre?: string;
    fechaDeNacimiento?: string;
    descripcion?: string;
    imagen?: string;
}

export default function Formulario({name="",birthDate="",description="",image="",edicion=false}:FormularioProps) {
    const [form, setForm] = useState<Form>({nombre:name,fechaDeNacimiento:birthDate,descripcion:description,imagen:image})
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<{ nombre?:boolean, fechaDeNacimiento?:boolean, descripcion?:boolean, imagen?:boolean}>({});
    const {autores, actualizarAutores} = useAutores();
    const regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    
    function validateAll(values: Form): Errors {
        const e: Errors = {};
        const nombreMsg = validateField("nombre",values.nombre);
        const fechaDeNacimientoMsg = validateField("fechaDeNacimiento",values.fechaDeNacimiento);
        const descripcionMsg = validateField("descripcion",values.descripcion);
        const imagenMsg = validateField("imagen",values.imagen);
        if (nombreMsg) e.nombre = nombreMsg;
        if (fechaDeNacimientoMsg) e.fechaDeNacimiento = fechaDeNacimientoMsg;
        if (descripcionMsg) e.descripcion = descripcionMsg;
        if (imagenMsg) e.imagen = imagenMsg;
        return e;
    }

    const isValid = Object.keys(validateAll(form)).length === 0;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value } as Form));
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setTouched((t)=>({...t,[name]: true}));
        const msg = validateField(name as "nombre" | "fechaDeNacimiento" | "descripcion" | "imagen", value);
        setErrors((prev)=>({...prev,[name]:msg}))
    }

    function validateField(name: "nombre" | "fechaDeNacimiento" | "descripcion" | "imagen", value:string): string | undefined {
        if (name === "nombre") {
            if (!value.trim()) return "El nombre es obligatorio";
        }
        if (name === "fechaDeNacimiento") {
            if (!value.trim()) return "La fecha de nacimiento es obligatoria";
            if (!regexFecha.test(value)) return "La fecha de nacimiento no es válida (Se requiere formato AAAA-MM-DD)";
        }
        if (name === "descripcion") {
            if (!value.trim()) return "La descripción es obligatoria";
        }
        if (name === "imagen") {
            if (!value.trim()) return "La URL de la imagen es obligatoria";
            if (!value.includes("https://")) return "La URL de la imagen debe comenzar con 'https://'";
        }
        return undefined;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (edicion) {
            const nuevosAutores = autores.map(autor => {
                if (autor.name === name) {
                    return {
                        name: form.nombre,
                        birthDate: form.fechaDeNacimiento,
                        description: form.descripcion,
                        image: form.imagen,
                        id: autor.id
                    };
                }
                return autor;
            });
            actualizarAutores(nuevosAutores);
            alert(`Autor ${form.nombre} editado exitosamente`);
        }
        else {
            const nuevoAutor: Autor = {
                name: form.nombre,
                birthDate: form.fechaDeNacimiento,
                description: form.descripcion,
                image: form.imagen,
                id: autores.length > 0 ? Math.max(...autores.map(a => a.id)) + 1 : 1
            };

            const nuevosAutores = [...autores, nuevoAutor];
            actualizarAutores(nuevosAutores);
            alert(`Autor ${form.nombre} agregado exitosamente`);
        }
        setForm({nombre:"",fechaDeNacimiento:"",descripcion:"",imagen:""});
        setTouched({});
        setErrors({});
    }

    return (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-body">
                    Nombre
                </label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    placeholder="Ingrese el nombre del autor"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.nombre && errors.nombre)}
                    aria-describedby={touched.nombre && errors.nombre ? "nombre-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
                {touched.nombre && errors.nombre && (
                    <p id="nombre-error" className="mt-1 text-sm text-red-400">
                        {errors.nombre}
                    </p>
                )
                }
            </div>
            <div className="space-y-2">
                <label htmlFor="fechaDeNacimiento" className="block text-sm font-medium text-body">
                    Fecha de Nacimiento
                </label>
                <input
                    placeholder="Ingrese la fecha de nacimiento del autor"
                    type="text"
                    id="fechaDeNacimiento"
                    name="fechaDeNacimiento"
                    value={form.fechaDeNacimiento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.fechaDeNacimiento && errors.fechaDeNacimiento)}
                    aria-describedby={touched.fechaDeNacimiento && errors.fechaDeNacimiento ? "fechaDeNacimiento-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
                {touched.fechaDeNacimiento && errors.fechaDeNacimiento && (
                    <p id="fechaDeNacimiento-error" className="mt-1 text-sm text-red-400">
                        {errors.fechaDeNacimiento}
                    </p>
                )
                }
            </div>
            <div className="space-y-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-body">
                    Descripción
                </label>
                <input
                    placeholder="Ingrese una breve descripción del autor"
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.descripcion && errors.descripcion)}
                    aria-describedby={touched.descripcion && errors.descripcion ? "descripcion-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
                {touched.descripcion && errors.descripcion && (
                    <p id="descripcion-error" className="mt-1 text-sm text-red-400">
                        {errors.descripcion}
                    </p>
                )
                }
            </div>
            <div className="space-y-2">
                <label htmlFor="imagen" className="block text-sm font-medium text-body">
                    URL de la Imagen
                </label>
                <input
                    placeholder="Ingrese la URL de la imagen del autor"
                    type="text"
                    id="imagen"
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.imagen && errors.imagen)}
                    aria-describedby={touched.imagen && errors.imagen ? "imagen-error" : undefined}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
                {touched.imagen && errors.imagen && (
                    <p id="imagen-error" className="mt-1 text-sm text-red-400">
                        {errors.imagen}
                    </p>
                )
                }
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}