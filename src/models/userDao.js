const { dataSource } = require('./daoUtil');

const errorHandler = () => {
    const error = new Error('INVALID_DATA_INOUT');
    error.statusCode = 500;
    throw error;
}

const createUser = async ( name, email, password, profileImage) => {
    try{
        return await dataSource.query(
            `INSERT INTO users (
                name,
                email,
                password,
                profile_image
            ) VALUES (?, ?, ?, ?);`,
            [name, email, password, profileImage]
        );
    } catch (err) {
        errorHandler();
    }
}

const search = async () => {
    try {
        return await dataSource.query(`
        SELECT
            u.id,
            u.name,
            u.email,
            u.profile_image,
            u.created_at
        FROM users u 
        `);
    } catch (err) {
        errorHandler();
    }
}

const userCheck = async (userId) => {
    try {
        const [result] = await dataSource.query(`
        SELECT EXISTS
        (SELECT id FROM users
        WHERE id = ${userId}) AS result;
        `
        );
        return result;
    } catch (err) {
        errorHandler();
    }
}

const passwordCheck = async(email) => {
    try {
        const [password] = await dataSource.query(`
        SELECT
            password
        FROM users
        WHERE email = "${email}";
        `);
        return password;
    } catch (err) {
        errorHandler();
    }
}

const findUserId = async(email) => {
    try{
        const [id] =  await dataSource.query(`
        SELECT 
            id
        FROM users
        WHERE email = "${email}";
        `);
        return id;
    } catch (err) {
        errorHandler();
    }
}

const emailCheck = async(email) => {
    try{
        const [result] = await dataSource.query(`
        SELECT EXISTS
            (SELECT * FROM users
                WHERE email = "${email}") AS result;
        `)
        return result;
    } catch (err) {
        errorHandler();
    }
}

module.exports = {
    createUser,
    search,
    userCheck,
    passwordCheck,
    findUserId,
    emailCheck
}