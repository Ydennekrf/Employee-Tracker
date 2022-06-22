
const cTable= require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

let departmentArr = ['Data Engineering', 'Web Developers', 'Financial', 'Sales', 'Managment'];
let employeeList;



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
    db.query('select departmentId, departmentName from department;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

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

const roles = () => {
    db.query(`select roleId, departmentName, title, salary from rol
                join department on rol.departmentId = department.departmentId;`, (err, res) => {
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
            departmentArr = departmentArr.push(response.newDepartment);
            console.log(`new department added : ` + response.newDepartment);
            init();
        })
    })
};

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
        console.log(response.newRole)
        let index = departmentArr.indexOf(response.selectDepartment);
        let deptId = index + 1;
        db.query(`insert into rol (title , salary, departmentId) values ('${response.newRole}', '${response.roleSalary}', '${deptId}')`, (err, res) => {
            console.log('hello')
            if (err) throw err;
            console.log(`new role added : ` + response.newRole);
            init();
        } )
    })
};

const addEmployee = () => {

    db.query(`select id,firstName,lastName,title,salary,departmentName,departmentManager from employees 
    join rol on employees.roleId = rol.roleId
    join department on employees.managerId = department.departmentId;`, 
    (err, res) => {
if (err) throw err;

inquirer.prompt([
    {
        name: 'selectDepartment',
        type: 'list',
        message: 'Assign new employee a department.',
        choices: departmentArr
    },
    {
        name: 'selectRole',
        type: 'list',
        message: 'Assign new employee a role.',
        choices: ,
    }
])

})
 
};

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

const quit = () => {
    process.exit();
};


