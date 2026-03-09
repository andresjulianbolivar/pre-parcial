import Lista from "@/components/Lista";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-4">
      <h1 className="text-4xl font-bold">Página Autores</h1>
      </div>
      <Lista />
    </main>
  );
}