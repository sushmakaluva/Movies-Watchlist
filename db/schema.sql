CREATE DATABASE moviePlannerDB;

USE moviePlannerDB;

CREATE TABLE movies(
    id int NOT NULL AUTO_INCREMENT,
    movie varchar(255) NOT NULL,
    PRIMARY KEY(id)
);
