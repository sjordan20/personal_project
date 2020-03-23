import React from 'react';

function UserPost(props) {
    return (
        <div className='body'>

            <img className="post-photo" src={props.photo} />
            <div className="post-content">

                {props.content}
            </div>

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

            <div className='bumper'></div>

        </div >
    );
}

export default UserPost;