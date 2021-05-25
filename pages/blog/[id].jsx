import Link from "next/link";
import React from "react";
import { getBlocks, getBlogs, getBlog } from "../../lib/api";
import Block from "../../components/block";

const BlogPage = ({ blocks, page }) => {
  const title = page.properties.Name.title[0].plain_text;
  return (
    <>
      <title>{title}</title>
      <main className="mx-4 md:container md:mx-auto my-4">
        <h1 className="text-2xl md:text-4xl font-bold my-4">{title}</h1>
        {blocks.map(block => (
          <Block key={block.id} block={block} />
        ))}
        <Link passHref href="/">
          <a className="inline-block px-4 py-2 bg-green-500 text-white">
            Back to overview
          </a>
        </Link>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const blogs = await getBlogs();
  return {
    paths: blogs.map(el => ({
      params: {
        id: el.properties.Property.id
      }
    })),
    fallback: "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const blocks = await getBlocks(id);
  const page = await getBlog(id);
  return {
    props: {
      blocks,
      page
    },
    revalidate: 3600
  };
}

export default BlogPage;
