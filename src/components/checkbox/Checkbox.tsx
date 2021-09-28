import styles from "./Checkbox.module.scss";
import { Prefecture } from "../../pages";

interface Props {
    id: number;
    p: Prefecture;
    handle: (value: any) => void;
}

export default function Checkbox(props: Props) {
    return (
        <div className={styles.checkbox}>
            <input
                id={props.p.prefCode.toString()}
                className={styles.styledCheckbox}
                type="checkbox"
                onChange={props.handle}
                value={props.id}
            />

            <label htmlFor={props.p.prefCode.toString()}>
                <span></span> {props.p.prefName}
            </label>
        </div>
    );
}
