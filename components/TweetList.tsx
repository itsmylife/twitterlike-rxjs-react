import { FC } from 'react';
import { Tweet } from '../store/tweet-store';
import { TweetBox } from './TweetBox';
import styles from './TweetList.module.css';

interface IProps {
  tweets: Tweet[];
  onChangeLike: (tweet: Tweet) => void;
}

export const TweetList: FC<IProps> = props => {
  const { tweets, onChangeLike } = props;
  return (
    <>
      <h3>Tweets Liked: {tweets.filter(t => t.liked).length}</h3>
      <ul className={styles.list}>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <TweetBox tweet={tweet} onChangeLike={onChangeLike} />
          </li>
        ))}
      </ul>
    </>
  );
};
