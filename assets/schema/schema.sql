
drop table if exists department;
drop table if exists role;
drop table if exists employee;

create table department (
    departmentId int auto_increment primary key,
    departmentName varchar(30)
);

create table role (
    roleId int auto_increment primary key,
    title varchar(30),
    salary decimal,
    departmentId int,
    constraint _department foreign key (departmentId) references department(departmentId) on delete cascade
);

create table employees(
    id int not null auto_increment primary key,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    roleId int,
    managerId int null,
    constraint _role foreign key (role_id) references role(role_id) on delete cascade,
    constraint _manager foreign key (manager_id) references employee(employee_id) on delete set null
);