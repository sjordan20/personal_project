CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(250),
    profile_pic VARCHAR(300)

);

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    content VARCHAR(2000),
    photo VARCHAR(300),
    date date,
    user_id INT REFERENCES users(user_id),
    group_id INT REFERENCES groups(group_id)
);

CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    group_pic VARCHAR(300),
    creator_id INT REFERENCES users(user_id)
);

CREATE TABLE users_groups (
    user_id INT REFERENCES users(user_id),
    group_id INT REFERENCES groups(group_id)
)