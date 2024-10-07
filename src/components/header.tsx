// header.tsx (Server Component)
import { Suspense } from "react";
import HeaderClient from "./headerClient";
import { fetchSpotifyProfile } from "@/lib/spotify";
import Loading from "./loading";
import { cookies } from "next/headers";

export default async function Header() {
  const accessToken = cookies().get("access_token")?.value;

  let profileData = null;
  if (accessToken) {
    try {
      profileData = await fetchSpotifyProfile(accessToken);
    } catch (error) {
      console.error("Error fetching Spotify profile:", error);
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <HeaderClient profileData={profileData} />
    </Suspense>
  );
}
