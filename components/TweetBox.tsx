import { FC } from 'react';
import classNames from 'classnames';
import styles from './TweetBox.module.css';
import { Tweet } from '../store/tweet-store';

interface IProps {
  tweet: Tweet;
  onChangeLike: (tweet: Tweet) => void;
}

export const TweetBox: FC<IProps> = props => {
  const { tweet, onChangeLike } = props;
  const { content, liked, timestamp, account } = tweet;
  return (
    <div className={classNames(styles.box, { [styles.liked]: liked })}>
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
    </div>
  );
};
