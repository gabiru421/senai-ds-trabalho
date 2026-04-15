import { poolPromise } from "../connections/mssql-db.js"; 

const getAllUser = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM users');
        return result?.recordset || null;

    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const getUserById = async (id) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM users WHERE id = @id');
        return result?.recordset || null;

    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const postUser = async (data) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', data.name)
            .input('last_name', data.last_name)
            .input('age', data.age)
            .query(`INSERT INTO users (name, last_name, age)
                OUTPUT INSERTED.*
                VALUES (@name, @last_name, @age);
                `);
            // .query(`INSERT INTO users (name, last_name, age)
            //     VALUES (@name, @last_name, @age);
            //     SELECT SCOPE_IDENTITY() as id;
            //     `);
        return result?.recordset[0] || null;
        // return result.recordset[0].id || null;

    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const putUser = async (id, data) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .input('name', data.name)
            .input('last_name', data.last_name)
            .input('age', data.age)
            .query(`
                UPDATE users
                SET 
                    name = @name,
                    last_name = @last_name,
                    age = @age
                OUTPUT INSERTED.*
                WHERE id = @id;
            `);

        return result?.recordset[0] || null;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(`DELETE FROM users 
                OUTPUT DELETED.* 
                WHERE id = @id`
            );

        return result?.recordset[0] || null;

    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export default {
    getAllUser,
    getUserById,
    postUser,
    putUser,
    deleteUserById
};