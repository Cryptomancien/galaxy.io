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

ALTER TABLE repositories ADD COLUMN IF NOT EXISTS public_id INTEGER;
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
CREATE TABLE IF NOT EXISTS contracts(
    id  SERIAL PRIMARY KEY
);

ALTER TABLE contracts ADD COLUMN IF NOT EXISTS title VARCHAR(128);
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS file VARCHAR(255);
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS version VARCHAR(10);
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS content TEXT;

ALTER TABLE contracts ADD COLUMN IF NOT EXISTS repository_id INT NOT NULL;
ALTER TABLE contracts DROP CONSTRAINT IF EXISTS repository_id;
ALTER TABLE contracts ADD CONSTRAINT repository_id FOREIGN KEY (repository_id) REFERENCES repositories (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE contracts ADD COLUMN IF NOT EXISTS user_id INT NOT NULL;
ALTER TABLE contracts DROP CONSTRAINT IF EXISTS user_id;
ALTER TABLE contracts ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE contracts ADD COLUMN IF NOT EXISTS created_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS updated_at DATE DEFAULT CURRENT_DATE;