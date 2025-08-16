from app.models import db, Gallery, User, Journal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_galleries():
    galleries = [
        # USER 1: 0 galleries (skip)
        
        # USER 2: 5 galleries
        Gallery(
            title='Judaism, Christianity, and Islam',
            image='https://example.com/old_jerusalem.jpg',
            surah=2, verse=62,
            arabic_text='إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالنَّصَارَى ...',
            english_text='Indeed, those who believed and those who were Jews or Christians ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='The Prophets',
            image='https://example.com/shepherd_distance.jpg',
            surah=6, verse=84,
            arabic_text='وَلَقَدْ آتَيْنَا مُوسَى وَهَارُونَ ...',
            english_text='And We gave Moses and Aaron ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='The Quran Code',
            image='https://example.com/oldest_quran.jpg',
            surah=15, verse=9,
            arabic_text='إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ ...',
            english_text='Indeed, We have sent down the Qur’an ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='Jesus and Adam',
            image='https://example.com/number_25.jpg',
            surah=19, verse=30,
            arabic_text='وَقَالَ إِنِّي عَبْدُ اللَّهِ ...',
            english_text='He said, "Indeed I am the servant of Allah ..."',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='Time',
            image='https://example.com/old_clock.jpg',
            surah=103, verse=1,
            arabic_text='وَالْعَصْرِ',
            english_text='By time...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),

        # USER 3: 3 galleries
        Gallery(
            title='Sounds',
            image='https://example.com/sound_waves.jpg',
            surah=31, verse=19,
            arabic_text='وَأَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ ...',
            english_text='And establish prayer and enjoin what is right ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),
        Gallery(
            title='Winds',
            image='https://example.com/winds_desert.jpg',
            surah=51, verse=1,
            arabic_text='وَالْمُرْسَلَاتِ عُرْفًا ...',
            english_text='By those [winds] sent forth in gusts ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),
        Gallery(
            title='Justice',
            image='https://example.com/weighing_scale.jpg',
            surah=4, verse=58,
            arabic_text='إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ ...',
            english_text='Indeed, Allah commands you to render trusts ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),

        # USER 4: 2 galleries
        Gallery(
            title='Mercy',
            image='https://example.com/flowers.jpg',
            surah=7, verse=56,
            arabic_text='وَلَا تُفْسِدُوا فِي الْأَرْضِ ...',
            english_text='And do not cause corruption on the earth ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=4
        ),
        Gallery(
            title='The Creation & Purpose of Man',
            image='https://example.com/earth_space.jpg',
            surah=95, verse=4,
            arabic_text='لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ',
            english_text='We have certainly created man in the best of stature.',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=4
        ),

        # USER 5: 2 galleries
        Gallery(
            title='Miracles of the Prophets',
            image='https://example.com/splitting_sea.jpg',
            surah=7, verse=137,
            arabic_text='وَفَتَحْنَا أَبْوَابَ السَّمَاءِ ...',
            english_text='And We opened the doors of the sky ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=5
        ),
        Gallery(
            title='Attributes of God',
            image='https://example.com/nature.jpg',
            surah=59, verse=24,
            arabic_text='هُوَ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ ...',
            english_text='He is Allah, other than whom there is no deity ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=5
        ),
    ]

    for gallery in galleries:
        db.session.add(gallery)
    db.session.commit()

def undo_galleries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.galleries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM galleries"))

    db.session.commit()



        # Optional extra galleries for demonstration
        # Gallery(
        #     title='The Kaaba',
        #     image='https://example.com/kaaba_aerial.jpg',
        #     surah=2, verse=125,
        #     arabic_text='وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِلنَّاسِ ...',
        #     english_text='And [mention,] when We made the House a place of return for the people ...',
        #     description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        #     user_id=2
        # ),
        # Gallery(
        #     title='What is Islam?',
        #     image='https://example.com/space.jpg',
        #     surah=3, verse=19,
        #     arabic_text='إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ ...',
        #     english_text='Indeed, the religion in the sight of Allah is Islam ...',
        #     description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        #     user_id=3
        # ),