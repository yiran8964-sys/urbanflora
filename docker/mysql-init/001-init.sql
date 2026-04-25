CREATE TABLE IF NOT EXISTS plants (
    id BIGINT NOT NULL AUTO_INCREMENT,
    token_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    owner VARCHAR(255) DEFAULT NULL,
    image_url VARCHAR(1024) NOT NULL,
    latitude DOUBLE NOT NULL DEFAULT 0,
    longitude DOUBLE NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS records (
    id BIGINT NOT NULL AUTO_INCREMENT,
    plant_id BIGINT NOT NULL,
    stage VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    image_url VARCHAR(1024) DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_records_plant_id (plant_id),
    CONSTRAINT fk_records_plant_id
        FOREIGN KEY (plant_id) REFERENCES plants (id)
        ON DELETE CASCADE
);
