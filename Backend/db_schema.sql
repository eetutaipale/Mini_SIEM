CREATE TABLE customers (
    id            SERIAL PRIMARY KEY,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name          TEXT,
    created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
    id           SERIAL PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(id),
    source_ip    TEXT NOT NULL,
    path         TEXT,
    method       TEXT,
    status_code  INTEGER,
    event_type   TEXT,
    occurred_at  TIMESTAMP NOT NULL
);
CREATE INDEX idx_events_customer_time ON events (customer_id, occurred_at);

CREATE TABLE rules (
    id             SERIAL PRIMARY KEY,
    customer_id    INTEGER NOT NULL REFERENCES customers(id),
    name           TEXT NOT NULL,
    threshold      INTEGER NOT NULL,
    window_seconds INTEGER NOT NULL,
    severity       TEXT,
    enabled        BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE alerts (
    id          SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    source_ip   TEXT,
    severity    TEXT,
    status      TEXT NOT NULL DEFAULT 'open',
    summary     TEXT,
    first_seen  TIMESTAMP NOT NULL,
    last_seen   TIMESTAMP NOT NULL
);

CREATE TABLE blocklist (
    id          SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    ip_address  TEXT NOT NULL,
    added_at    TIMESTAMP DEFAULT NOW()
);