import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-5 p-4">
      <Image src="/images/statty.png" alt="Statty Logo" width={200} height={200} />
      <h1 className="text-3xl font-bold w-full text-center">Suas estatísticas do Spotify em tempo real.</h1>
      <div className="flex gap-3">
        <Link href="/top-tracks" className="bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Minhas músicas mais ouvidas
        </Link>
        <Link href="/top-artists" className="bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Meus artistas mais ouvidos
        </Link>
      </div>
    </div>
  );
}
