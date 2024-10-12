import { cookies } from "next/headers";
import ProfileClient from "./profileClient";
import { Suspense } from "react";
import Loading from "@/components/loading";

const ProfilePage = async () => {
    const accessToken = cookies().get("access_token")?.value;

    if (!accessToken) {
        return <div>Error: Unable to fetch access token.</div>;
    }

    return <Suspense fallback={<Loading />}>
        <ProfileClient accessToken={accessToken} />
    </Suspense>
};

export default ProfilePage;
