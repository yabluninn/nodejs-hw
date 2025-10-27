import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }

    const result = await saveFileToCloudinary(req.file.buffer);

    await User.updateOne(
      { _id: req.user._id },
      { $set: { avatar: result.secure_url } }
    );

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
};
