// Path: src/components/Button/Button.tsx

import styles from "./Button.module.css";

interface IButton {
    labelOne: string;
    labelTwo?: string;
    onClickOne?: () => void;
    onClickTwo?: () => void;
}

function Button ({ labelOne, labelTwo, onClickOne, onClickTwo}: IButton) {
    return (
        <div className={styles.btnContainer} style={ labelTwo ? {height: "150px"}: {}}>
            <button className={styles.btn} onClick={onClickOne}>{labelOne}</button>
            { labelTwo && <button className={styles.btn} onClick={onClickTwo} style={{ background: "none", color: "var(--primary)" }}>{labelTwo}</button> }
        </div>
    );
}

export default Button;