import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://mogura.dev",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
  },
});
