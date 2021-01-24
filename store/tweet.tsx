import create, { State, StateCreator } from 'zustand';
import { tweets } from '../stream/twit-stream';
import { map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
import produce, { Draft } from 'immer';

const THIRTY_SECONDS = 30 * 1000;

export type Tweet = {
  id: string;
  account: string;
  timestamp: number;
  content: string;
  liked?: boolean;
};

export type TweetStore = {
  tweets: Tweet[];
  addTweet: (tweet: Tweet) => void;
  toggleLike: (id: string) => void;
};

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>,
): StateCreator<T> => (set, get, api) =>
  config(fn => set(produce(fn) as (state: T) => T), get, api);

const newerThan30Seconds = (item: Tweet) =>
  item.timestamp + THIRTY_SECONDS > Date.now();

export const useStore = create<TweetStore>(
  immer<TweetStore>(set => ({
    tweets: [],
    likedTweets: [],
    addTweet: tweet =>
      set(state => {
        const filtered = state.tweets.filter(newerThan30Seconds);
        state.tweets = [tweet, ...filtered];
      }),
    toggleLike: id => {
      set(state => {
        state.tweets = state.tweets.map(t => {
          if (t.id === id) {
            t.liked = !t.liked;
          }
          return t;
        });
      });
    },
  })),
);

tweets
  .pipe(map(item => ({ ...item, liked: false, id: uuidV4() })))
  .subscribe((newTweet: Tweet) => useStore.getState().addTweet(newTweet));
