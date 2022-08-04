import { useEffect, useState } from 'react';
import './MainContent.css';
import TweetForm from '../tweets/TweetForm';
import TweetsList from '../tweets/TweetsList';
import TweetsItem from '../tweets/TweetsItem';
import { useTweets } from '../tweets/TweetsProvider';

export default function MainContent() {
  const tweetsContext = useTweets();
  useEffect(() => {
    tweetsContext.getTweets();
  }, []);
  
  return (
    <div className="main-content">
      <TweetForm onAdded={tweetsContext.getTweets} />
      <TweetsList>
        {tweetsContext.tweets.map((tweet, index) => <TweetsItem key={index} tweet={tweet.tweet} user={tweet.user} />)}
      </TweetsList>
    </div>
  );
}
