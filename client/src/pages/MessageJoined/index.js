import React from 'react';

// Import Navbar
import NavbarUser from '../../components/NavbarUser';
import Chat from '../../components/MessageChat';

const MessageJoined = () => {
    return (
        <div>
            <NavbarUser/>
            <div>You have joined</div>
            {/* <Chat /> */}
        </div>
    );
}

export default MessageJoined;