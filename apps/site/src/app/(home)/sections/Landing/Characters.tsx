import Image from "next/image"

import waterAnteater from "@/assets/images/intro-water-anteater.svg"
import waterAnteaterFoam from "@/assets/images/intro-character-foam.svg"
import waterAnteaterShadow from "@/assets/images/intro-water-anteater-shadow.svg"
import beachBall from "@/assets/images/intro-beach-ball.svg"

import mainCharacter from "@/assets/images/intro-main-anteater.svg"

import styles from "./Characters.module.scss"

export default function Characters() {
    return (
        <div>
            <Image src={waterAnteater} alt="Character" className={styles.character} />
            <Image src={waterAnteaterShadow} alt="Character Shadow" className={styles.characterShadow} />
            <Image src={waterAnteaterFoam} alt="Character" className={styles.characterFoam} />
            <Image src={mainCharacter} alt="Main anteater" className={styles.mainCharacter} />
            <Image src={beachBall} alt="Beach ball" className={styles.beachBall} />
        </div>
    )
}