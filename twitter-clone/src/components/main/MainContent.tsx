import { useState } from 'react';
import './MainContent.css';
import TweetForm from '../tweets/TweetForm';
import TweetsList from '../tweets/TweetsList';
import TweetsItem, { ITweetsItemProps } from '../tweets/TweetsItem';

export default function MainContent() {
  const [tweets, setTweets] = useState<ITweetsItemProps[]>([
    {
      tweet: 'Hello, world!',
      user: {
        name: 'John Doe',
        avatar: 'JD',
      },
    },
    {
      tweet: 'Hello, world!',
      user: {
        name: 'John Doe',
        avatar: 'JD',
      },
    },
  ]);

  return (
    <div className="main-content">
      <TweetForm />
      <TweetsList>
        {tweets.map((tweet, index) => <TweetsItem key={index} tweet={tweet.tweet} user={tweet.user} />)}
      </TweetsList>
    </div>
  );
}