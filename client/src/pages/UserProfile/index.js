import React from 'react';
import Auth from '../../utils/auth';
import NavbarUser from '../../components/NavbarUser';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';
import { ASSOCIATE_WITH_WORKER } from '../../utils/mutations';

function UserProfile(props) {
    const [associateWithWorker] = useMutation(ASSOCIATE_WITH_WORKER)
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    })

    // aww = "associateWithWorker"
    // const aww = async () => {
    //     try {
    //         await associateWithWorker({
    //             variables: {id: birthworker._id}
    //         })
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    // console.log(data)

    const user = data?.user || {};


    if(loading) {
        return <div>Loading BirthWorker's Profile</div>
    }

    return(
        <div>
        <NavbarUser />
        {Auth.loggedIn() ? (
            <div>
            <h3>Viewing {user.username}'s Profile</h3>
            <div>
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
                <p>{user.email}</p>

                {/* <button onClick={aww}>Add Worker</button> */}
            </div>
            </div>
        ) : (
            <h5>Please log in to to be a part of our community!</h5>
        )}

        </div>
    );
}

export default UserProfile; 