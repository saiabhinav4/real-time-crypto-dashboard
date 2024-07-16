import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Table from "../components/Table";
import { store, persistor } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DropDown from '../components/DropDown';
import React from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  React.useEffect(()=>{
    startCronJob();
  },[]);

  const startCronJob = React.useCallback(() =>{
    fetch('/api/cron').
    then((response)=>response.json())
    .then(data=>console.log(data));
},[]);
  return (
    <>
      <Head>
        <title>Crypto Currency</title>
        <meta name="description" content="RealTime Crypto currenty Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <main className={`${styles.main} ${inter.className}`}>
            <div className={styles.container}>
              <DropDown />
            </div>
            <Table />
          </main>
        </PersistGate>
      </Provider>
    </>
  );
}
