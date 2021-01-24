import { TweeterLike } from '../components/TweeterLike';
import styles from './/Home.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>RxJS Tweeter Like App!</h1>
      <TweeterLike />
    </div>
  );
}
