import { useContext } from 'react';

import NavigationButton from '../button/NavigationButton';
import { CurrentContext } from '../Layout';

const GlobalNavigation = () => {
  const currentPage = useContext(CurrentContext);
  return (
    <>
      <NavigationButton type="Home" currentPage={currentPage} />
      <NavigationButton type="About" currentPage={currentPage} />
      <NavigationButton type="Works" currentPage={currentPage} />
      <NavigationButton type="GitHub" currentPage={currentPage} />
      <NavigationButton type="Contact" currentPage={currentPage} />
    </>
  );
};

export default GlobalNavigation;
