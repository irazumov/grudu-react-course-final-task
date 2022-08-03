import './IndexRoute.css';
import MainContent from "../components/main/MainContent";
import MainHeader from "../components/main/MainHeader";

export default function IndexRoute() {
  return (
    <div className="page">
      <MainHeader />
      <MainContent />
    </div>
  );
}