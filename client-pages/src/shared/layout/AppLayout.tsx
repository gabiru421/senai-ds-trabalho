
import { NavLink } from 'react-router';
import './AppLayout.css';


export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='layout-base'>
      <div className='layout-header'>
        <NavLink to='/'>
          Página inicial
        </NavLink>
        <NavLink to='/sobre'>
          Sobre
        </NavLink>
      </div>

      <div className='layout-content'>
        {children}
      </div>
    </div>
  );
}
