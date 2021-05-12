import React, { useEffect, useState } from "react";
import Head from "next/head";
import classNames from "classnames";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [credential, setCredential] = useState();
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {}, []);

  async function verifyConnection() {
    await window.Fractal.verifyConnection();
    await window.Fractal.setupPlugin();
  }

  const handleRequest = async () => {
    if (!window.Fractal) return;

    setRequesting(true);
    await verifyConnection();

    window.Fractal.requestCredential = async () =>
      Promise.resolve({
        claim: {
          claimTypeHash:
            "0x05ea239f8b4135b211fb9dcbc2051c61dc84bf71b2a31c1f980617b387a7834a",
          owner: "0xE3749E993F0A63DD4BB163ed70e1c9965A2D2b7f",
          properties: {
            liveness: true,
            residential_address_country: "PT",
            date_of_birth: "1986-05-12",
            full_name: "Mr. Bean",
            identification_document_country: "PT",
            identification_document_number: "CA00000AA",
            identification_document_type: "passport",
          },
        },
        rootHash:
          "0x1644b46d157aa8445458309c67a07b13d48637b902f6c125a431cdb219d002fc",
        attestedClaimHash:
          "0xa82a277c7b50d52d4161271e39b673881df6637e43b294d2fbde1994edcd1fcd",
        attestedClaimSignature:
          "0x86e5892864247453d7fbde99ee8188a54eb485623a479ce91fe37d4400cc0dcc3b6667cd291364210f37f49c96376fe85000a62fb53a807fe4735ee077e8382c1b",
        attesterAddress: "0xa372CA5A906f7FAD480C49bBc73453672d4d375d",
        attesterSignature:
          "0x20ebc0a5ccbf0cace1bbf0a4371523fe15608fa79fe4d4c37813130043d9fc065d25abc319e41b337e1d09151d3dc427c19d8ee51bd4e3dcd2b402027fc1a0c11c",
        claimerAddress: "0xE3749E993F0A63DD4BB163ed70e1c9965A2D2b7f",
        claimerSignature:
          "0x375a0ad81d93be7ba14e8c5b3440e3d354b6397ec4cbc3e1a8e22d12b46b93901aa1d5111114f172f29f99e14bc1feeaa656eae22d9b384d00df2da1e047aa3f1c",
        claimTypeHash: {
          nonce: "e74091f9-2ce0-4c0e-87a5-61f90f5ee217",
          hash: "0x712a9ff80de8b35d69dc0853a457dafa3681258061049f1340cf72ced25ce63e",
        },
        claimHashTree: {
          liveness: {
            nonce: "28d46fae-94db-4b52-8a03-4fd79f20ad6c",
            hash: "0xe5a906338dd0a8cc5caa4ef0930e9f56550b2c12cb8c652898a11a58034afe9f",
          },
          residential_address_country: {
            nonce: "3e543906-96c6-4ecc-956b-9e868f228862",
            hash: "0xf3384330977e3114686def588d540f96aad40292ad4e62da469f86ba6ccc7704",
          },
          date_of_birth: {
            nonce: "fd8273e0-8d54-4d3d-9508-50d96239c92f",
            hash: "0x33fc2cb4d79247dcee51b8208ced1d55316406656b82ef81d0758cb1fd21a456",
          },
          full_name: {
            nonce: "c5a7f852-bd87-47c1-83f2-3f1e726f0967",
            hash: "0xe632cf6918b2cab4df16ef37c72f3a80a04aa496a924e2dc0de89166173b98bc",
          },
          identification_document_country: {
            nonce: "09355549-4a86-43dd-84af-33384f04f670",
            hash: "0x265f65d85665320b096e006756cdae4d753460ec448381ae6b8373292fcf20df",
          },
          identification_document_number: {
            nonce: "ed7710b1-9588-4279-886d-f97d61ca2c9e",
            hash: "0x899878e74447a82504cf3018f0d21bfea2de1017efe056f4147c636c2b46faf1",
          },
          identification_document_type: {
            nonce: "0b12d6ea-e547-4ae3-a9d8-3c0f9e7ed9a9",
            hash: "0x25c6f1fda1217c0e0d2cd597c079c6d64bfecea0e295ce3be86a5a85b6a089bd",
          },
        },
        id: "7f902867-035e-41d9-85a1-b15148b5ded9:basic+liveness",
        level: "basic+liveness",
        transaction:
          '{"hash":"0xf4822320f70b264fe1f69d4ac5a20928233b9038ad112c7903220d9888fe7ee6","chainId":3,"data":"0x6e9c9300000000000000000000000000e3749e993f0a63dd4bb163ed70e1c9965a2d2b7f000000000000000000000000a372ca5a906f7fad480c49bbc73453672d4d375d1644b46d157aa8445458309c67a07b13d48637b902f6c125a431cdb219d002fc0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004186e5892864247453d7fbde99ee8188a54eb485623a479ce91fe37d4400cc0dcc3b6667cd291364210f37f49c96376fe85000a62fb53a807fe4735ee077e8382c1b00000000000000000000000000000000000000000000000000000000000000","from":"0xE3749E993F0A63DD4BB163ed70e1c9965A2D2b7f","gasLimit":{"type":"BigNumber","hex":"0xd23e"},"gasPrice":{"type":"BigNumber","hex":"0x3b9aca00"},"value":{"type":"BigNumber","hex":"0x00"}}',
        valid: true,
      });

    const cred = await window.Fractal.requestCredential();

    const response = await fetch("/api/validate_credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(cred),
    });

    const result = await response.json();

    if (response.ok) {
      setCredential(result);
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
          <h1 className={styles.title}>Some site</h1>

          <div className="mt-16">
            {credential ? (
              <>
                <h2 className="text-4xl mb-8">Your credential</h2>
                <div>{credential.level}</div>
                <div>{credential.valid ? "Valid" : "Invalid"}</div>
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
