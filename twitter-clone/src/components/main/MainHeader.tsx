import AppLogo from '../icons/AppLogo';
import './MainHeader.css';

export default function MainHeader() {
  return (
    <header className="main-header">
      <div className="main-header__row">
        <div className="header-logo">
          <AppLogo />
          <span>Another Twitter Clone</span>
        </div>
        <div className="header-user">
          <span>John Smith</span>
          <div className="header-user__icon">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};
