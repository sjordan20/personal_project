SELECT u.username, p.post_id, p.content, p.photo, p.date, p.user_id FROM post p
JOIN users u on p.user_id = u.user_id
WHERE p.date = $1 and p.group_id = $2