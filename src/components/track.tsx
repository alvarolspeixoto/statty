import Image from "next/image";
import Link from "next/link";


export interface TrackProps {
    id: string;
    name: string;
    pictureUrl: string;
    artists: any;
    album: any;
    external_urls: any;
    position: number; // Added position property

}


export default function Track(track: TrackProps) {
    let maxSize = 130;
    return (
        <tr key={track.id}>
            <td className="px-6 py-4 text-sm text-gray-500">
                {track.position}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
                <Link target="_blank" href={track.external_urls.spotify}>
                    {track.name}
                </Link>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                {track.artists.map((artist: any) => artist.name).join(", ")}
            </td>
            <td className="flex px-6 py-4 text-sm text-gray-500">
                <img src={track.album.images[1].url} alt={track.album.name} className="w-10 h-10 inline-block mr-2" />
                {track.album.name}
            </td>
        </tr>
    );
}