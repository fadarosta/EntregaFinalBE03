import { Router } from 'express';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';
import { generateMockPets } from '../mocks/pet.mocks.js';
import { generateMockUsers } from '../mocks/user.mocks.js';

const router = Router();

// mascotas mockeadas
router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateMockPets(100);
        res.json(pets);
    } catch (error) {
        res.status(500).json({
            error: 'Error generating mock pets',
            details: error.message
        });
    }
});

// usuarios mockeadas
router.get('/mockingusers', (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: 'Error generating mock users',
            details: error.message
        });
    }
});

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (typeof users !== 'number' || users < 0 || users > 1000) {
            return res.status(400).json({
                error: 'Invalid users parameter',
                message: 'Users must be a number between 0 and 1000'
            });
        }

        if (typeof pets !== 'number' || pets < 0 || pets > 1000) {
            return res.status(400).json({
                error: 'Invalid pets parameter',
                message: 'Pets must be a number between 0 and 1000'
            });
        }

        const results = {};
        if (users > 0) {
            const mockUsers = generateMockUsers(users);
            const insertedUsers = await User.insertMany(mockUsers);
            results.users = {
                inserted: insertedUsers.length,
                sampleEmails: insertedUsers.slice(0, 3).map(u => u.email)
            };
        } else {
            results.users = { inserted: 0 };
        }

        if (pets > 0) {
            const mockPets = generateMockPets(pets);
            const insertedPets = await Pet.insertMany(mockPets);
            results.pets = {
                inserted: insertedPets.length,
                sampleNames: insertedPets.slice(0, 3).map(p => p.name)
            };
        } else {
            results.pets = { inserted: 0 };
        }

        res.status(201).json({
            message: 'Mock data generated and inserted successfully',
            results: results
        });

    } catch (error) {
        console.error('Error in generateData:', error);
        
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(409).json({
                error: 'Duplicate key error',
                message: 'Some generated data conflicts with existing records'
            });
        }

        res.status(500).json({
            error: 'Error generating and inserting mock data',
            details: error.message
        });
    }
});

export default router;