import { connectDatabase, insertDocuments } from '../../helpers/db-util';
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import numberFormat from '../../helpers/convert-util';
import { cryptoList } from '../../helpers/constants';
import { ExternalAPIResponse, InsertedDBData } from '@/types';
const cron = require('node-cron');

const fetchData = async () =>{

    const body = {
            codes: cryptoList,
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 5,
            meta: false,
        };

    const headers = {
        "content-type": "application/json",
        "x-api-key": "b069dfe1-c9b4-4129-9fa1-07af2b79508b",
    }
    const response = await axios.post(`https://api.livecoinwatch.com/coins/map?timestamp=${new Date().toString()}`,body,{ headers: headers })
    const result = response.data.map((coinDetails: ExternalAPIResponse)=>{
      const name = coinDetails.code;
      const price = numberFormat(coinDetails.rate);
      const percent_24 = coinDetails.delta.day.toFixed(2);
      const percent_7d = coinDetails.delta.week.toFixed(2);
      const marketCap = numberFormat(coinDetails.cap, { notation: 'compact', compactDisplay: 'short'});
      const volume_24 = numberFormat(coinDetails.volume);

       return { name, price, percent_24, percent_7d, marketCap, volume_24, last_updated: new Date()};
    });

    return result;
}

const insertData = async (data: InsertedDBData) =>{
    let client;
    try {
      client = await connectDatabase();
      await insertDocuments(client, 'cryptoCollection',data);
    } catch (error) {
        console.log(error);
    }
    client?.close();
}

// This function will be called by the cron job
const scheduledTask = async () => {
  console.log('Running cron job...');
  const data = await fetchData();
  await insertData(data);
};

// Set up the cron job to run every 5 seconds
cron.schedule('*/5 * * * * *', scheduledTask);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Cron job is scheduled' });
}