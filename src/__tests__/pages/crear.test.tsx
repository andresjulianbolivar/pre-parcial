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
});