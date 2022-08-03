import { useState } from 'react';
import { useValidationable } from '../../hooks/validationable';
import validators from './validators';
import './TweetForm.css';
import TArea from '../ui/TArea';
import TButton from '../ui/TButton';

export default function TweetForm() {
  const [tweet, setTweet, tweetError] = useValidationable<string>("", validators.tweet);
  const [touched, setTouched] = useState<boolean>(false);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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