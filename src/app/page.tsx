'use client'
import styles from './page.module.css'
import Script from 'next/script'

export default function Home() {
  return (
    <main className={styles.main}>
      <Script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"
        id='bar-code'
        onReady={() => {
          window.JsBarcode(".barcode").init();
          window.JsBarcode("#barcode", "Hi world!");
        }} />
      <div className={styles.description}>
        <svg id="barcode"></svg>
        <svg className="barcode"
          jsbarcode-format="upc"
          jsbarcode-value="123456789012"
          jsbarcode-textmargin="0"
          jsbarcode-fontoptions="bold">
        </svg>
      </div>
    </main>
  )
}

