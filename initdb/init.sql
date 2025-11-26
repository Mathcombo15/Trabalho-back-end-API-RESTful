create table animals (
    id int not null auto_increment,
    name varchar(255),
    primary key (id)
);

create table users (
    id int not null auto_increment,
    name varchar(255),
    password varchar(255),
    primary key (id)
);

insert into users (name, password) values ("usuario@teste", "$2b$10$e2BOdF7sR4o/AlXzCQi.m.CTqWGsyoHw7ca8F/hUn8xAy3L63dsqS");