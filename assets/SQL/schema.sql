
drop table if exists department;
drop table if exists rol;
drop table if exists employees;

create table department (
    departmentId int auto_increment primary key,
    departmentName varchar(30),
    departmentManager varchar(30)
);

create table rol (
    roleId int auto_increment primary key,
    title varchar(30),
    salary decimal,
    departmentId int,
    constraint fk_department foreign key (departmentId) references department(departmentId) on delete cascade
);

create table employees(
    id int not null auto_increment primary key,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    roleId int,
    managerId int null,
    constraint fk_role foreign key (roleId) references rol(roleId) on delete cascade
);
