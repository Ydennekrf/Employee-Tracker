
const table= require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_track'
});

db.connect(err => {
    if (err) throw err;
    console.log(' connected to database employee_track');
    init();
});

const init = () => {
    inquirer.prompt([
        {
            name:"initPrompt",
            type:"list",
  message: `\n -------------------------------------------------- \n
            \n -----           Employee  Manager            ----- \n
            \n --------------------------------------------------\n`,
choices: ['view all departments',
        'view all roles',
        'view all employees',
        'add department',
        'add role',
        'add employee',
        'update employee role',
        'quit']
        }
    ])
    .then(response => {
        switch (response.initPrompt) {
            case 'view all departments':
                departments();
                break;
            
            case 'view all employees' :
                employees();
                break;

            case 'view all roles' :
                roles();
                break;

            case 'add department' :
                addDepartment();
                break;

            case 'add role' :
                addRole();
                break;

            case 'add employee' :
                addEmployee();
                break;

            case 'update employee role' :
                employeeRole();
                break;

            case 'quit' :
                quit();
                break;
        }
    })
};

const departments = () => {
    db.query('select * from department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const employees = () => {
    db.query('select * from employees', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const roles = () => {
    db.query('select * from rol', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Enter the name of the department you would like to add.'
        }
    ])
    .then((response) => {
        db.query('insert into department (departmentName) values (?)', response.newDepartment, (err, res) => {
            if (err) throw err;
            console.log(`new department added : ` + response.newDepartment);
            init();
        })
    })
};

const addRole = () => {

};

const addEmployee = () => {

};

const employeeRole = () => {

};

const quit = () => {

};


