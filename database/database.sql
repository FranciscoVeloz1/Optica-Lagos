
create database optica;
use optica;

create table user(
    id_user int primary key auto_increment,
    user varchar(50),
    fullname varchar(50),
    email varchar(50),
    password varchar(250),
    role varchar(50)
);