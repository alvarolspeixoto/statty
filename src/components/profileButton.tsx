import Image from "next/image";
import Link from "next/link";

interface ProfileProps {
    displayName: string;
    photoURL: string;
    onLogout: () => void;
}

export default function ProfileButton({ displayName, photoURL, onLogout }: ProfileProps) {
    return (
        <div className="relative flex items-center gap-2 group cursor-pointer">
            <span>{displayName}</span>
            <Image
                src={photoURL}
                alt="avatar"
                className="rounded-full"
                width="50"
                height="50"
            />
            <div className="absolute right-0 top-1 mt-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    See profile
                </Link>
                <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}