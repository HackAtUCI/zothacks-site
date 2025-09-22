import styles from "./submitted.module.scss";

export default function MentorSubmitted() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Application Submitted ✅</h1>
      <p className={styles.message}>
        Thank you for applying to be a mentor! We’ve received your application and will be in touch with next steps.
      </p>
    </div>
  );
}
