import React from 'react';
import './userPost.css'

function UserPost(props) {
    return (
        <div className='body'>
            <div className='post'>
                <img className="post-photo" src={props.photo} />
                <div className="post-content">

                    {props.content}
                </div>


                <div className='edit-delete-container'>
                    <div className='edit-button-container'>
                        <button className='edit-button'
                            onClick={props.toggleEdit}
                        >Edit</button>
                    </div>
                    <div className='delete-button-container'>
                        <button className='delete-button'
                            onClick={() => {
                                props.deletePost(props.id)
                            }}
                        >
                            Delete
            </button>
                    </div>
                </div>


            </div>



            <div className='bumper'></div>

        </div >
    );
}

export default UserPost;