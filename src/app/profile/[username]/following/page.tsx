import { getFollowing, getProfileByUsername } from "@/actions/profile.action";
import { notFound } from "next/navigation";
import FollowListClient from "../FollowListClient";

export async function generateMetadata({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await getProfileByUsername(username);

    if (!user) {
        return {
            title: "Following",
        };
    }

    return {
        title: `${user.name ?? user.username}'s Following`,
    };
}

async function FollowingPage({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await getProfileByUsername(username);

    if (!user) {
        notFound();
    }

    const following = await getFollowing(user.id);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Following</h1>
            <FollowListClient users={following} />
        </div>
    );
}

export default FollowingPage;