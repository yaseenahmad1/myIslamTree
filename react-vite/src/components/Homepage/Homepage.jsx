import SpiralVisual from "./SpiralVisual";
import GetStarted from "./GetStarted";
import "./Homepage.css";
import Footer from "./Footer";

const journalEntries = [
  {
    image: "/spiralgalaxy.jpg",
    title: "The Spiral",
    arabic: "أَوَلَمْ يَرَ ٱلَّذِينَ كَفَرُوٓا۟ أَنَّ ٱلسَّمَـٰوَٟتِ وَٱلۡأَرۡضَ كَانَتَا رَتۡقٗا فَفَتَقۡنَـٰهُمَا ۝ وَجَعَلۡنَا مِنَ ٱلۡمَآءِ كُلَّ شَيۡءٍ حَيٍّ ۝ أَفَلَا يُؤۡمِنُونَ ۝",
    english: "“Have those who disbelieved not considered that the heavens and the earth were a joined entity, and We separated them - and made from water every living thing? Then will they not believe? (21:30)",
    description: "Why is there something rather than nothing? I often ponder about how we came from some singularity and someone once said it best - 'we are the universe witnessing itself.' Like a painter who leaves their signature on every painting they make. God has shown us that He is truly the One true Creator. Since the beginning of time, a common shape has travelled with us... the spiral"
  },
  {
    image: "/earlysolarsystem.avif",
    title: "Heavenly Bodies",
    arabic: "وَهُوَ الَّذِي خَلَقَ اللَّيْلَ وَالنَّهَارَ وَالشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ فِي فَلَكٍ يَسْبَحُونَ",
    english: "“It is He Who created the night and the day, and the sun and the moon; all [heavenly bodies] in an orbit are swimming. (21:33)”",
    description:
      "I find it fascinating that the sun is nearly 92 miillion miles away from us. The distance being so far away that it takes the light 8 minutes to reach us. And the moon is roughly 282,000 miles away but when it eclipses the sun we see a perfect ratio of distance vs size..."
  },
  {
    image: "/wood.jpg",
    title: "Submission",
    arabic: "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ",
    english: "“Whatever is in the heavens and whatever is on the earth glorifies Allah, and He is the Almighty, the All-Wise. (59:1)”",
    description:
      "Like everything we pursue in life, I now believe it starts with a single `seed`, your `intention`, and as you water your `intention` and tend to it every day, slowly but surely, the roots start to cling to the ground and the tree starts to grow and spread out. Life and nature is so poetic to me. God's lessons are `coded` within nature itself. For example, if you wanted to eat an `apple` and the only way to do that was to plant an `apple seed`, then you would have to wait 8 to 10 years before ever tasting that fruit! Makes me wonder what things we take for granted... Who the heck would wait that long for an `apple`?! But then again, I wonder if the very first human to ever plant an `apple seed` even knew what it would turn out to be. That might be the wonder in daring to pursue something. It is not knowing what the outcome will be but constantly focusing on watering your `seed` and it is only the `patient` ones who can ever truly appreciate the blessing of that `fruit`."
  },
  {
    image: "/fingerprint.jpg",
    title: "Recreation",
    arabic: "أَيَحْسَبُ الْإِنسَانُ أَلَّن نَّجْمَعَ عِظَامَهُ ۝ بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ",
    english: "Does man think that We will not reassemble his bones? Yes. [We are] Able [even] to proportion his fingertips. (75:3-4)",
    description:
      "I find it amazing how Allah mentions the fingertips when referring to resurrection. Your spiral fingerprint is your very own unique identifier. When the Arabs of Mecca over 1400 years ago would question the Prophet (peace be upon him). They tauntingly asked `Will we be brought be to life even once our bones are turned to dust?`"
  },
  {
    image: "/kaaba.jpg",
    title: "Say, 'He is Allah, [who is] One...",
    arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
    english: "“Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.(112:4)'" ,
    description:
      "Now that I see the spirals, I cannot help but think about how something orbits another, the planets to the sun, a cluster of stars around a black hole, electrons around a nucleus, makes me appreciate the symbolic nature of the `Tawaf` around the Kaaba..."
  }
];

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Get Started Section */}
      <div className="get-started-wrapper">
        <GetStarted />
      </div>

      {/* Black strip title */}
      <div className="spiral-title-strip">
        <h1>T&nbsp;H&nbsp;E&nbsp;&nbsp;O&nbsp;R&nbsp;I&nbsp;G&nbsp;I&nbsp;N&nbsp;A&nbsp;T&nbsp;O&nbsp;R</h1>
      </div>

      {/* Spiral Section */}
      <div className="spiral-section">
        <SpiralVisual />
      </div>

      {/* Verse hover block */}
      <div className="verse-wrapper">
        <div className="verse arabic">
          <h2>وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْيْدٍ وَإِنَّا لَمُوسِعُونَ</h2>
        </div>
        <div className="verse english">
          <h2>
            We built the universe with ˹great˺ might, and We are certainly expanding ˹it˺.
            <br />
            51&nbsp;:&nbsp;47
          </h2>
        </div>
      </div>

      {/* Journals Section */}
      <div className="journal-wrapper">
        {journalEntries.map((j, idx) => (
          <div className="journal-card" key={idx}>
            <div className="journal-image">
              <img src={j.image} alt="Journal visual" />
            </div>

            <div className="journal-content">
              <div className="journal-title">
                <h2>{j.title}</h2>
              </div>

              <div className="verse-block">
                <div className="arabic-text">
                  <h3>{j.arabic}</h3>
                </div>
                <div className="english-text">
                  <h3>{j.english}</h3>
                </div>
              </div>

              <div className="description">
                <p>{j.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

        <Footer />
    </div>
  );
};

export default Homepage;

