"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";
import { isFollowing } from "@/actions/profile.action";

function FollowButton({ userId }: { userId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowingUser, setIsFollowingUser] = useState(false);

    useEffect(() => {
        const checkFollowingStatus = async () => {
            const following = await isFollowing(userId);
            setIsFollowingUser(following);
        };

        checkFollowingStatus();
    }, [userId]);

    const handleFollow = async () => {
        setIsLoading(true);
        try {
            const { message } = await toggleFollow(userId);
            setIsFollowingUser(!isFollowingUser); // Update the state optimistically
            toast.success(message);
        } catch (error) {
            toast.error("Error toggling follow");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            size={"sm"}
            variant={isFollowingUser ? "outline" : "secondary"}
            onClick={handleFollow}
            disabled={isLoading}
            className="w-20"
        >
            {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
            ) : isFollowingUser ? (
                "Unfollow"
            ) : (
                "Follow"
            )}
        </Button>
    );
}

export default FollowButton;