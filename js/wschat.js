import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

const server="ws://"+window.location.hostname+":8090/ws";
const socket = io(server);
const initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
    componentDidMount() {

    }
    
    render() {
        return (
            <Chat {...this.props} socket={socket} />
        );
    }
}

ChatContainer.propTypes = {
    messages: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    return {
      messages: state.messages.data,
    }
}
export default connect(mapStateToProps)(ChatContainer)
