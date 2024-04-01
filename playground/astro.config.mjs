import { defineConfig } from "astro/config";
import testpages from "astro-testpages";
import { TEST_PAGES } from "./src/constants";
// https://astro.build/config
export default defineConfig({
  integrations: [testpages({ pages: TEST_PAGES })],
});
