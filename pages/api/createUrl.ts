import type { NextApiRequest, NextApiResponse } from "next";
const generateUniqueId = require("generate-unique-id");
const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  const id = generateUniqueId({
    length: 8,
    useLetters: false,
  });

  try {
    const info = await client.query(
      q.Create(q.Collection("urls"), {
        data: {
          ourl: url,
          surl: id,
        },
      })
    );

    res.status(200).send(id);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
