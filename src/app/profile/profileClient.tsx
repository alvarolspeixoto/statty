"use client";
import Item from "@/components/item";
import { fetchSpotifyData, fetchSpotifyProfile } from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";

interface ProfileClientProps {
    accessToken: string;
}

const ProfileClient = async ({ accessToken }: ProfileClientProps) => {

    let profileInfo;
    let favoriteArtists;

    try {
        [profileInfo, favoriteArtists] = await Promise.all([
            fetchSpotifyProfile(accessToken),
            fetchSpotifyData('me/top/artists?limit=5&time_range=long_term', accessToken)
        ]);
    } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        return <div>Error fetching data.</div>;
    }

    let photoURL = profileInfo.images[1].url;
    let displayName = profileInfo.display_name;
    let spotifyProfileURI = profileInfo.external_urls.spotify;
    return (
        <div >
            <div className="flex justify-between p-4 bg-gradient-to-r from-white to-gray-300">
                <div className="flex gap-3 p-4 items-center">
                    <Image
                        src={photoURL}
                        alt="avatar"
                        className="rounded-full shadow-xl"
                        width="150"
                        height="150"
                    />
                    <h2 className="text-6xl font-bold max-w-[500px]">{displayName}</h2>
                </div>
                <Link target="_blank" className="bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 max-h-[40px]" href={spotifyProfileURI}>
                    Ver perfil no Spotify
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-4 mt-2">
                <h2 className="text-3xl font-bold max-w-[500px] text-center">Artistas favoritos</h2>
                <div className="flex justify-center gap-4">
                    {favoriteArtists.items.map((artist: any, index: number) => (
                        <Link key={artist.id} target="_blank" href={artist.external_urls.spotify}>
                            <Item  
                                position={index+1} 
                                name={artist.name} 
                                pictureUrl={artist.images[1].url}
                                maxSize={200}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default ProfileClient