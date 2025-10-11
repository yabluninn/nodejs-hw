import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // если ошибка — экземпляр HttpError
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  // иначе — общая серверная ошибка
  res.status(500).json({ message: 'Server error' });
};
