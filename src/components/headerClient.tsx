// headerClient.tsx (Client Component)
"use client";

import ProfileButton from "./profileButton";
import Link from "next/link";

interface HeaderClientProps {
  profileData: any;
}

export default function HeaderClient({ profileData }: HeaderClientProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/spotify/logout", { method: "GET" });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
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

      {profileData ? (
        <ProfileButton
          displayName={profileData.display_name}
          photoURL={profileData.images[0]?.url}
          onLogout={handleLogout}
        />
      ) : (
        <Link
          className="bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          href="/api/spotify/login"
        >
          Login with Spotify
        </Link>
      )}
    </header>
  );
}
