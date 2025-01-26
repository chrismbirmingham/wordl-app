import styles from './AnnouncementPage.module.css'

const babyDetails = {
  name: "You Wish You Knew",
  dateOfBirth: "January 27, 2024",
  timeOfBirth: "3:47 PM",
  weight: "8 pounds, 1 ounce",
  length: "20.5 inches",
  location: "San Diego California",
  parents: "Chris Birmingham and Libby Young",
  description: `We are overjoyed to announce the arrival of our _____, __________. 
    Born on a beautiful ______ afternoon, _____ has already filled our hearts with 
    more love than we could have imagined. ______ already ...`
}

export default function AnnouncementPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hello World</h1>
        <h2 className={styles.name}>{babyDetails.name}</h2>
      </header>

      <div className={styles.photoFrame}>
        <img 
          src="/baby.jpg" 
          alt="Baby Bam Bam" 
          className={styles.photo}
        />
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detail}>
          <h3>Born On</h3>
          <p>{babyDetails.dateOfBirth}</p>
          <p>{babyDetails.timeOfBirth}</p>
        </div>

        <div className={styles.detail}>
          <h3>Weight</h3>
          <p>{babyDetails.weight}</p>
        </div>

        <div className={styles.detail}>
          <h3>Length</h3>
          <p>{babyDetails.length}</p>
        </div>

        <div className={styles.detail}>
          <h3>Proud Parents</h3>
          <p>{babyDetails.parents}</p>
        </div>
      </div>

      <div className={styles.announcement}>
        <p>{babyDetails.description}</p>
      </div>
    </div>
  )
}
