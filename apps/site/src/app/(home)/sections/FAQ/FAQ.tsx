import { getQuestions } from "./getQuestions";
import FAQAccordion from "./FAQAccordion";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import styles from "./FAQ.module.scss";

import leftAnteater from "@/assets/images/left-faq-anteater.svg";
import rightAnteater from "@/assets/images/right-faq-anteater.svg";
import AnteaterFloatie from "./AnteaterFloatie";

const FAQ = async () => {
	const questions = await getQuestions();
	const faq = questions[0]["faqs"].map(({ _key, question, answer }) => ({
		_key: _key,
		question: <strong>{question}</strong>,
		answer: <PortableText value={answer} />,
	}));

	return (
		<>
			<section className={styles.container}>
				<AnteaterFloatie
					src={leftAnteater}
					alt="left anteater on floatie"
					className={styles["left-anteater"]}
				/>

				<div className={styles.faq}>
					<div
						className={`${styles["accordion-border"]} ${styles["answer-body"]} ${styles["header-body"]}`}
					>
						<h4>
							<span className={styles["light-blue-text"]}>FAQ!</span> Here's
							answers to our most commonly asked questions!
						</h4>
						<p>
							If you don't find what you're looking for, reach out to our team
							at{" "}
							<a
								className={styles["purple-text"]}
								href="mailto:hackatuci@uci.edu"
							>
								hackatuci@uci.edu
							</a>
						</p>
					</div>
					<FAQAccordion faq={faq} />
				</div>

				<AnteaterFloatie
					src={rightAnteater}
					alt="left anteater on floatie"
					className={styles["right-anteater"]}
				/>
			</section>
			<p>
				planet Tatooine. EXT. TATOOINE - DESERT Jundland, or "No Man's Land",
				where the rugged desert mesas meet the foreboding dune sea. The two
				helpless astro-droids kick up clouds of sand as they leave the lifepod
				and clumsily work their way across the desert wasteland. The lifepod in
				the distance rests half buried in the sand. THREEPIO How did I get into
				this mess? I really don't know how. We seem to be made to suffer. It's
				our lot in life. Artoo answers with beeping sounds. THREEPIO I've got to
				rest before I fall apart. My joints are almost frozen. Artoo continues
				to respond with beeping sounds. THREEPIO What a desolate place this is.
				Suddenly Artoo whistles, makes a sharp right turn and starts off in the
				direction of the rocky desert mesas. Threepio stops and yells at him.
				THREEPIO Where are you going? A stream of electronic noises pours forth
				from the small robot. THREEPIO Well, I'm not going that way. It's much
				too rocky. This way is much easier. Artoo counters with a long whistle.
				THREEPIO What makes you think there are settlements over there? Artoo
				continues to make beeping sounds. THREEPIO Don't get technical with me.
				Artoo continues to make beeping sounds. THREEPIO What mission? What are
				you talking about? I've had just about enough of you! Go that way!
				You'll be malfunctioning within a day, you nearsighted scrap pile!
				Threepio gives the little robot a kick and starts off in the direction
				of the vast dune sea. THREEPIO And don't let me catch you following me
				begging for help, because you won't get it. Artoo's reply is a rather
				rude sound. He turns and trudges off in the direction of the towering
				mesas. THREEPIO No more adventures. I'm not going that way. Artoo beeps
				to himself as he makes his way toward the distant mountains. EXT.
				TATOOINE - DUNE SEA Threepio, hot and tired, struggles up over the ridge
				of a dune; only to find more dunes, which seem to go on for endless
				miles. He looks back in the direction of the now distant rock mesas.
				THREEPIO That malfunctioning little twerp. This is all his fault! He
				tricked me into going this way, but he'll do no better. In a huff of
				anger and frustration, Threepio knocks the sand from his joints. His
				plight seems hopeless, when a glint of reflected light in the distance
				reveals an object moving towards him. THREEPIO Wait, what's that? A
				transport! I'm saved! The bronze android waves frantically and yells at
				the approaching transport. THREEPIO Over here! Help! Please, help! EXT.
				TATOOINE - ANCHORHEAD SETTLEMENT - POWER STATION - DAY Luke and Biggs
				are walking and drinking a malt brew. Fixer and the others can be heard
				working inside. LUKE (Very animated) ...so I cut off my power, shut down
				the afterburners and came in low on Deak's trail. I was so close I
				thought I was going to fry my instruments. As it was I busted up the
				Skyhopper pretty bad. Uncle Owen was pretty upset. He grounded me for
				the rest of the season. You should have been there... it was fantastic.
				BIGGS You ought to take it easy Luke. You may be the hottest bushpilot
				this side of Mos Eisley, but those little Skyhoppers are dangerous. Keep
				it up, and one day, whammo, you're going to be nothing more than a dark
				spot on the down side of a canyon wall. LUKE Look who's talking. Now
				that you've been around those giant starships you're beginning to sound
				like my uncle. You've gotten soft in the city... BIGGS I've missed you
				kid. LUKE Well, things haven't been the same since you left, Biggs. It's
				been so... quiet. Biggs looks around then leans close to Luke. BIGGS
				Luke, I didn't come back just to say good-bye... I shouldn't tell you
				this, but you're the only one I can trust... and if I don't come back, I
				want somebody to know. Luke's eyes are wide with Biggs' seriousness and
				loyalty. LUKE What are you talking about? BIGGS I made some friends at
				the Academy. (he whispers) ...when our frigate goes to one of the
				central systems, we're going to jump ship and join the Alliance... Luke,
				amazed and stunned, is almost speechless. LUKE Join the Rebellion?! Are
				you kidding! How? BIGGS Quiet down will ya! You got a mouth bigger than
				a meteor crater! LUKE I'm sorry. I'm quiet. (he whispers) Listen how
				quiet I am. You can barely hear me... Biggs shakes his head angrily and
				then continues. BIGGS My friend has a friend on Bestine who might help
				us make contact. LUKE You're crazy! You could wander around forever
				trying to find them. BIGGS I know it's a long shot, but if I don't find
				them I'll do what I can on my own... It's what we always talked about.
				Luke, I'm not going to wait for the Empire to draft me into service. The
				Rebellion is spreading and I want to be on the right side -- the side I
				believe in. LUKE And I'm stuck here... BIGGS I thought you were going to
				the Academy next term. You'll get your chance to get off this rock. LUKE
				Not likely! I had to cancel my application. There has been a lot of
				unrest among the Sandpeople since you left... they've even raided the
				outskirts of Anchorhead. BIGGS Your uncle could hold off a whole colony
				of Sandpeople with one blaster. LUKE I know, but he's got enough
				vaporators going to make the place pay off. He needs me for just one
				more season. I can't leave him now. BIGGS I feel for you, Luke, you're
				going to have to learn what seems to be important or what really is
				important. What good is all your uncle's work if it's taken over by the
				Empire?... You know they're starting to nationalize commerce in the
				central systems... it won't be long before your uncle is merely a
				tenant, slaving for the greater glory of the Empire. LUKE It couldn't
				happen here. You said it yourself. The Empire won't bother with this
				rock. BIGGS Things always change. LUKE I wish I was going... Are you
				going to be around long? BIGGS No, I'm leaving in the morning... LUKE
				Then I guess I won't see you. BIGGS Maybe someday... I'll keep a
				lookout. LUKE Well, I'll be at the Academy next season... after that who
				knows. I won't be drafted into the Imperial Starfleet that's for sure...
				Take care of yourself, you'll always be the best friend I've got. BIGGS
				So long, Luke. Biggs turns away from his old friend and heads towards
				the power station. EXT. TATOOINE - ROCK CANYON - SUNSET The gargantuan
				rock formations are shrouded in a strange foreboding mist and the
				onimous sounds of unearthly creatures fill the air. Artoo moves
				cautiously through the creepy rock canyon, inadvertently making a loud
				clicking noise as he goes. He hears a distant, hard, metallic sound and
				stops for a moment. Convinced he is alone, he continues on his way. In
				the distance, a pebble tumbles down the steep canyon wall and a small
				dark figure darts into the shadows. A little further up the canyon a
				slight flicker of light reveals a pair of eyes in the dark recesses only
				a few feet from the narrow path.
			</p>
		</>
	);
};

export default FAQ;
