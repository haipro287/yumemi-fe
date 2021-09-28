import styles from './Checkbox.module.scss'
import { Prefecture } from '../../pages'

interface Props {
  id: number
  pref: Prefecture
  handle: (value: any) => void
}

export default function Checkbox(props: Props) {
  const { id, pref, handle } = props
  return (
    <div className={styles.checkbox}>
      <input
        id={pref.prefCode.toString()}
        className={styles.styledCheckbox}
        type='checkbox'
        onChange={handle}
        value={id}
      />

      <label htmlFor={pref.prefCode.toString()}>
        <span /> {pref.prefName}
      </label>
    </div>
  )
}
