import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_BIRTHWORKERS } from '../../utils/queries';
import Auth from '../../utils/auth';

import AdminInfo from '../../components/AdminInfo';
import NavbarWorker from '../../components/NavbarWorker';

function AdminSettings() {

    return(

        <div>
            <NavbarWorker />
            {Auth.loggedIn() ? (
                <div>
                    <AdminInfo />
                    <div>
                    </div>
                </div>

            ) : (
                <h5>Please log in to to be a part of our community!</h5>
            )}
        </div>
    );
}

export default AdminSettings;