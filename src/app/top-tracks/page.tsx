import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "@/components/loading";
import TopTracksClient from "./topTracksClient";

const TopTracksPage = async () => {
  const accessToken = cookies().get("access_token")?.value;

  if (!accessToken) {
    return <div>Error: Unable to fetch access token.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-2'>
      <h1 className='text-3xl font-bold max-w-[500px]'>Your Top Tracks</h1>
      <Suspense fallback={<Loading />}>
        <TopTracksClient accessToken={accessToken} />
      </Suspense>
    </div>

  )
};

export default TopTracksPage;
