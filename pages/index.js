import React, { useEffect, useState } from "react";
import Head from "next/head";
import map from "lodash/map";
import omit from "lodash/omit";
import capitalize from "lodash/capitalize";
import words from "lodash/words";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [credential, setCredential] = useState();
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const enableEthereum = async () => {
      await window.ethereum.enable();
    };

    enableEthereum();
  }, []);

  async function verifyConnection() {
    await window.Fractal.verifyConnection();
    await window.Fractal.setupPlugin();
  }

  const handleRequest = async () => {
    if (!window.Fractal) return;

    setRequesting(true);
    await verifyConnection();

    try {
      const requester = {
        name: "Polkastarter",
        url: "https://www.polkastarter.com",
        icon: "https://www.polkastarter.com/packs/media/images/logo/favicon-5c923122dec9213975049aa98a6781a4.svg",
      };
      const level = "basic+liveness";
      const { credential: cred } = await window.Fractal.getVerificationRequest(
        level,
        requester
      );

      const signedNouce = await window.Fractal.getSignedNounce();

      const response = await fetch("/api/validate_credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ credential: cred, signedNouce }),
      });

      const result = await response.json();

      if (response.ok) {
        setCredential(result.credential);
      }
    } catch (error) {
      console.log(error);
    }

    setRequesting(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Verifier Demo</title>
        <meta
          name="description"
          content="A demo for sharing a Fractal credential and the data with this site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className={styles.title}>Polkastarter</h1>

          <div className="mt-16">
            {credential ? (
              <>
                <h2 className="text-4xl mb-8">Your credential</h2>
                <ol>
                  <li className="mb-2">
                    <b>Level</b>: {credential.level}{" "}
                    {credential.valid ? "\u2705" : "\u274C"}
                  </li>
                  {map(
                    omit(credential.claim.properties, ["liveness"]),
                    (val, key) => (
                      <li className="mb-2" key={key}>
                        <b>{capitalize(words(key).join(" "))}</b>: {val}
                      </li>
                    )
                  )}
                </ol>
              </>
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={handleRequest}
                disabled={requesting}
              >
                {requesting && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                )}
                <span className={requesting ? "opacity-0" : ""}>
                  Request Fractal Credential
                </span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
