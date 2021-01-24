import { FC, useState } from 'react';
import { ListType, useStore } from '../store/tweet';
import { TweetList } from './TweetList';

export const TweeterLike: FC = () => {
  const [mode, setMode] = useState<ListType>('stream');
  const toggleLike = useStore(state => state.toggleLike);
  const allTweets = useStore(state => state.tweets);
  const likedTweets = useStore(state => state.likedTweets);

  return (
    <div>
      <div>
        <button onClick={() => setMode('stream')}>All Tweets</button>
        <button onClick={() => setMode('liked')}>Liked Tweets</button>
      </div>
      <div>
        <h2>{mode === 'liked' ? 'Liked Tweets' : 'Tweet Stream'}</h2>
      </div>
      <hr />
      <TweetList
        tweets={mode === 'liked' ? likedTweets : allTweets}
        onChangeLike={toggleLike}
      />
    </div>
  );
};
