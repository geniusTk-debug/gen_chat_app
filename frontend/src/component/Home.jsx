import { useAuthContext } from '../Hooks/useAuthContext.jsx';
import Layout from '../Pages/layout.jsx';
import Welcome from '../Pages/welcome.jsx';

export default function Home() {
  
  const { isAuthenticated } = useAuthContext()
        
  return (
    <>
    {isAuthenticated
    ?
    (<Layout />)
    :
    (<Welcome />)}
    </>    


  )
};


