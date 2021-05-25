async function fetcher(url, method = "GET") {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`
    }
  });
}

export async function getBlogs() {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE}/query`,
    "POST"
  );
  const database = await res.json();
  return database.results;
}

export async function getBlocks(blogId) {
  const res = await fetcher(
    `https://api.notion.com/v1/blocks/${blogId}/children`
  );
  const blocks = await res.json();
  return blocks.results;
}

export async function getBlog(blogId) {
  const res = await fetcher(`https://api.notion.com/v1/pages/${blogId}`);
  const blog = await res.json();
  return blog;
}
