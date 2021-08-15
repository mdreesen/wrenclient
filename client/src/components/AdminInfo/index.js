import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ADMIN } from '../../utils/queries';
import Auth from '../../utils/auth';

function AdminInfo() {
    
    const { data: adminData } = useQuery(QUERY_ADMIN);

    console.log('admin data', adminData?.viewAdmin)

    const loggedIn = Auth.loggedIn();

    return(
        <div>
        {loggedIn && adminData ? (
            <>
                <h1>{adminData?.viewAdmin?.username}</h1>
                <div className="radio-btn-container">
                <p>{`Email: ${adminData?.viewAdmin?.email}`}</p>

                <div className="form-check">

                </div>
                <div className="form-check">

                </div>
            </div>
        </>
        ) : (
            <>
            <h5>Please log in to to be a part of our community!</h5>
            </>
        )}
      </div>
    );
}

export default AdminInfo;