import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { deleteUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
//Use useDispatch when you want to trigger an action, such as updating state, making an API request, or modifying data in your Redux store.
//useSelector is a hook that allows you to extract data from the Redux store’s state. It accepts a selector function as an argument, and this function is used to specify which part of the state you want to access.

function Users() {
    
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/${id}')
        .then(res=>{
            dispatch(deleteUser({id}))
            console.log(res)})
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success btn-sm'>
                    Add +
                </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>{
                                return(
<tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`}className='btn btn-sm btn-success me-2'>Update</Link>
                                        <button onClick={()=>handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                                )
                                
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
}
export default Users;
