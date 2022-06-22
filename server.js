
const cTable= require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// global variables
let employeeList;
let departmentArr =["Data engineering", "Web Developers", "Financial", "sales", "Management"];

//conection to the sql database
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
//init function brings up the main menu with list of options
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
// shows all departments
const departments = () => {
    db.query('select departmentId, departmentName from department;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};
// shows all employees with their name title salary dept name and manager
const employees = () => {
    db.query(`select id,firstName,lastName,title,salary,departmentName,departmentManager from employees 
                join rol on employees.roleId = rol.roleId
                join department on employees.managerId = department.departmentId;`, 
                (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};
// shows all the roles with dept name title and salary
const roles = () => {
    db.query(`select roleId, departmentName, title, salary from rol
                join department on rol.departmentId = department.departmentId;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};
// adds a department into the database
const addDepartment = () => {
    db.query(`select id,firstName,lastName,title,salary,departmentName,departmentManager from employees 
    join rol on employees.roleId = rol.roleId
    join department on employees.managerId = department.departmentId;`, function (err, res) {
        if (err) throw err;
         employeeList = res.map(employees => {
            return `${employees.firstName} ${employees.lastName}`})
        inquirer.prompt([
                {
                    name: 'newDepartment',
                    type: 'input',
                    message: 'Enter the name of the department you would like to add.'
                },
                {
                    name: 'newManager',
                    type: 'list',
                    message: 'Who is the department manager',
                    choices: employeeList,
                }
            ])
            .then((response) => {
                db.query(`insert into department (departmentName, departmentManager) values ('${response.newDepartment}','${response.newManager}' )`, (err, res) => {
                    if (err) throw err;
                    departmentArr = departmentArr.push(response.newDepartment);
                    console.log(`new department added : ` + response.newDepartment);
                    init();
                })
            })
        })};

// adds a role into the database
const addRole = () => {
    
    inquirer.prompt([
        {
            name: 'selectDepartment',
            type: 'list',
            message: 'Which department would you like to add a role to?',
            choices: departmentArr,
        },
        {
            name:'newRole',
            type: 'input',
            message: 'What is the title of the new role?'
        },
        {
            name:'roleSalary',
            type:'input',
            message: 'What is the salary for this role?',
        }

    ])
    .then((response) => {
        let index = departmentArr.indexOf(response.selectDepartment);
        let deptId = index + 1;
        db.query(`insert into rol (title , salary, departmentId) values ('${response.newRole}', '${response.roleSalary}', '${deptId}')`, (err, res) => {
            if (err) throw err;
            console.log(`new role added : ` + response.newRole);
            init();
        } )
    })
};
// adds a new employee to the data base
const addEmployee = () => {

    db.query(`select title, departmentId from rol`, 
    (err, res) => {
if (err) throw err;
roleList = res.map(rol => {
    return `${rol.title} ${rol.departmentId}`
 })
inquirer.prompt([
    {
        name: 'newFirst',
        type: 'input',
        message: 'input first name.',
    },
    {
        name: 'newLast',
        type: 'input',
        message: 'input last name.',
    },
    {
        name: 'selectRole',
        type: 'list',
        message: 'Assign new employee a role.',
        choices: roleList,
    }
])
    .then((response) => {
        //helper functions to manipulate the data i know there is an easier way to do this but ive run out of time
        let deptHelp = response.selectRole;
        let deptHelpArr = deptHelp.split(" ");
        let newdeptId = deptHelpArr.reverse();
        let index = roleList.indexOf(response.selectRole);
        let roleId = index + 1;
        db.query(`insert into employees (firstName, lastName, roleId, managerId) values('${response.newFirst}', '${response.newLast}' , '${roleId}', '${newdeptId[0]}')`);
        console.log(`${response.newFirst} ${response.newLast} was added as an employee with a role of ${response.selectRole}`);
        init();
    })

})
 
};
// updates an employees role
const employeeRole = () => {
    
    db.query(`select id,firstName,lastName,title,salary,departmentName,departmentManager from employees 
    join rol on employees.roleId = rol.roleId
    join department on employees.managerId = department.departmentId;`, function (err, res) {
        if (err) throw err;
         roleList = res.map(employees => {
            return `${employees.title} ${employees.id}`
         })
         employeeList = res.map(employees => {
            return `${employees.firstName} ${employees.lastName}`
        }) 
        console.log(roleList)
        inquirer.prompt([
      
            {
                name: 'employeeSelect',
                type: 'list',
                message: 'Which employee is changing roles',
                choices: employeeList
            },
            {
                name: 'roleSelect',
                type:'list',
                message: 'which role will they be changed to?',
                choices: roleList
            }
        ])
        .then((response) => {
           // helper functions to manipulate the response data i know there is an easier way to do this but i've run out of time. 
            let name = response.employeeSelect;
            let nameArr = name.split(" ");
            let first = nameArr[0];
            let last = nameArr[1];
            let roleHelp = response.roleSelect;
            let roleHelpArr = roleHelp.split(" ");
            let newRoleId = roleHelpArr.reverse();
            
            
            db.query(`update employees set roleId ='${newRoleId[0]}' where firstName = '${first}'  and lastName = '${last}'`, (err, res) => {
                if (err) throw err;
                console.log(`${response.employeeSelect}'s role was successfully changed.`);
                init();
            } )
        })
    })
    
 
};
// quits the program
const quit = () => {
    console.log('goodbye');
    process.exit();
};


