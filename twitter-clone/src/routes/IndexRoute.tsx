import './IndexRoute.css';
import MainContent from "../components/main/MainContent";
import MainHeader from "../components/main/MainHeader";
import TweetsProvider from '../components/tweets/TweetsProvider';

export default function IndexRoute() {
  return (
    <div className="page">
      <MainHeader />
      <TweetsProvider>
        <MainContent />
      </TweetsProvider>
    </div>
  );
}