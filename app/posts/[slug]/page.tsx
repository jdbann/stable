import { FormattedDate } from "../../../components/FormattedDate";
import { Markdown } from "../../../components/Markdown";
import { Andrew } from "../../../lib/andrew";

type PathParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<PathParams[]> {
  const res = await Andrew.content.GetPosts();

  return res.Posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  const res = await Andrew.content.GetPost(slug);
  return res.Post;
}

export default async function Page({
  params: { slug },
}: {
  params: PathParams;
}) {
  const post = await getPost(slug);

  return (
    <div className="grid-template-sidebar-inline lg:grid-template-sidebar grid gap-y-4 gap-x-6">
      <header className="area-[header]">
        <h1 className="font-serif text-h-lg text-slate-12">{post.title}</h1>
      </header>

      <div className="area-[sidebar]">
        <dl className="text-sm">
          <div className="flex flex-row lg:justify-end">
            <dt>Published&nbsp;</dt>
            <dd>
              <FormattedDate
                className="text-slate-12"
                date={new Date(post.created_at)}
              />
            </dd>
          </div>
        </dl>
      </div>

      <div className="max-w-prose flex flex-col gap-4 area-[content]">
        <Markdown source={post.body} />
      </div>
    </div>
  );
}
