import React from 'react'

type paramsType = { slug: string };

const BlogPostPage = async ({ params }: { params: Promise<paramsType> }) => {
    const { slug } = await params;
    return (
        <div>Slug : {slug}</div>
    )
}

export default BlogPostPage