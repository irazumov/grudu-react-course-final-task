import { useAuth } from '../../contexts/auth';
import AppLogo from '../icons/AppLogo';
import './MainHeader.css';

export default function MainHeader() {
  const auth = useAuth();
  const abbr = auth.user?.name?.split(' ').map(i => i[0].toUpperCase()).join('') || 'N/A';
  return (
    <header className="main-header">
      <div className="main-header__row">
        <div className="header-logo">
          <AppLogo />
          <span>Another Twitter Clone</span>
        </div>
        <div className="header-user">
          <span>{auth.user?.name}</span>
          <div className="header-user__icon">
            {abbr}
          </div>
        </div>
      </div>
    </header>
  );
};
