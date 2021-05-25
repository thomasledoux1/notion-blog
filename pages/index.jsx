import Head from "next/head";
import Link from "next/link";
import { getBlogs } from "../lib/api";

export default function Home({ blogs, database }) {
  return (
    <>
      <Head>
        <title>Notion Tailwind Next.js Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-4 md:container md:mx-auto my-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Welcome to my blog made with Notion API + Tailwind + Next.js!
        </h1>
        <p>
          Source code can be found on{" "}
          <a
            className="underline"
            href="https://github.com/thomasledoux1/notion-blog"
          >
            Github
          </a>
        </p>
        <p>
          Data comes from{" "}
          <a className="underline" href={`https://notion.so/${database}`}>
            Notion
          </a>
        </p>
        <h2 className="my-4 text-xl font-bold md:text-2xl ">Blogs</h2>
        {blogs.map(blog => (
          <Link passHref key={blog.id} href={`/blog/${blog.id}`}>
            <a>
              <article className="shadow-md hover:shadow-xl p-4 mb-4">
                <h2>{blog.properties.Name.title[0].plain_text}</h2>
                <p>{new Date(blog.last_edited_time).toLocaleDateString()}</p>
              </article>
            </a>
          </Link>
        ))}
        <article></article>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const blogs = await getBlogs();
  return {
    props: {
      blogs,
      database: process.env.NOTION_DATABASE
    },
    revalidate: 3600
  };
}
