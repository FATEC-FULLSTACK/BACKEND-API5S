const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


// Criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter um usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um usuário por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await userController.updateUserById(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Excluir um usuário por ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await userController.deleteUserById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
