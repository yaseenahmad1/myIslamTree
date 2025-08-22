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
    description:
      "This verse reminds me of the vastness of creation and how our lives fit into Allah's magnificent design..."
  },
  {
    image: "/earlysolarsystem.avif",
    title: "Reflection on Surah Al-Fātiḥah",
    arabic: "وَهُوَ الَّذِي خَلَقَ اللَّيْلَ وَالنَّهَارَ وَالشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ فِي فَلَكٍ يَسْبَحُونَ",
    english: "“It is He Who created the night and the day, and the sun and the moon; all [heavenly bodies] in an orbit are swimming. (21:33)”",
    description:
      "This opening centers me each day. Its reminder of mercy is a guide for how I approach the world..."
  },
  {
    image: "/wood.jpg",
    title: "Reflection on Surah Al-Ikhlāṣ",
    arabic: "أَلَمۡ تَرَ كَيۡفَ ضَرَبَ ٱللَّهُ مَثَلٗا كَلِمَةٗ طَيِّبَةٗ كَشَجَرَةٖ طَيِّبَةٍ أَصۡلُهَا ثَابِتٞ ۝ وَفَرۡعُهَا فِي ٱلسَّمَآءِ ۝",
    english: "“Do you not see how Allah presents an example? A good word is like a good tree — whose root is firmly fixed and whose branches are high in the sky (14:24)”",
    description:
      "Pure monotheism refocuses my intentions and simplifies decisions throughout the day..."
  },
  {
    image: "/fingerprint.jpg",
    title: "Reflection on Surah Ash-Sharḥ",
    arabic: "أَيَحْسَبُ الْإِنسَانُ أَلَّن نَّجْمَعَ عِظَامَهُ ۝ بَلَىٰ قَادِرِينَ عَلَىٰ أَن نُّسَوِّيَ بَنَانَهُ",
    english: "Does man think that We will not reassemble his bones? Yes. [We are] Able [even] to proportion his fingertips. (75:3-4)",
    description:
      "A constant reminder to be patient and hopeful—ease is paired with difficulty, not after it..."
  },
  {
    image: "/kaaba.jpg",
    title: "Say, 'He is Allah, [who is] One...",
    arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
    english: "“Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'" ,
    description:
      "Time is the most precious trust; this verse pushes me to invest it with purpose..."
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

