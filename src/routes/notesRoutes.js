import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllNotesSchema, getAllNotes);
router.get('/:noteId', authenticate, noteIdSchema, getNoteById);
router.post('/', authenticate, createNoteSchema, createNote);
router.patch('/:noteId', authenticate, updateNoteSchema, updateNote);
router.delete('/:noteId', authenticate, noteIdSchema, deleteNote);

export default router;
