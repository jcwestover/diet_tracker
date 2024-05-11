const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

let db = new sqlite3.Database('/Users/Jackson/Desktop/projects/diet_tracker/data/users.db');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function insertUser() {
    rl.question('Enter name: ', (name) => {
        rl.question('Enter age: ', (age) => {
            rl.question('Enter weight: ', (weight) => {
                rl.question('Enter height: ', (height) => {
                    rl.question('Enter gender (0 if female, 1 if male): ', (gender) => {

                        age = parseInt(age);
                        weight = parseFloat(weight);
                        height = parseInt(height);
                        gender = parseInt(gender);

                        db.run('INSERT INTO users (name, age, weight, height, gender) VALUES (?, ?, ?, ?, ?)', [name, age, weight, height, gender], function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log(`User ${name} succesfully inserted`);
                            }

                            rl.question('Would you like to insert another user? (Y/N): ', (answer) => {
                                if (answer.toLowerCase() == 'y'){
                                    insertUser();
                                } else {
                                    db.close();
                                    rl.close();
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

// console.log('test');
insertUser();

db.each('SELECT * FROM users', (err, row) => {
    if (err) {
        console.error(err.message);
    }

    const tdee = tdeeCalc(row.age, row.weight, row.height, row.gender);
})