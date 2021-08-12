import { NextApiRequest, NextApiResponse } from "next";
import { addDog } from "../../models/dog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req

  const dog = await addDog(body);
  res.send(dog);
};
