import {
    connectDatabase,
    getAllDocuments,
  } from '../../../helpers/db-util';
import type { NextApiRequest, NextApiResponse } from "next";
import { DBData } from "../../../types";


async function handler(req:NextApiRequest, res: NextApiResponse) {
    const code = req.query.code;
    let client;
    try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
      }

      try {
        const documents = await getAllDocuments(client, 'cryptoCollection',{ name: code } ,{ last_updated: -1 });
        const result = documents.map((row: DBData)=>([row.name,row.price,row.marketCap]));
        res.status(200).json([ ...result ]);
      } catch (error) {
        res.status(500).json({ message: 'Getting comments failed.' });
      }

      client?.close();

}
export default handler;