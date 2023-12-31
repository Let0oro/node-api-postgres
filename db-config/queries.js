const Pool = require('pg').Pool;


const dataconnection = {
    user: 'root',
    host: 'localhost',
    database: 'api', 
    password: 'password',
    port: 5432,
};

const pool = new Pool(dataconnection);

// GET all users

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err;
        }
        response.status(200).json(results.rows)
    })
};


// GET a single User by ID

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).json(results.rows);
    })
};


// POST a new user

const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send(`User added with ID ${results.rows[0].id}`)
    })
};

// PUT updated data in an existing user

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query('UPDATE USERS SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, results) => {
        if (err) {
            throw err;
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
};


// DELETE an user

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    })
};

module.exports = {
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
}