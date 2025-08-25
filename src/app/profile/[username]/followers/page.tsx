import { getFollowers, getProfileByUsername } from "@/actions/profile.action";
import { notFound } from "next/navigation";
import FollowListClient from "../FollowListClient";

export async function generateMetadata({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await getProfileByUsername(username);

    if (!user) {
        return {
            title: "Followers",
        };
    }

    return {
        title: `${user.name ?? user.username}'s Followers`,
    };
}

async function FollowersPage({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await getProfileByUsername(username);

    if (!user) {
        notFound();
    }

    const followers = await getFollowers(user.id);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Followers</h1>
            <FollowListClient users={followers} />
        </div>
    );
}

export default FollowersPage;