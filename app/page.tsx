export default function Page() {
  return (
    <div className="grid-template-sidebar-inline lg:grid-template-sidebar grid gap-y-4 gap-x-6">
      <header className="area-[header]">
        <h1 className="font-serif text-h-lg text-slate-12">
          email
          <wbr />
          address
          <wbr />
          .horse
        </h1>
      </header>

      {/* <div className="area-[sidebar]">Sidebar</div> */}

      <div className="max-w-prose flex flex-col gap-4 area-[content]">
        <p className="text-lg text-slate-12">
          Hey, hi! My name is John and I&apos;m a web developer. I make things,
          and I try to be considerate when making them. This website is where I
          explain what those things are, and how I am thinking about them.
        </p>
        <p>
          I&apos;m currently working on Ex Libris RPG, a directory of
          third-party content created for great indie roleplaying games, like
          Mörk Borg and Mausritter.
        </p>
        <p>
          In addition, I&apos;m rebuilding this personal website of mine to try
          and explain a bit more about my process. A lot of thought goes into
          these things and I&apos;d love to make it easier for others to follow
          along.
        </p>
      </div>
    </div>
  );
}
