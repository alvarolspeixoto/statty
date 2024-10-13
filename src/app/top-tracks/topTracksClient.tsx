"use client";

import { useState, Suspense } from "react";
import Loading from "@/components/loading";
import { fetchSpotifyData } from "@/lib/spotify";
import Track from "@/components/track";

interface TopTracksClientProps {
    accessToken: string;
    timeRange: string;
}

const TopTracksClient = async ({ accessToken, timeRange }: TopTracksClientProps) => {
    try {
        const topTracks = await fetchSpotifyData(`me/top/tracks?limit=50&time_range=${timeRange}`, accessToken);

        return (
            <div className="overflow-x-auto w-full">
                <table className="divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Posição
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Música
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Artista(s)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Álbum
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {topTracks.items.length > 0 ? (
                            topTracks.items.map((track: any, index: number) => (
                                <Track key={track.id} {...track} position={index+1} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                                    Nenhuma música disponível
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error("Erro ao buscar dados do Spotify:", error);
        return <div>Erro ao buscar dados.</div>;
    }
};

const TopTracksPage = ({ accessToken }: { accessToken: string }) => {
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
            <TopTracksClient accessToken={accessToken} timeRange={timeRange} />
          </Suspense>
        </div>
      </>
    );
  };
  
  export default TopTracksPage;
  
