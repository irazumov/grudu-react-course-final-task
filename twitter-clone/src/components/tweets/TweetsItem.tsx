import './TweetsItem.css';

export interface ITweetsItemProps {
  tweet: string;
  user: {
    name: string;
    abbr: string;
  }
}

export default function TweetsItem(props: ITweetsItemProps) {
  const { tweet, user } = props;
  return (
    <div className="tweets-item">
      <div className="tweets-item__row">
        <div className="tweets-item__user">
          <div className="tweets-item__user-avatar">
            {user.abbr}
          </div>
        </div>
        <div className="tweets-item__tweet">
          <div className="tweets-item__tweet-name">{user.name}</div>
          <div className="tweets-item__tweet-content" dangerouslySetInnerHTML={{ __html: tweet }}></div>
        </div>
      </div>
    </div>
  );
}
