import getClientPromise from "../mongodb";

import { BlogPost } from "@/types";

export async function createBlogPost(blogData:BlogPost) {
    const client = await getClientPromise();
    const db = client.db()
    const blogs = db.collection<BlogPost>("blogposts");

    const res = await blogs.insertOne({
        ...blogData,
    })

    return res
}

export async function getBlogPosts() {
    const client = await getClientPromise();
    const db = client.db()
    const blogs = db.collection<BlogPost>("blogposts")

    return blogs.find({}).toArray();
}

