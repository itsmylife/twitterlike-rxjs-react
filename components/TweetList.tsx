import { FC } from 'react';
import { Tweet } from '../store/tweet-store';
import classNames from 'classnames';
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
        {tweets.map(tweet => {
          const { id, content, account, timestamp, liked } = tweet;
          return (
            <li
              key={id}
              className={classNames(styles.box, { [styles.liked]: liked })}>
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
                    onChange={() => onChangeLike(tweet)}
                  />
                </p>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
