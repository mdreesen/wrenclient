import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { QUERY_ADMIN } from '../../utils/queries';

// import components
import NavbarWorker from '../../components/NavbarWorker';
import AssociatedUserList from '../../components/AdminUser';

function AdminHome() {

    const { data: viewAdmin } = useQuery(QUERY_ADMIN);
    console.log('worker data', viewAdmin);

    return(
        <div>
            <NavbarWorker />
            {viewAdmin && Auth.loggedIn() ? (
                <>
                <p>This is the worker page</p>
                {/* <AssociatedUserList/> */}
                </>
            ) : (
                <h5>Please log in to to be a part of our community!</h5>
            )}
        </div>
    );
}

export default AdminHome;