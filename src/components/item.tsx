import Image from "next/image";

interface ItemProps {
    name: string;
    pictureUrl: string;
    genres?: string[];
    position?: number;
};

export default function Item({ name, pictureUrl, genres, position }: ItemProps) {
    let maxSize = 180;
    return (
        <div>
            <div className="flex flex-wrap shadow-xl shadow-inner" style={{ width: maxSize + 'px', height: maxSize + 'px', overflow: 'hidden', borderRadius: '8px', maxWidth: '180px' }}>
                <Image src={pictureUrl} alt={name + ' picture'} width={maxSize} height={maxSize} style={{ objectFit: 'cover' }}></Image>
            </div>
            <h2 className="font-bold max-w-[180px]">{position + ". " + name}</h2>
        </div>
    );
}