// Path: src/components/GiftInfoRow/GiftInfoRow.tsx

import styles from "./GiftInfoCard.module.css";

interface IGiftInfoRow {
    label: string;
    children: React.ReactNode;
}

function GiftInfoRow ({label, children}: IGiftInfoRow) {
    return (
        <div className={styles.giftInfoRow}>
          <span className={styles.infoLabel}>{label}</span>
          <div className={styles.infoValue}>
            {children}
          </div>
        </div>
      );
}
export default GiftInfoRow;