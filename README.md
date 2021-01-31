This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install the dependencies:

```bash
$ yarn
# or
$ npm i
```

2. First, run the development server:

```bash
$ yarn dev
# or
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. To run the tests use the following command

```bash
$ yarn test
# or
$ npm run test
```

## Summary

- This example project is using `./stream/twit-stream.ts` file for the source of data.
- From that stream we use a subscription to put the data to the [zustand](https://github.com/pmndrs/zustand) store.
- Then the component `TweeterLike.tsx` reads the data and render it.
- When a tweet liked it will be added to liked tweets and it can be visible separately under liked tweets section.
- Tweets that older than 30 seconds will be removed. But liked tweets will stay forever until they will be unliked.

## Things I would like to do if I have more time
- TweeterLike component should contain two different components that have one header (buttons, like counter), and one list renderer. Each component header/list should reach the zustand store by its own. So we prevent unnecessary reconciliation steps. 
- A better UI/UX 
- Cypress e2e tests
- Vercel/Netlify deployment options with Github Actions 