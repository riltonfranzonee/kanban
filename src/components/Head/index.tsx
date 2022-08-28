import React from "react";
import NextHead from "next/head";

const Head: React.FC = () => {
  return (
    <NextHead>
      <title>Organize your tasks - madewith❤️</title>
      <meta
        name="description"
        content="Minimal Kanban board on which you can create, view and move tickets between columns."
      />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>
    </NextHead>
  );
};

export default Head;
