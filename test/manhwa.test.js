const request = require('supertest'); // To simulate HTTP requests
const express = require('express');
const sql = require('mssql');
const app = express();

// Mock the database connection and data
jest.mock('mssql');
sql.query = jest.fn();

// Example endpoint for testing
app.get('/manhwa', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Manhwa');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

describe('GET /manhwa', () => {
    it('should return a list of manhwa', async () => {
        // Mock database response
        sql.query.mockResolvedValue({
            recordset: [
                { id: 1, title: 'Manhwa1', genre: 'Fantasy', description: 'Great!', image_url: 'image1.jpg' },
                { id: 2, title: 'Manhwa2', genre: 'Action', description: 'Amazing!', image_url: 'image2.jpg' },
            ],
        });

        const response = await request(app).get('/manhwa');

        // Assert response status and data
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, title: 'Manhwa1', genre: 'Fantasy', description: 'Great!', image_url: 'image1.jpg' },
            { id: 2, title: 'Manhwa2', genre: 'Action', description: 'Amazing!', image_url: 'image2.jpg' },
        ]);
    });

    it('should handle errors gracefully', async () => {
        // Mock database error
        sql.query.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/manhwa');

        // Assert response status and message
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error fetching data');
    });
});
