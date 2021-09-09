module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/datas', notes.create);

    // Retrieve all Notes
    app.get('/datas', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/datas/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/datas/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/datas/:noteId', notes.delete);
}