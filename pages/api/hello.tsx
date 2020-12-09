import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebase";

export default (req: NextApiRequest, res: NextApiResponse) => {
  db.collection("test")
    .add({
      name: "mani",
    })
    .catch((e) => {
      return res.send(e);
    });
  res.status(200).json({ name: "John Doe" });
};
