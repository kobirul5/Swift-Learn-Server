import { model, Schema } from 'mongoose';
import { IModule } from './module.interface';
const moduleSchema = new Schema<IModule>(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        title: { type: String, required: true },
        description:{type: String, required: false, default: ""},
        isActive: { type: Boolean, required: true, default: true },// course
        lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture', default: []}],
        moduleNumber: { type: Number, required: true },
    }, {
    timestamps: true,
    versionKey:false
});

moduleSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const Module = this.constructor as import('mongoose').Model<IModule>;
    const count = await Module.countDocuments({ course: this.course });
    this.moduleNumber = count + 1;
  }
  next();
});



export const Module = model('Module', moduleSchema);
// akhne theke cousr id remove korte hobe,, ata course er modde j module er data rakhci sekhane theke sob module access paoa jabe