import { useAuth } from '../../contexts/auth';
import { getAbbr } from '../../utils/user';
import AppLogo from '../icons/AppLogo';
import './MainHeader.css';

export default function MainHeader() {
  const auth = useAuth();
  const abbr = getAbbr(auth.user!.name);
  return (
    <header className="main-header">
      <div className="main-header__row">
        <div className="header-logo">
          <AppLogo />
          <span>Another Twitter Clone</span>
        </div>
        <div className="header-user">
          <span>{auth.user!.name}</span>
          <div className="header-user__icon">
            {abbr}
          </div>
        </div>
      </div>
    </header>
  );
};
