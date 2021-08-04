import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../../utils/queries';

    const AssociatedUserList = ({ userCount }) => {

        const { data: usersAdmins } = useQuery(QUERY_USERS);
        console.log('Workers Users', usersAdmins);

        if (!usersAdmins || !usersAdmins.length) {
          return (
            <div className="card mood-card box-shadow-back" style={{width: '18rem'}}>
            <div className="card-body">
                <p>No Associated Users</p>
            </div>
        </div> 
          )
        }

    return (
        <div className="card mood-card box-shadow-back" style={{width: '18rem'}}>
            <div className="card-header">
                Your {usersAdmins} {usersAdmins === 1 ? 'associated user' : 'associated users'}
            </div>
            <ul className="list-group list-group-flush">
            {usersAdmins.map(user => (
                    <li key={user._id}>
                        <h6 className="associated-birthworker-name">{user.username}</h6>
                        <Link to={`/profile/birthworker/${user.username}`} className="btn btn-primary associated-midwife-btn">View Profile</Link>
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default AssociatedUserList;
