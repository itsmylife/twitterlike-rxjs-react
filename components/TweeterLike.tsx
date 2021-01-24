import { FC, useState } from 'react';
import { useStore } from '../store/tweet';

export const TweeterLike: FC = () => {
  const [mode, setMode] = useState<'stream' | 'liked'>('stream');
  const toggleLike = useStore(state => state.toggleLike);
  const tweets = useStore(state =>
    mode === 'liked' ? state.tweets.filter(t => t.liked) : state.tweets,
  );

  return (
    <div>
      <div>
        <button onClick={() => setMode('stream')}>All Tweets</button>
        <button onClick={() => setMode('liked')}>Liked Tweets</button>
      </div>
      <div>
        <h3>Tweets Liked: {tweets.filter(t => t.liked).length}</h3>
      </div>
      {mode === 'liked' ? 'Liked Tweets' : 'Tweet Stream'}
      {
        <ul>
          {tweets.map(({ id, content, account, timestamp, liked }) => (
            <li key={id}>
              <span>
                <p>
                  <b>{account}</b>
                  {` - `}
                  {new Date(timestamp).toLocaleDateString()}
                </p>
                <p>{content}</p>
                <p>
                  Liked:{' '}
                  <input
                    type="checkbox"
                    checked={liked}
                    onChange={() => toggleLike(id)}
                  />
                </p>
              </span>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
