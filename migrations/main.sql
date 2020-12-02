/* --------------------------------------------------------------------
*
* WORKS ON POSTGRES ONLY !
*
--------------------------------------------------------------------*/


/* --------------------------------------------------------------------
*
* TABLE users
*
--------------------------------------------------------------------*/
CREATE TABLE IF NOT EXISTS users(
    id  SERIAL PRIMARY KEY
);
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(128);
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS provider VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at DATE DEFAULT CURRENT_DATE;


/* --------------------------------------------------------------------
*
* TABLE repositories
*
--------------------------------------------------------------------*/
CREATE TABLE IF NOT EXISTS repositories(
    id  SERIAL PRIMARY KEY
);

ALTER TABLE repositories ADD COLUMN IF NOT EXISTS url VARCHAR(128);
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS name VARCHAR(128);
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS content TEXT;

ALTER TABLE repositories ADD COLUMN IF NOT EXISTS user_id INT NOT NULL;
ALTER TABLE repositories DROP CONSTRAINT IF EXISTS user_id;
ALTER TABLE repositories ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE repositories ADD COLUMN IF NOT EXISTS created_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE repositories ADD COLUMN IF NOT EXISTS updated_at DATE DEFAULT CURRENT_DATE;

/* --------------------------------------------------------------------
*
* TABLE smart_contracts
*
--------------------------------------------------------------------*/
CREATE TABLE IF NOT EXISTS smart_contracts(
    id  SERIAL PRIMARY KEY
);

ALTER TABLE smart_contracts ADD COLUMN IF NOT EXISTS repository_id INT NOT NULL;
ALTER TABLE smart_contracts DROP CONSTRAINT IF EXISTS repository_id;
ALTER TABLE smart_contracts ADD CONSTRAINT repository_id FOREIGN KEY (repository_id) REFERENCES repositories (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE smart_contracts ADD COLUMN IF NOT EXISTS user_id INT NOT NULL;
ALTER TABLE smart_contracts DROP CONSTRAINT IF EXISTS user_id;
ALTER TABLE smart_contracts ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE smart_contracts ADD COLUMN IF NOT EXISTS created_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE smart_contracts ADD COLUMN IF NOT EXISTS updated_at DATE DEFAULT CURRENT_DATE;