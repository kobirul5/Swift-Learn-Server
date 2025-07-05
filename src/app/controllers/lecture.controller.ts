import { Request, Response } from 'express'
import { Lecture } from '../models/lecture.model'
import { Module } from '../models/module.model';
import { asyncHandler } from '../utils/asyncHandler';


const createLecture = async (req: Request, res: Response) => {
  const { module, title, videoUrl, notes } = req.body;

  if (!module || !title || !videoUrl) {
    res.status(400).json({
      success: false,
      message: "Module, title, and videoUrl are required.",
    });
    return
  }

  // 1️⃣ Create Lecture
  const newLecture = await Lecture.create({
    module,
    title,
    videoUrl,
    notes,
  });

  // 2️⃣ Push lecture._id to the module’s lectures array
  await Module.findByIdAndUpdate(
    module,
    { $push: { lectures: newLecture._id } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    massage: "crate lecture Successfully",
    data: newLecture
  })
}

const getAllLecture = async (req: Request, res: Response) => {
  const param = req.params;
  const data = await Lecture.find({ module: param.id })

  res.status(201).json({
    success: true,
    message: "get all Lecture successfully",
    data: data,
  });
}

const deleteLecture = asyncHandler(async (req: Request, res: Response) => {
  const param = req.params;
  const data = await Lecture.findByIdAndDelete(param.id)
  await Module.findByIdAndUpdate(
    data?.module,
    { $pull: { lectures: data?._id } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "delete successfully",
    data: data,
  });
}
)


export { createLecture, getAllLecture, deleteLecture }