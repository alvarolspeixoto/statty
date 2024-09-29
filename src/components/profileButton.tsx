import Image from "next/image";
import Link from "next/link";

interface ProfileProps {
    displayName: string;
    photoURL: string;
}

export default function ProfileButton({ displayName, photoURL }: ProfileProps) {
    return (
        <div className="relative flex items-center gap-2 group">
            <span>{displayName}</span>
            <Image
                src={photoURL}
                alt="avatar"
                className="rounded-full cursor-pointer"
                width="50"
                height="50"
            />
            <div className="absolute right-0 top-1 mt-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    See profile
                </Link>
                <Link href="/api/spotify/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Logout
                </Link>
            </div>
        </div>
    );
}