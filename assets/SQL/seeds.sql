insert into department
    (departmentName)
values
    ("Data engineering"),
    ("Web Developers"),
    ("Financial"),
    ("sales");

insert into rol
    (title, salary, departmentId)
values
    ("Jr. Data Engineer", 65000, 1),
    ("Data Engineer II", 80000, 1),
    ("Sr. Data Engineer", 100000, 1),
    ("Team Lead - Data", 150000, 1),
    ("Jr. Web Developer", 70000, 2),
    ("Web Developer II", 85000, 2),
    ("Sr. Web Developer", 110000, 2),
    ("Team Lead - Web", 140000, 2),
    ("Jr. Accountant", 45000, 3),
    ("Sr. Accountant", 65000, 3),
    ("Account Manager", 120000, 3),
    ("Business Intern", 35000, 4),
    ("Sales Person", 50000, 4),
    ("Sales Lead", 90000, 4);

insert into employee
    (firstName, lastName, roleId, managerId)
values
    ("Guy", "Lafleure", 1, null),
    ("Bobby", "Orr", 2, null),
    ("Jean", "Grey", 3, null),
    ("Will", "Farrell", 4, 1),
    ("Jordan", "Peele", 5, null),
    ("Kate", "McKinnan", 6, null),
    ("Michael", "Che", 7, null),
    ("Tom", "Segura", 8, 2),
    ("Will", "Forte", 9, null),
    ("Opera", "Man", 10, null),
    ("Ricky", "Gervais", 11, 3),
    ("Pam", "Pam", 12, null),
    ("Barny", "Rubble", 13, null),
    ("Fred", "Flintstone", 14, 4);