// Express
import express from 'express';
// Controllers
import { createStudent, updateAnswers } from '../controllers/studentController';

const router = express.Router();

router.post('/', createStudent);

router.put('/', updateAnswers);

export default router;
