"use server";

import { getDbUserId } from "@/actions/user.action";
import prisma from "@/lib/prisma";

export async function editPost(postId: string, content: string) {
    try {
        const userId = await getDbUserId();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        if (!content) {
            return { success: false, error: "Content is required" };
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
                authorId: userId,
            },
        });

        if (!post) {
            return { success: false, error: "Post not found or unauthorized" };
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                content: content,
                updatedAt: new Date(),
            },
        });

        return { success: true, post: updatedPost };
    } catch (error) {
        console.error("Failed to edit post:", error);
        return { success: false, error: "Failed to edit post" };
    }
}