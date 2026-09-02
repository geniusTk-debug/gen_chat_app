import { useAuthContext } from '../Hooks/useAuthContext.jsx';
import Layout from '../Pages/layout.jsx';
import Welcome from '../Pages/welcome.jsx';

export default function Home() {
  
  const { isAuthenticated } = useAuthContext()
        
if(isAuthenticated) {
  return (
    <Layout />
  )
} else if(!isAuthenticated) {
  return(
    <Welcome />
  )
} else {
  return (
    <Welcome />
  )
}

  // return (
  //   <>
  //   {isAuthenticated
  //   ?
  //   (<Layout />)
  //   :
  //   (<Welcome />)}
  //   </>    


  // )
};


