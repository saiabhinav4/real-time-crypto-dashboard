type DeltaData = {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  }
  
export interface ExternalAPIResponse  {
    code : string;
    rate: number;
    volume: number;
    cap: number | null;
    delta : DeltaData
};
  
export interface InsertedDBData {
    name : string;
    price : string; 
    percent_24: string;
    percent_7d: string; 
    marketCap: string; 
    volume_24 : string;
    last_updated : Date;
  }

export interface DBData extends InsertedDBData{
    _id: object;
}