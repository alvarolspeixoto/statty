import Image from "next/image";

interface TrackProps {
    name: string;
    pictureUrl: string;
    position?: number;
}

export default function Item({ name, pictureUrl, position }: TrackProps) {
    return (
        <div className="flex flex-col gap-2 w-1/5 min-w-[150px]">
            <div className="flex flex-wrap shadow-xl shadow-inner w-full h-auto overflow-hidden rounded-lg relative" style={{ aspectRatio: '1 / 1' }}>
                <Image 
                    src={pictureUrl} 
                    alt={name + ' picture'} 
                    fill
                    className="object-cover"
                />
            </div>
            <h2 className="text-sm w-full text-center">
                <span className="font-bold">{position + '. '}</span>
                {name}
            </h2>
        </div>
    );
}
