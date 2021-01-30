import { useStore } from './tweet-store';
import { act, renderHook } from '@testing-library/react-hooks';

describe('tweet store test suite', () => {
  const initialStore = { ...renderHook(() => useStore()).result.current };

  // Reset all stores after each test run
  // See https://github.com/pmndrs/zustand/wiki/Testing
  afterEach(() => {
    act(() => {
      useStore.setState(initialStore, true);
    });
  });

  it('addTweet method adds a new tweet to the store', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.tweets).toHaveLength(0);
    const testTweet = {
      liked: false,
      id: 'test-id',
      timestamp: Date.now(),
      account: 'test-account',
      content: 'test-content',
    };
    act(() => {
      result.current.addTweet(testTweet);
    });
    expect(result.current.tweets).toHaveLength(1);
    const tweet = result.current.tweets[0];
    expect(tweet.id).toBe(testTweet.id);
    expect(tweet.content).toBe(testTweet.content);
  });

  it('toggleLike method toggles like/unlike for a tweet', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.tweets).toHaveLength(0);
    expect(result.current.likedTweets).toHaveLength(0);
    const testTweet = {
      liked: false,
      id: 'test-id',
      timestamp: Date.now(),
      account: 'test-account',
      content: 'test-content',
    };
    act(() => {
      result.current.addTweet(testTweet);
    });
    expect(result.current.tweets).toHaveLength(1);
    expect(result.current.likedTweets).toHaveLength(0);
    const tweet = result.current.tweets[0];
    expect(tweet.liked).toBe(false);

    act(() => {
      result.current.toggleLike(testTweet);
    });

    expect(result.current.tweets[0].liked).toBe(true);
    expect(result.current.likedTweets).toHaveLength(1);
  });

  it('clearList method clears the list associated with given key', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.tweets).toHaveLength(0);
    expect(result.current.likedTweets).toHaveLength(0);
    const testTweet = {
      liked: false,
      id: 'test-id',
      timestamp: Date.now(),
      account: 'test-account',
      content: 'test-content',
    };
    act(() => {
      result.current.addTweet(testTweet);
    });
    expect(result.current.tweets).toHaveLength(1);
    expect(result.current.likedTweets).toHaveLength(0);
    const tweet = result.current.tweets[0];
    expect(tweet.liked).toBe(false);

    act(() => {
      result.current.toggleLike(testTweet);
    });

    expect(result.current.tweets[0].liked).toBe(true);
    expect(result.current.likedTweets).toHaveLength(1);

    act(() => {
      result.current.clearList('stream');
    });

    expect(result.current.likedTweets).toHaveLength(1);
    expect(result.current.tweets).toHaveLength(0);

    act(() => {
      result.current.clearList('liked');
    });

    expect(result.current.likedTweets).toHaveLength(0);
    expect(result.current.tweets).toHaveLength(0);
  });
});
