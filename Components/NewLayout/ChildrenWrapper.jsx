import Head from 'next/head'
import React from 'react'
import styles from "./layout.module.scss"
function ChildrenWrapper({children,footerBottom}) {
  return (
    <>
    <Head>
    <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, "
        />
    </Head>
    <div
    style={{
        width: "100%",
        paddingBottom:
        process.env.NEXT_PUBLIC_ENVR == "mobile" && footerBottom == 0
        ? "77px"
        : "",
        overflowX: "hidden",
    }}
    className={styles.childrenWrapper}
    >
    {children}
  </div>
        </>
  )
}

export default ChildrenWrapper
