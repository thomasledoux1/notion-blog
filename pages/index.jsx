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
          Notion API + Tailwind + Next.js
        </h1>
        <p>Welcome to my example blog!</p>
        <p>Technologies used:</p>
        <ul className="list-disc list-inside">
          <li className="my-2">
            <span className="px-2 py-1 bg-yellow-200">Notion API</span> as
            Markdown backend
          </li>
          <li className="mb-2">
            <span className="px-2 py-1 bg-yellow-200">Tailwind</span> for
            styling
          </li>
          <li>
            <span className="px-2 py-1 bg-yellow-200">Next.js</span> as
            framework
          </li>
        </ul>
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
        <p>
          Hosted on{" "}
          <a
            className="underline"
            href="https://notion-blog-ruby-kappa.vercel.app/"
          >
            Vercel
          </a>
        </p>
        <h2 className="my-4 text-xl font-bold md:text-2xl ">Blogs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <Link passHref key={blog.id} href={`/blog/${blog.id}`}>
              <a>
                <article className="shadow-md hover:shadow-xl p-4">
                  <h2>{blog.properties.Name.title[0].plain_text}</h2>
                  <p>{new Date(blog.last_edited_time).toLocaleDateString()}</p>
                </article>
              </a>
            </Link>
          ))}
        </div>

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
