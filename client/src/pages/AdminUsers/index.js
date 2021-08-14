import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS  } from '../../utils/queries';
import Auth from '../../utils/auth';
import AdminUser from '../../components/AdminUser';
import NavbarWorker from '../../components/NavbarWorker';

function AdminUsers() {

    // getting the data from the query
    const { loading, data } = useQuery(QUERY_USERS);
    console.log({ data })

    // if no users then bring back an empty array
    const users = data?.users || [];

    if (loading) {
        return <div>Loading users</div>
    }

    if (!users) {
        return <div>No Users Yet</div>
    }

    return(

        <div>
            <NavbarWorker />
            {Auth.loggedIn() ? (
                <div>
                    <div className="row-container">
                        <div className='row'>
                            <>
                                <AdminUser userCard={users} />
                            </>
                        </div>
                    </div>
                </div>

            ) : (
                <h5>Please log in to to be a part of our community!</h5>
            )}
        </div>
    );
}

export default AdminUsers;