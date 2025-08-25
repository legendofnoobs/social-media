"use server";

import prisma from "@/lib/prisma";

export async function searchUsersAndPosts(searchTerm: string) {
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            },
            take: 5, // Limit the number of users returned
        });

        const posts = await prisma.post.findMany({
            where: {
                content: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        image: true,
                    },
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    }
                },
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
            take: 5, // Limit the number of posts returned
        });

        return { users, posts };
    } catch (error) {
        console.error("Error searching users and posts:", error);
        return { users: [], posts: [] }; // Return empty arrays in case of error
    }
}