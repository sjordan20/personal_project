SELECT * FROM users_groups g
JOIN users_groups ug ON g.group_id = ug.group_id
WHERE ug.user_id = $1