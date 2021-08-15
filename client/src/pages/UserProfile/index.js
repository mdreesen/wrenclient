import React from 'react';
import Auth from '../../utils/auth';
import NavbarUser from '../../components/NavbarUser';
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
    // console.log(user.feelings.feelingText)

    if (loading) {
        return <div>Loading BirthWorker's Profile</div>
    }

    const noFeelingText = user?.feelings.map((feeling, index) => {
        return (
            <div key={`each-card-${feeling?._id}`} className="card box-shadow-back" style={{width: '18rem'}}>
            <div className="card-body">
                <p className="card-text">{feeling?.feelingText}</p>
            </div>
        </div>
        )
    })

    console.log(noFeelingText)

    return (
        <div>
            <NavbarUser />
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
                            {noFeelingText ? (
                                <p>{user.feelings.feelingText}</p>
                            ) : (
                                <p>User has not shared how they feel yet</p>
                            )}
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