import type { AstroIntegration } from "astro";

import path from "node:path";
import { fileURLToPath } from "node:url";

import fs from "node:fs";

const TEMP = "temp_pages";

function emptyDirSync(dir: string) {
  let items;
  try {
    items = fs.readdirSync(dir);
  } catch {
    return fs.mkdirSync(dir);
  }

  items.forEach((item) => {
    item = path.join(dir, item);
    fs.rmSync(item, { recursive: true, force: true });
  });
}

function makePage(page: number) {
  return `
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width" />
  <meta name="generator" content={Astro.generator} />
  <title>Astro Page ${page}</title>
</head>
<body>  <header> <a href="/">Home</a> </header>
    <main>    <h1>This is  Page ${page}</h1> </main></body>
</html>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} header {
  max-width: 80%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  padding-block: 1rem;
  gap: 1rem;
} main {
  max-width: 80%;
  margin-inline: auto;
  padding-block: 2rem;
} 
</style>`;
}

export default function Integration(options: {
  pages: number;
}): AstroIntegration {
  const routes = Array.from({ length: options.pages }, (_, i) => {
    return {
      pattern: `/page-${i + 1}`,
      entrypoint: `./src/${TEMP}/page-${i + 1}.astro`,
    };
  });

  return {
    name: "astro-testpages",
    hooks: {
      "astro:config:setup": ({ logger, injectRoute, config, command }) => {
        logger.info(`Creating ${options.pages} pages...`);

        const TEMP_DIR = fileURLToPath(new URL("temp_pages", config.srcDir));
        emptyDirSync(TEMP_DIR);

        if (command === "build") {
          routes.forEach((route, i) => {
            const pagename = path.join(TEMP_DIR, route.pattern + ".astro");

            fs.writeFileSync(pagename, makePage(i + 1));
          });

          console.time("Inject routes");

          routes.forEach((route) => {
            injectRoute(route);
          });

          console.timeEnd("Inject routes");
        } else {
          console.time("Inject routes");
          routes.forEach((route) => {
            injectRoute({ ...route, entrypoint: "./src/pages/index.astro" });
          });
          console.timeEnd("Inject routes");
        }
      },
    },
  };
}
