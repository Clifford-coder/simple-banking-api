import { Request, Response } from 'express';
import url from 'url';

const notFound = (req: Request, res: Response) => {
  const fullUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });
  return res.status(404).send(`route ${fullUrl} does not exist`);
};

export default notFound;
