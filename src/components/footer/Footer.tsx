import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a href='https://github.com/haipro287' target='_blank' rel='noopener noreferrer'>
        Powered by haipro287{' '}
        <span className={styles.logo}>
          {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        </span>
      </a>
    </div>
  )
}
