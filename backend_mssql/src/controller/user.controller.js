import service from '../services/user.service.js'

const getAllUser = async (req, res) => {
    try {
        const result = await service.getAllUser();
        console.log(`getAllUser`)

        res.status(200).json({
            success: true,
            code: 200,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`getUserById ${id}`)
        const result = await service.getUserById(id);
            res.status(200).json({
            success: true,
            code: 200,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    };
};

const postUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await service.postUser(data);
        console.log(`postUser ${JSON.stringify(result)}`)

        res.status(201).json({
            success: true,
            code: 201,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    }
};

const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await service.putUser(id, data);
        console.log(`putUser ${JSON.stringify(result)}`)

        res.status(200).json({
            success: true,
            code: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`deleteUserById ${id}`)
        const result = await service.deleteUserById(id)

            if (result === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Usuário não encontrado"
            });
        }
        
            res.status(200).json({
            success: true,
            code: 200,
            message: "Usuário deletado com sucesso"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    };
}

export default {
    getAllUser,
    getUserById,
    postUser,
    putUser,
    deleteUserById
};
