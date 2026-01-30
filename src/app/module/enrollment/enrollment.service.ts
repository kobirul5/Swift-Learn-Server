/* eslint-disable @typescript-eslint/no-explicit-any */

import { Enrollment } from './enrollment.model';
import { Course } from '../course/course.model';
import { ApiError } from '../../utils/ApiError';
import stripe from '../../../shared/stripe';
import { Payment } from '../payment/payment.model';
import mongoose from 'mongoose';

const getAllEnrollmentService = async () => {
  return await Enrollment.find();
};

const createEnrollmentService = async (payload: any) => {
  const courseId = payload.data.course;
  const userId = payload.userId;

  // const existsEnrolment = await Enrollment.findOne({ course: courseId, student: userId });

  // if (existsEnrolment) {
  //   throw new ApiError(400, 'You are already enrolled in this course');
  
  // }

  if (!userId || !courseId) {
    throw new ApiError(400, 'User and Course ID are required');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const session = await mongoose.startSession();
  let enrollmentData;
  let paymentData;
  let stripeSessionUrl;

  try {
    session.startTransaction();

    // 1. Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
   payment_method_types: ['card', 'cashapp'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description || 'Course Enrollment',
              images: course.thumbnail ? [course.thumbnail] : [],
            },
            unit_amount: Math.round((course.price || 0) * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/fail`,
      customer_email: (payload as any)?.email, // Optional: if provided
      metadata: {
        userId: userId.toString(),
        courseId: courseId.toString(),
      },
    });

    stripeSessionUrl = stripeSession.url;

    // 2. Create Payment Record (Pending)
    const payment = new Payment({
      user: userId,
      course: courseId,
      transactionId: stripeSession.id, // Use session ID as temporary transaction ID
      amount: course.price || 0,
      status: 'pending',
      stripeSessionId: stripeSession.id,
    });
    await payment.save({ session });
    paymentData = payment;

    // 3. Create Enrollment Record (Pending)
    const enrollment = new Enrollment({
      student: userId,
      course: courseId,
      paymentStatus: 'pending',
    });

    await enrollment.save({ session });
    enrollmentData = enrollment;

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  return {
    enrollment: enrollmentData,
    payment: paymentData,
    url: stripeSessionUrl
  };
};

const getStudentEnrollmentAndCourseService = async (studentId: string) => {
  const enrollment = await Enrollment.find({ student: studentId });
  if (!enrollment) throw new ApiError(404, 'Enrollment not found for this student');

  // Assuming 'progress' logic is handled elsewhere or this field exists in DB but not Schema
  // Adjusted to just return courses based on enrollment
  // Note: Previous logic used e.progress... but schema doesn't have it.
  // We will simply map from enrollment to course. 
  // If the user insists on progress, they must add it to schema.
  // For now preserving standard relation logic.
  const courseIds = enrollment.map((e) => e.course);

  const courses = await Course.find({ _id: { $in: courseIds } }).populate({
    path: 'modules',
    populate: { path: 'lectures' },
  });

  return courses;
};

export const enrollmentService = { getAllEnrollmentService, createEnrollmentService, getStudentEnrollmentAndCourseService };
