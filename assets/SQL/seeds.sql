insert into department
    (departmentName, departmentManager)
values
    ("Data engineering", "Will Farrell"),
    ("Web Developers", "Tom Segura"),
    ("Financial", "Ricky Gervais"),
    ("sales", "Fred Flintstone"),
    ("Management", "The Owner");

insert into rol
    (title, salary, departmentId)
values
    ("Jr. Data Engineer", 65000, 1),
    ("Data Engineer II", 80000, 1),
    ("Sr. Data Engineer", 100000, 1),
    ("Team Lead - Data", 150000, 5),
    ("Jr. Web Developer", 70000, 2),
    ("Web Developer II", 85000, 2),
    ("Sr. Web Developer", 110000, 2),
    ("Team Lead - Web", 140000, 5),
    ("Jr. Accountant", 45000, 3),
    ("Sr. Accountant", 65000, 3),
    ("Account Manager", 120000, 5),
    ("Business Intern", 35000, 4),
    ("Sales Person", 50000, 4),
    ("Sales Lead", 90000, 5);

insert into employees
    (firstName, lastName, roleId, managerId)
values
    ("Guy", "Lafleure", 1,1),
    ("Bobby", "Orr", 2, 1),
    ("Jean", "Grey", 3, 1),
    ("Will", "Farrell", 4, 5),
    ("Jordan", "Peele", 5, 2),
    ("Kate", "McKinnan", 6, 2),
    ("Michael", "Che", 7, 2),
    ("Tom", "Segura", 8, 5),
    ("Will", "Forte", 9, 3),
    ("Opera", "Man", 10, 3),
    ("Ricky", "Gervais", 11, 5),
    ("Pam", "Pam", 12, 4),
    ("Barny", "Rubble", 13, 4),
    ("Fred", "Flintstone", 14, 5);