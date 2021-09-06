import React from 'react';

// Import Navbar
import NavbarUser from '../../components/NavbarUser';
import Chat from '../../components/MessageChat';

const MessageChat = () => {
    return (
        <div>
            <NavbarUser/>
            <Chat />
        </div>
    );
}

export default MessageChat;