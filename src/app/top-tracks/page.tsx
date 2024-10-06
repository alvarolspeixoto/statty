import { cookies } from 'next/headers';
import { fetchSpotifyData } from '@/lib/spotify';
import Link from 'next/link';
import Item from '@/components/item';

const TopTracksPage = async () => {
  const accessToken = cookies().get('access_token')?.value;

  if (!accessToken) {
    return <div>Error: Unable to fetch access token.</div>;
  }

  let topTracks;

  try {
    topTracks = await fetchSpotifyData('me/top/tracks?limit=10&time_range=long_term', accessToken);
  } catch (error) {
    console.error('Error fetching data from Spotify:', error);
    return <div>Error fetching data.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-2'>
      <h1 className='text-3xl font-bold max-w-[500px]'>Your Top Tracks</h1>
      <div className="flex flex-row flex-wrap justify-center gap-4 max-w-100">
        {topTracks.items.map((track: any, index: number) => (
          <Link target="_blank" href={track.external_urls.spotify}>
            <Item
              position={index + 1}
              name={track.name}
              pictureUrl={track.album.images[1].url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopTracksPage;
