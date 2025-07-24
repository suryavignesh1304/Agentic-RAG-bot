CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password BYTEA NOT NULL
);
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id),
    query TEXT NOT NULL,
    answer TEXT NOT NULL,
    sources TEXT[] NOT NULL,
    timestamp TIMESTAMP NOT NULL
);