import { cookies } from 'next/headers';
import { fetchSpotifyData } from '@/lib/spotify';

const TopTracksPage = async () => {
  // Pegar o token diretamente dos cookies
  const accessToken = cookies().get('access_token')?.value;

  if (!accessToken) {
    return <div>Error: Unable to fetch access token.</div>;
  }

  let topTracks;

  try {
    topTracks = await fetchSpotifyData('me/top/tracks', accessToken);
  } catch (error) {
    console.error('Error fetching data from Spotify:', error);
    return <div>Error fetching data.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-2'>
      <h1 className='text-3xl font-bold max-w-[500px]'>Your Top Tracks</h1>
    <ol className="list-decimal">
      {topTracks.items.map((track: any) => (
        <li key={track.id}>{track.name}</li>
      ))}
    </ol>
    </div>
  );
};

export default TopTracksPage;
