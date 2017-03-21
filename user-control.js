`use strict`

let mongoose = require(`./mongoose`);
let colors = require(`colors`);
let prompt = require(`prompt`);

let userSchema = require(`./models/user`);
let User = mongoose.model(`user`, userSchema);

/**
 * Initialize app
 */
let init = () => {
    prompt.start();
    console.log(``);
    console.log(` Welcome to Portfolio User Control `.bgBlue.white.bold);
    showMenu();
};

/**
 * Show list of actions
 */
let showMenu = () => {
    let promptSchema = {
        properties: {
            action: {
                description: `What would you like to do`,
                pattern: /^([1-4])$/,
                message: `Enter a number from 1 to 4`,
                required: true
            }
        }
    };

    console.log(``);
    console.log(` 1. Add new user`.gray.dim);
    console.log(` 2. Remove user`.gray.dim);
    console.log(` 3. Show list users`.gray.dim);
    console.log(` 4. Exit`.gray.dim);

    prompt.get(promptSchema, (err, result) => {
        if (err) { throw err; }

        console.log(``);
        switch (result.action) {
            case `1`:
            addUser();
            break;

            case `2`:
            removeUser();
            break;

            case `3`:
            listUsers();
            break;

            default:
            process.exit(0);
        }
    });
};

/**
 * Add new user
 */
let addUser = () => {
    let promptSchema = {
        properties: {
            name: {
                description: `Login for new user`,
                pattern: /^[a-zA-Z\_\-]+$/,
                message: `Name must be only letters, underscores, or dashes`,
                required: true   
            },
            password: {
                description: `Password for new user`,
                hidden: true
            }
        }
    };

    console.log(` Add new user`.white.bold);

    prompt.get(promptSchema, (err, result) => {
        if (err) { throw err; }

        let newUser = new User({login: result.name, password: result.password});

        User.findOne({login: result.name}, (err, u) => {
            if (err) { throw err; }

            if (u) {
                console.log(`User already exists`.red.bold);
                showMenu();
            } else {
                newUser.save(err => {
                    if (err) {
                        console.log(`An error occurred while creating a new user`.red.bold);
                        console.log(err);
                        process.exit(1);
                    } else {
                        console.log(`New user successfully added`.green.dim);
                        showMenu();
                    }
                });
            }
        });
    });
};

/**
 * Remove user
 */
let removeUser = () => {
    let promptSchema = {
        properties: {
            name: {
                description: `The login of the user you want to remove`,
                pattern: /^[a-zA-Z\_\-]+$/,
                message: `Name must be only letters, underscores, or dashes`,
                required: true   
            }
        }
    };

    console.log(` Remove user`.white.bold);

    prompt.get(promptSchema, (err, result) => {
        if (err) { throw err; }

        User.findOne({login: result.name}, (err, u) => {
            if (err) { throw err; }

            u.remove(() => {
                console.log(` User "${result.name}" succesfully removed`);
                showMenu();
            });
        });
    });
};

/**
 * Show list users
 */
let listUsers = () => {
    User.find((err, list) => {
        if (err) { throw err; }

        console.log(` List of users:`.white.bold);
        
        if (!list.length) {
            console.log(` Users not found`.gray.dim)
        } else {
            list.forEach((u, i) => {
                console.log(` ${i + 1}. ${u.login}`.gray.dim);
            });
        }

        showMenu();
    });
};

init();
