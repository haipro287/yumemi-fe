import Head from 'next/head'
import Appbar from '@components/appbar/Appbar'
import Footer from '@components/footer/Footer'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yumemi FE</title>
        <meta name='description' content='Powered by haipro287' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Appbar />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  )
}
