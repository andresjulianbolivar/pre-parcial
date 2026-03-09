import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/crear/page';
import { AutoresProvider } from '@/components/AutoresContext';

const setup = () => {
    const user = userEvent.setup();
    render(<AutoresProvider><Page /></AutoresProvider>);

    const heading = screen.getByRole('heading', {name: /página crear autor/i});
    const nombreInput = screen.getByLabelText(/nombre/i ) as HTMLInputElement;
    const fechaInput = screen.getByLabelText(/fecha de nacimiento/i ) as HTMLInputElement;
    const descripcionInput = screen.getByLabelText(/descripción/i) as HTMLInputElement;
    const imagenInput = screen.getByLabelText(/url de la imagen/i) as HTMLInputElement;
    const saveBtn = screen.getByRole('button', {name: /guardar/i});

    return { user, heading, nombreInput, fechaInput, descripcionInput, imagenInput, saveBtn };

}

const fillValid = async (
    user: ReturnType<typeof userEvent.setup>,
    nombreInput: HTMLInputElement,
    fechaInput: HTMLInputElement,
    descripcionInput: HTMLInputElement,
    imagenInput: HTMLInputElement
) => {
    await user.clear(nombreInput);
    await user.type(nombreInput, "Gabriel García Márquez");
    await user.clear(fechaInput);
    await user.type(fechaInput, "2005-10-10");
    await user.clear(descripcionInput);
    await user.type(descripcionInput, "Escritor colombiano, autor de 'Cien años de soledad'.");
    await user.clear(imagenInput);
    await user.type(imagenInput, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Gabriel_Garc%C3%ADa_M%C3%A1rquez.jpg/800px-Gabriel_Garc%C3%ADa_M%C3%A1rquez.jpg");
    await user.tab();
}

describe("Render de /crear", () => {
    test('renderiza heading, campos y ayuda; botón deshabilitado al inicio', () => {
        const { heading, saveBtn } = setup();
        expect(heading).toBeInTheDocument();
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/url de la imagen/i)).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });

    test('fechaDeNacimiento mantiene help en aria-describedby aun sin error', () => {
        setup();
        const fechaDeNacimiento = screen.getByLabelText(/fecha de nacimiento/i);
        expect(fechaDeNacimiento).toHaveAttribute('aria-describedby', expect.stringContaining('fechaDeNacimiento-help'));
    })
});

describe("Interacción en /crear", () => {
    test('blur en vacio muestra errores de nombre, fechaDeNacimiento, descripción e imagen', async () => {
        const { user, heading, nombreInput, fechaInput, descripcionInput, imagenInput, saveBtn } = setup();
        await user.click(nombreInput);
        await user.tab();
        expect(await screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
        expect(nombreInput).toHaveAttribute('aria-invalid', 'true');
        const descNombre = nombreInput.getAttribute('aria-describedby') || "";
        expect(descNombre.split(' ')).toEqual(expect.arrayContaining(['nombre-error']));
        await user.click(fechaInput);
        await user.tab();
        expect(await screen.getByText(/la fecha de nacimiento es obligatoria/i)).toBeInTheDocument();  
        expect(fechaInput).toHaveAttribute('aria-invalid', 'true');
        const descFecha = fechaInput.getAttribute('aria-describedby') || "";
        expect(descFecha.split(' ')).toEqual(expect.arrayContaining(['fechaDeNacimiento-error']));
        await user.click(descripcionInput);
        await user.tab();
        expect(await screen.getByText(/la descripción es obligatoria/i)).toBeInTheDocument();
        expect(descripcionInput).toHaveAttribute('aria-invalid', 'true');
        const descDescripcion = descripcionInput.getAttribute('aria-describedby') || "";
        expect(descDescripcion.split(' ')).toEqual(expect.arrayContaining(['descripcion-error']));
        await user.click(imagenInput);
        await user.tab();
        expect(await screen.getByText(/la url de la imagen es obligatoria/i)).toBeInTheDocument();
        expect(imagenInput).toHaveAttribute('aria-invalid', 'true');
        const descImagen = imagenInput.getAttribute('aria-describedby') || "";
        expect(descImagen.split(' ')).toEqual(expect.arrayContaining(['imagen-error']));
        expect(saveBtn).toBeDisabled();
    });

    test('con valores válidos se habilita el botón y no hay errores en pantalla', async () =>{
        const { user, heading, nombreInput, fechaInput, descripcionInput, imagenInput, saveBtn } = setup();
        await fillValid(user, nombreInput, fechaInput, descripcionInput, imagenInput);
        expect(saveBtn).toBeEnabled();
        expect(nombreInput.getAttribute('aria-invalid')).toBe('false');
        expect(fechaInput.getAttribute('aria-invalid')).toBe('false');
        expect(descripcionInput.getAttribute('aria-invalid')).toBe('false');
        expect(imagenInput.getAttribute('aria-invalid')).toBe('false');
        expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    });
});