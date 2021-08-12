import { NextApiRequest, NextApiResponse } from "next";
import { getDogs } from "../../models/dog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dogs = await getDogs();
  res.send(dogs);
};
