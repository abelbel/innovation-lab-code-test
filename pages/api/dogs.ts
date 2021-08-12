import { NextApiRequest, NextApiResponse } from "next";
import { getDogs, addDog } from "../../models/dog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  let result = undefined
  let success = false
  switch (method) {
    case "GET":
      result = await getDogs();
      success = true;
      break;
    case "POST":
      result = await addDog(body);
      success = true;
      break;
    default:
      success = false;
      break;
  }

  res.send({ success, result });
};
