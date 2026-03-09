import '@testing-library/jest-dom'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          birthDate: "2000-01-01",
          name: "Autor Test",
          description: "Descripción del autor de prueba",
          image: "https://example.com/autor-test.jpg",
        }
      ])
  })
)