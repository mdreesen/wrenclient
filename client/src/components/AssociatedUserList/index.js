import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../../utils/queries';

    const AssociatedUserList = () => {

        // const { data: usersAdmins } = useQuery(QUERY_USERS);

        // console.log(userData)

        const { loading, data } = useQuery(QUERY_USERS);

        console.log('this is the users data', data)

        // console.log(data.users)
        // console.log(data.users.map(user => user.email))

        // function allUsersHandler() {
        //     var allUsers = () => data.users.map(user => user.email)
        //     if (allUsers !== undefined) {
        //         return allUsers
        //     } else {
        //         return [];
        //     }
        // }


        // if (loading) {
        //     return (
        //         <div>Loading Data...</div>
        //     );
        // }


        // if (!allUsersHandler || !allUsersHandler.length) {
        //   return (
        //     <div className="card mood-card box-shadow-back" style={{width: '18rem'}}>
        //     <div className="card-body">
        //         <p>No Associated Users</p>
        //     </div>
        // </div> 
        //   )
        // }

    return (
        <div className="card mood-card box-shadow-back" style={{width: '18rem'}}>
            <div className="card-header">
                {/* Your {usersAdmins} {usersAdmins === 1 ? 'associated user' : 'associated users'} */}
            </div>
            <ul className="list-group list-group-flush">
            {/* {usersAdmins.map(user => (
                    <li key={user._id}>
                        <h6 className="associated-birthworker-name">{user.username}</h6>
                        <Link to={`/profile/birthworker/${user.username}`} className="btn btn-primary associated-midwife-btn">View Profile</Link>
                    </li>
                ))} */}
            </ul>
        </div> 
    );
}

export default AssociatedUserList;
