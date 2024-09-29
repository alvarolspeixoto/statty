// "use client";

import { fetchSpotifyProfile } from "@/lib/spotify";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ProfileButton from "./profileButton";

export default async function Header() {

    const accessToken = cookies().get("access_token")?.value;
    let profileData = null;

    if (accessToken) {
        try {
            profileData = await fetchSpotifyProfile(accessToken);
        } catch (error) {
            console.error('Error fetching Spotify profile:', error);
        }
    }

    return (
        <header className="flex justify-between items-center py-4 px-7 border-b">
            {/* <Link href="/">
        <Image
          src="https://placehold.jp/000000/ffffff/150x150.png?text=B&css=%7B%22border-radius%22%3A%2215px%22%7D"
          alt="logo"
          className="h-[35px] w-[35px]"
          width="50"
          height="50"
        />
      </Link> */}

            <nav>
                <ul className="flex gap-x-5">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/top-tracks">Your top tracks</a>
                    </li>
                </ul>
            </nav>
            <h2 className="text-3xl font-bold">Statty</h2>
            {
                profileData ? (
                    <ProfileButton displayName={profileData.display_name} photoURL={profileData.images[0].url} />
                ) : (
                    <Link className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" href="/api/spotify/login">
                        Login with Spotify
                    </Link>
                )
            }
        </header>
    );
}