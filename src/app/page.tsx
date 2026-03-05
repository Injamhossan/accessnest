import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
        Welcome to Access Nest
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Explore the new components starting with the awesome Navbar.
      </p>
    </main>
  );
}
