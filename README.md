# zothacks-site

## Overview

This monorepo uses [turborepo](https://turbo.build/repo) with [pnpm](https://pnpm.io) as a package manager. It contains the following:

### `apps/site`

A [Next.js](https://nextjs.org/) 13 project that uses the new app router.

This app contains the ZotHacks site.

The development server runs at `http://localhost:3000`. If this port is taken, the next available port will be used.

### `apps/studio`

A [Sanity Studio](https://www.sanity.io/studio) project.

This app contains the dashboard used to view and edit content stored in [Sanity](https://www.sanity.io/).

The development server runs at `http://localhost:3333`. If this port is taken, the project will error.

## Workspace Setup

This repo used `pnpm`, a space efficient replacement to `npm`.
You can learn more about it's advantages at <https://pnpm.io/>.

Install pnpm with the following command, or use an [alternative instalation method](https://pnpm.io/installation).

```bash
npm install -g pnpm
```

When running commands, use `pnpm` rather than `npm`.

### Dependencies

Running the following command will install dependencies for all apps and packages regardless of where it's executed.

```bash
pnpm install
```

When installing a new dependency for an individual app or package, first navigate to the corresponding directory, then run the `pnpm add` command. Alternatively, use the `filter` flag: `pnpm add <package name> --filter site`.

If you want to install a package shared by multiple apps or packages, run the command at the project root. You'll have to use the -w flag (or --workspace-root) to confirm your intention.

### Build

To build all apps and packages, run the following command in the project root.

```bash
pnpm build
```

To build an individual app or package, first navigate to the corresponding directory and run the build command.

### Develop

To develop all apps and packages, run the following command in the project root.

```bash
pnpm dev
```

To develop an individual app or package, first navigate to the corresponding directory and run the dev command.

## License

This repo is currently source available, but not licensed under an open source license. This may be subject to change in the future.

Copyright © Hack at UCI
