import { useState } from 'react';
import { useValidationable } from '../../hooks/validationable';
import validators from './validators';
import './TweetForm.css';
import TArea from '../ui/TArea';
import TButton from '../ui/TButton';
import tweetsApi from '../../api/tweets';
import { useAuth } from '../../contexts/auth';

interface ITweetFormProps {
  onAdded?: () => void;
}

export default function TweetForm({ onAdded }: ITweetFormProps) {
  const auth = useAuth();
  const [tweet, setTweet, tweetError] = useValidationable<string>("", validators.tweet);
  const [touched, setTouched] = useState<boolean>(false);
  
  const validate = () => {
    setTouched(true);
    return !tweetError;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
    
    try {
      await tweetsApi.insertOne({ text: tweet, author_id: auth.user!.id });
      onAdded && onAdded();
      setTweet("");
      setTouched(false);
    } catch (error) {
      console.error(error); 
    }
  }

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <TArea
        className="bordered"
        placeholder="What's happening?"
        value={tweet}
        setValue={setTweet}
        error={tweetError}
        touched={touched}
        onBlur={() => setTouched(true)}
      />
      <div className="tweet-form__footer">
        <TButton
          className="bordered"
          type="submit"
        >
          Tweet
        </TButton>
      </div>
    </form>
  );
}
