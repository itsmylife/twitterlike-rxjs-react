import create, { State, StateCreator } from 'zustand';
import { tweets } from '../stream/twit-stream';
import { map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
import produce, { Draft } from 'immer';

const THIRTY_SECONDS = 30 * 1000; // Milliseconds

export type ListType = 'stream' | 'liked';

export type Tweet = {
  id: string;
  account: string;
  timestamp: number;
  content: string;
  liked: boolean;
};

export type TweetStore = {
  tweets: Tweet[];
  likedTweets: Tweet[];
  addTweet: (tweet: Tweet) => void;
  toggleLike: (tweet: Tweet) => void;
  clearList: (mode: ListType) => void;
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
    addTweet: tweet => {
      set(state => {
        const filtered = state.tweets.filter(newerThan30Seconds);
        state.tweets = [tweet, ...filtered];
      });
    },
    toggleLike: tweet => {
      set(state => {
        const updatedTweet = { ...tweet, liked: !tweet.liked };

        state.tweets = state.tweets.map(t => {
          return t.id === updatedTweet.id ? updatedTweet : t;
        });

        if (updatedTweet.liked) {
          state.likedTweets.unshift(updatedTweet);
        } else {
          state.likedTweets = state.likedTweets.filter(
            t => t.id !== updatedTweet.id,
          );
        }
      });
    },
    clearList: mode => {
      set(state => {
        switch (mode) {
          case 'liked':
            state.likedTweets.forEach(tweet => {
              const foundIndex = state.tweets.findIndex(t => tweet.id === t.id);
              if (foundIndex > -1) {
                state.tweets.splice(foundIndex, 1);
              }
            });
            state.likedTweets = [];
            return;
          case 'stream':
            state.tweets = [];
            return;
        }
      });
    },
  })),
);

tweets
  .pipe(map(item => ({ ...item, liked: false, id: uuidV4() })))
  .subscribe((newTweet: Tweet) => useStore.getState().addTweet(newTweet));
