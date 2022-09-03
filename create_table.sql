CREATE TABLE auth_user (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(25) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
nama VARCHAR(50),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

CREATE TABLE d_blog_post(
id INT NOT NULL AUTO_INCREMENT,
user_id VARCHAR(25),
post TEXT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES auth_user(username) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE d_blog_comment(
id INT NOT NULL AUTO_INCREMENT,
user_id VARCHAR(25),
blog_post_id INT,
comm TEXT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES auth_user(username) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (blog_post_id) REFERENCES d_blog_post(id) ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE d_blog_post ADD COLUMN title TEXT NULL AFTER user_id;
