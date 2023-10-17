import {useQuery} from "@apollo/client"
import Userslist from '../components/UsersList';
import { GET_USERS } from '../components/Queries';


function Users(){

  const {error, data, loading} = useQuery(GET_USERS);
  
  if(loading){
    return <h1 className='loading'>LOADING...</h1>
  }
  if(error){
    console.log(error)
  }
  return(
    <div>
      {data && <Userslist users={data.users}/>} 
    </div>
  );
}
export default Users;