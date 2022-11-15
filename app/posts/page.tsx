export default function Page() {
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
      </div>
    </div>
  );
}
