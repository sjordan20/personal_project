import React from 'react';

function UserPost(props) {
    return (
        <div>

            {props.content}
            <button
                onClick={props.toggleEdit}
            >edit</button>
            <button
                onClick={() => {
                    props.deletePost(props.id)
                }}
            >
                delete
            </button>

        </div >
    );
}

export default UserPost;