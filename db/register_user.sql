INSERT INTO users (
    username,
    password
) VALUES (
    ${username},
    ${hash}
)

returning user_id, username