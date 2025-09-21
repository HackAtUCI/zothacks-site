"use client";
import styles from "./Landing.module.scss";

const Landing = () => {
    return (
        <div className={styles.landing}>
            <h1 className={styles.title}>ZotHacks 2025</h1>
            <p className={styles.subtitle}>Theme Coming Soon</p>
            <a
                href="/apply-mentor" 
                className={styles.applyButton}
            >
                Mentor Applications Now Open
            </a> 
            {/* // blue boxes to cover up mountains in image  */}
            <div className={styles.firstBox}></div>
            <div className={styles.secondBox}></div>
            <div className={styles.thirdBox}></div>
            <div className={styles.fourthBox}></div>
        </div>
    );
};

export default Landing;
