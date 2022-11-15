import React from "react";
import { Andrew } from "../../lib/andrew";

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

async function getPosts() {
  const res = await Andrew.content.GetPosts();
  return res.Posts;
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="grid-template-sidebar-inline lg:grid-template-sidebar grid gap-y-4 gap-x-6">
      <header className="area-[header]">
        <h1 className="font-serif text-h-lg text-slate-12">Posts</h1>
      </header>

      <div className="max-w-prose flex flex-col gap-4 area-[content]">
        <p className="text-lg text-slate-12">
          What&apos;s been going on lately in the land of John? Here's some
          thoughts and theories and maybe a few wild ideas&hellip;
        </p>

        <ul className="mt-12 flex flex-col gap-12">
          {posts.map((post, index) => (
            <React.Fragment key={post.slug}>
              {index > 0 && <hr className="w-[33%] border-indigo-7" />}
              <li key={post.slug}>
                <article className="flex flex-col gap-4" data-slug={post.slug}>
                  <header className="flex flex-col gap-2">
                    <time className="text-sm">
                      {dateFormat.format(new Date(post.created_at))}
                    </time>
                    <h2 className="font-serif text-h-md text-slate-12">
                      {post.title}
                    </h2>
                  </header>
                  <p>{post.summary}</p>
                </article>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
