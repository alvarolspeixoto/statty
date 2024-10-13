"use client";

import { useState, Suspense } from "react";
import Loading from "@/components/loading";
import { fetchSpotifyData } from "@/lib/spotify";
import Link from "next/link";
import Item from "@/components/item";

interface PageClientProps {
    accessToken: string;
    timeRange: string;
}

const PageClient = async ({ accessToken, timeRange }: PageClientProps ) => {
    try {
        const topArtists = await fetchSpotifyData(`me/top/artists?limit=50&time_range=${timeRange}`, accessToken);

        return (
            <div className="overflow-x-auto w-full flex flex-wrap gap-4 justify-center">
                {topArtists.items.map((artist: any, index: number) => (
                        <Link key={artist.id} target="_blank" href={artist.external_urls.spotify}>
                            <Item  
                                position={index+1} 
                                name={artist.name} 
                                pictureUrl={artist.images[1].url}
                            />
                        </Link>
                    ))}
            </div>
        );
    } catch (error) {
        console.error("Erro ao buscar dados do Spotify:", error);
        return <div>Erro ao buscar dados.</div>;
    }
};

const TopArtistsPage = ({ accessToken }: { accessToken: string }) => {
    const [timeRange, setTimeRange] = useState<string>("long_term");
  
    return (
      <>
        <div className="pl-10 mb-4 w-full">
          <label htmlFor="timeRange" className="mr-2 font-bold">Período:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="short_term">Último mês</option>
            <option value="medium_term">Últimos 6 meses</option>
            <option value="long_term">1 ano</option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 mt-2 h-full">
          <Suspense fallback={<Loading />}>
            <PageClient accessToken={accessToken} timeRange={timeRange} />
          </Suspense>
        </div>
      </>
    );
  };
  
  export default TopArtistsPage;
  
