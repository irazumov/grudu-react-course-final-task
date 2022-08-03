import './TweetsList.css';

interface ITweetsListProps {
  children: React.ReactNode;
}

export default function TweetsList({ children }: ITweetsListProps) {
  return (
    <div className="tweets-list">
      {children}
    </div>
  );
}
