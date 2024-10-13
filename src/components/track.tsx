import Image from "next/image";
import Link from "next/link";


export interface TrackProps {
    id: string;
    name: string;
    pictureUrl: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
    external_urls: {
        spotify: string;
    };
    position: number; // Added position property

}


export default function Track(track: TrackProps) {
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
                {track.artists.map((artist) => artist.name).join(", ")}
            </td>
            <td className="flex px-6 py-4 text-sm text-gray-500">
                <Image src={track.album.images[1].url} alt={track.album.name} width={40} height={40} className="w-10 h-10 inline-block mr-2" />
                {track.album.name}
            </td>
        </tr>
    );
}