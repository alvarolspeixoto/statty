export const getSpotifyAccessToken = async (): Promise<string> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const authToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authToken}`,
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }).toString(),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${data.error}`);
    }
    return data.access_token;
};

export const fetchSpotifyData = async (endpoint: string, accessToken: string) => {
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Spotify API Error:', data);
        throw new Error(`Spotify API Error: ${data.error.message}`);
    }

    return data;
};

export async function fetchSpotifyProfile(accessToken: string) {
    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Spotify profile');
    }

    return res.json();
}

