SELECT u.username, p.post_id, p.content, p.photo, p.date, p.user_id, p.group_id FROM post p
JOIN users u on p.user_id = u.user_id
WHERE p.group_id = $1