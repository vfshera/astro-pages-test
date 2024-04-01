# `Astro Testpages`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that TODO:description

## Usage

### Prerequisites

TODO:

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-testpages
```

```bash
npx astro add astro-testpages
```

```bash
yarn astro add astro-testpages
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-testpages
```

```bash
npm install astro-testpages
```

```bash
yarn add astro-testpages
```

2. Add the integration to your astro config

```diff
+import integration from "astro-testpages";

export default defineConfig({
  integrations: [
+    integration(),
  ],
});
```

### Configuration

TODO:configuration

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm:

```bash
pnpm i --frozen-lockfile
```

Watch for package changes:

```bash
pnpm package:dev
```

Start the playground:

```bash
pnpm playground:dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/TODO:/blob/main/LICENSE). Made with ❤️ by [TODO:](https://github.com/vfshera).
