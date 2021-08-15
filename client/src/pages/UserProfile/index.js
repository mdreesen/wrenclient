import React from 'react';
import Auth from '../../utils/auth';
import NavbarWorker from '../../components/NavbarWorker';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERTWO } from '../../utils/queries';

function UserProfile(props) {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_USERTWO, {
        variables: { username: userParam }
    })


    // console.log(data)

    const user = data?.userTwo || {};

    console.log(user)
    console.log(user.feelings)
    console.log(user)

    const allFeelings = user?.feelings?.findIndex(function(feeling, index) {
        console.log(feeling?.feelingText)
        // console.log(index)
    })

    console.log(allFeelings)

    if (loading) {
        return <div>Loading BirthWorker's Profile</div>
    }

    return (
        <div>
            <NavbarWorker />
            {Auth.loggedIn() ? (
                <div>
                    <h3>Viewing {`${user.firstname} ${user.lastname}`}'s Profile</h3>
                    <div>
                        <p>{`Name: ${user.firstname} ${user.lastname}`}</p>
                        <p>{`Email: ${user.email}`}</p>
                        <p>{`Username: ${user.username}`}</p>
                    </div>
                    <div>
                        <h4>Feeling Comments</h4>
                        <div>

                                <p>{allFeelings}</p>


                        </div>
                    </div>
                </div>
            ) : (
                    <h5>Please log in to to be a part of our community!</h5>
                )}

        </div>
    );
}

export default UserProfile; 