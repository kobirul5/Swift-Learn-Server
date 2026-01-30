import express from 'express';
import { InstructorController } from './instructor.controller';
import { checkAuth } from '../../middlewares/auth.middleware';
import { fileUploader } from '../../../helpers/fileUploader';

const router = express.Router();

// Public routes
router.get('/', InstructorController.getAllInstructors);
router.get('/:id', InstructorController.getSingleInstructor);

// Admin only routes
router.post(
  '/',
  checkAuth('admin'),
  fileUploader.uploadFile,
  InstructorController.createInstructor
);

router.patch(
  '/:id',
  checkAuth('admin'),
  fileUploader.uploadFile,
  InstructorController.updateInstructor
);

router.delete('/:id', checkAuth('admin'), InstructorController.deleteInstructor);

export const InstructorRoutes = router;
