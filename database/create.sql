CREATE TABLE users (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    phone VARCHAR(20),
    is_admin BOOLEAN NOT NULL,
    created_on DATETIME NOT NULL,
    modified_on DATETIME NOT NULL
);

CREATE TABLE medicine (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    stock TINYINT NOT NULL
);

CREATE TABLE symptom (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE medicine_symptom (
    medicine_id TINYINT NOT NULL,
    symptom_id TINYINT NOT NULL,
    PRIMARY KEY (medicine_id, symptom_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id),
    FOREIGN KEY (symptom_id) REFERENCES symptom(id)
);

CREATE TABLE orders (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    ship_from VARCHAR(255) NOT NULL,
    ship_to VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    created_on DATETIME NOT NULL,
    modified_on DATETIME NOT NULL,
    user_id TINYINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    order_id TINYINT NOT NULL,
    medicine_id TINYINT NOT NULL,
    quantity TINYINT NOT NULL,
    PRIMARY KEY (order_id, medicine_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id)
);

