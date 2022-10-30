const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean()
  if (!notes?.length) {
    return res.status(400).json({ message: 'No notes found' })
  }
  res.json(notes)
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { username } = req.body

  // Confirm data
  if (!username) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Create and store new note
  const note = await Note.create(noteObject)

  if (note) {
    res.status(201).json({ message:`New note created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received'})
  }
})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { username, id } = req.body

  // Confirm data
  if (!id || !username) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not found' })
  }

  user.username = username

  const updatedNote = await note.save()

  res.json({ message: `${updatedNote.id} updated` })
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Note ID required' })
  }

  const note = await Note.findOne({ user: id }).lean().exec()
  if (note) {
    return res.status(400).json({ message: 'User has notes assigned' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const result = await note.deleteOne()

  const reply = `Note with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote
}