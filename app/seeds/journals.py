from app.models import db, Journal, User, Gallery, environment, SCHEMA
from sqlalchemy.sql import text

def seed_journals():
    journals = [
        # --------------------------
        # User 2 Journals (10 total)
        # --------------------------
        # Gallery 1
        Journal(
            image="https://images.unsplash.com/photo-1673716277813-579a3709ecd8?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 1",
            surah=2,
            verse=2,
            arabic_text="ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
            english_text="This is the Book about which there is no doubt.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=1
        ),
        Journal(
            image="https://images.unsplash.com/photo-1641989210602-7c1efb2ff66c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVjY2ElMjBrYWFiYXxlbnwwfDJ8MHx8fDA%3D",
            title="Reflection 2",
            surah=3,
            verse=19,
            arabic_text="إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ",
            english_text="Indeed, the religion in the sight of Allah is Islam.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=1
        ),
        # Gallery 2
        Journal(
            image="https://images.unsplash.com/photo-1668605238342-b5238f8569b0?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 3",
            surah=5,
            verse=48,
            arabic_text="وَأَنْزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ",
            english_text="And We have revealed to you the Book in truth.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=2
        ),
        Journal(
            image="https://images.unsplash.com/photo-1718115575227-50aed16c2f8f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 4",
            surah=6,
            verse=141,
            arabic_text="وَلَا تُبَذِّرْ إِنَّهُ لَا يُحِبُّ الْمُبَذِّرِينَ",
            english_text="And do not waste [resources], indeed He does not like the wasteful.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=2
        ),
        # Gallery 3
        Journal(
            image="https://images.unsplash.com/photo-1711346105258-bbb9136592d7?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 5",
            surah=7,
            verse=31,
            arabic_text="وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا",
            english_text="Eat and drink, but do not be excessive.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=3
        ),
        Journal(
            image="https://images.unsplash.com/photo-1674847749596-04f99b124e2d?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 6",
            surah=10,
            verse=61,
            arabic_text="وَمَا تَسْتَوِي الْأَمْوَالُ وَلَا الْأَعْمَالُ",
            english_text="Not equal are the wealth and deeds.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=3
        ),
        # Gallery 4
        Journal(
            image="https://images.unsplash.com/photo-1553468294-61086700acaa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0ZSUyMHBhbG0lMjB0cmVlfGVufDB8MnwwfHx8MA%3D%3D",
            title="Reflection 7",
            surah=12,
            verse=111,
            arabic_text="لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ",
            english_text="There was certainly in their stories a lesson for those of understanding.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=4
        ),
        Journal(
            image="https://images.unsplash.com/photo-1614573058363-92c17bf4b59b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 8",
            surah=13,
            verse=28,
            arabic_text="أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
            english_text="Indeed, in the remembrance of Allah do hearts find rest.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=4
        ),
        # Gallery 5
        Journal(
            image="https://images.unsplash.com/photo-1664347201501-824d2bc04d88?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 9",
            surah=16,
            verse=97,
            arabic_text="مَن عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ",
            english_text="Whoever does righteousness, whether male or female...",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=5
        ),
        Journal(
            image="https://images.unsplash.com/photo-1579722139701-f9222eded3b6?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 10",
            surah=18,
            verse=10,
            arabic_text="وَرَبُّكَ الْغَفُورُ ذُو الرَّحْمَةِ",
            english_text="And your Lord is the Forgiving, Full of Mercy.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=2,
            gallery_id=5
        ),

        # --------------------------
        # User 3 Journals (6 total)
        # --------------------------
        # Gallery 6
        Journal(
            image="https://images.unsplash.com/photo-1503939313441-d753b6c7eb91?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 11",
            surah=21,
            verse=30,
            arabic_text="أَوَلَمْ يَرَ الَّذِينَ كَفَرُوا أَنَّ السَّمَاوَاتِ وَالْأَرْضَ كَانَتَا رَتْقًا",
            english_text="Do not those who disbelieve see that the heavens and the earth were a joined entity?",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=6
        ),
        Journal(
            image="https://images.unsplash.com/photo-1615378536579-61c7d173e8a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title="Reflection 12",
            surah=23,
            verse=12,
            arabic_text="وَلَقَدْ خَلَقْنَا الْإِنسَانَ مِن سُلَالَةٍ مِّن طِينٍ",
            english_text="And certainly did We create man from an extract of clay.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=6
        ),
        # Gallery 7
        Journal(
            image="https://example.com/journal13.jpg",
            title="Reflection 13",
            surah=51,
            verse=56,
            arabic_text="وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
            english_text="And I did not create the jinn and mankind except to worship Me.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=7
        ),
        Journal(
            image="https://example.com/journal14.jpg",
            title="Reflection 14",
            surah=67,
            verse=2,
            arabic_text="الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ",
            english_text="He who created death and life.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=7
        ),
        # Gallery 8
        Journal(
            image="https://example.com/journal15.jpg",
            title="Reflection 15",
            surah=96,
            verse=1,
            arabic_text="اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
            english_text="Read in the name of your Lord who created.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=8
        ),
        Journal(
            image="https://example.com/journal16.jpg",
            title="Reflection 16",
            surah=96,
            verse=2,
            arabic_text="خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ",
            english_text="Created man from a clot.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=3,
            gallery_id=8
        ),

        # --------------------------
        # User 4 Journals (4 total)
        # --------------------------
        # Gallery 9
        Journal(
            image="https://example.com/journal17.jpg",
            title="Reflection 17",
            surah=2,
            verse=255,
            arabic_text="اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
            english_text="Allah – there is no deity except Him, the Ever-Living, the Sustainer of existence.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=4,
            gallery_id=9
        ),
        Journal(
            image="https://example.com/journal18.jpg",
            title="Reflection 18",
            surah=3,
            verse=26,
            arabic_text="لِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ",
            english_text="To Allah belongs the dominion of the heavens and the earth.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=4,
            gallery_id=9
        ),
        # Gallery 10
        Journal(
            image="https://example.com/journal19.jpg",
            title="Reflection 19",
            surah=13,
            verse=28,
            arabic_text="أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
            english_text="Indeed, in the remembrance of Allah do hearts find rest.",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=4,
            gallery_id=10
        ),
        Journal(
            image="https://example.com/journal20.jpg",
            title="Reflection 20",
            surah=23,
            verse=115,
            arabic_text="أَفَحَسِبَ الَّذِينَ كَفَرُوا أَن يَتَّخِذُوا عِبَادِي",
            english_text="Did those who disbelieve think that they could take My servants as allies?",
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            is_private=False,
            user_id=4,
            gallery_id=10
        ),
    ]

    for journal in journals:
        db.session.add(journal)
    db.session.commit()


def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
