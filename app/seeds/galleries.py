from app.models import db, Gallery, User, Journal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_galleries():
    galleries = [
        # USER 1: 0 galleries (skip)
        
        # USER 2: 5 galleries
        Gallery(
            title='Judaism, Christianity, and Islam',
            image='https://images.unsplash.com/photo-1544497309-d05cff20121a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=2, verse=62,
            arabic_text='إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالنَّصَارَى ...',
            english_text='Indeed, those who believed and those who were Jews or Christians ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='The Prophets',
            image='https://images.unsplash.com/photo-1593289210821-617dbde37150?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=6, verse=84,
            arabic_text='وَلَقَدْ آتَيْنَا مُوسَى وَهَارُونَ ...',
            english_text='And We gave Moses and Aaron ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='The Quran Code',
            image='https://images.unsplash.com/photo-1624357824434-27d181804b20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=15, verse=9,
            arabic_text='إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ ...',
            english_text='Indeed, We have sent down the Qur’an ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='Jesus and Adam',
            image='https://images.unsplash.com/photo-1581358316909-6d4035624967?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=19, verse=30,
            arabic_text='وَقَالَ إِنِّي عَبْدُ اللَّهِ ...',
            english_text='He said, "Indeed I am the servant of Allah ..."',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),
        Gallery(
            title='Time',
            image='https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=103, verse=1,
            arabic_text='وَالْعَصْرِ',
            english_text='By time...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=2
        ),

        # USER 3: 3 galleries
        Gallery(
            title='Sounds',
            image='https://images.unsplash.com/photo-1692838952665-a7a9577fde9e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=31, verse=19,
            arabic_text='وَأَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ ...',
            english_text='And establish prayer and enjoin what is right ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),
        Gallery(
            title='Winds',
            image='https://images.unsplash.com/photo-1533985062386-ef0837f31bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=51, verse=1,
            arabic_text='وَالْمُرْسَلَاتِ عُرْفًا ...',
            english_text='By those [winds] sent forth in gusts ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),
        Gallery(
            title='Justice',
            image='https://images.unsplash.com/photo-1677641905377-e3f6087b8b7a?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=4, verse=58,
            arabic_text='إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ ...',
            english_text='Indeed, Allah commands you to render trusts ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=3
        ),

        # USER 4: 2 galleries
        Gallery(
            title='Mercy',
            image='https://images.unsplash.com/photo-1618468355232-88a329df0182?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=7, verse=56,
            arabic_text='وَلَا تُفْسِدُوا فِي الْأَرْضِ ...',
            english_text='And do not cause corruption on the earth ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=4
        ),
        Gallery(
            title='The Creation & Purpose of Man',
            image='https://images.unsplash.com/photo-1661705969607-cde73828023d?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=95, verse=4,
            arabic_text='لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ',
            english_text='We have certainly created man in the best of stature.',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=4
        ),

        # USER 5: 2 galleries
        Gallery(
            title='Miracles of the Prophets',
            image='https://images.unsplash.com/photo-1554052199-8a7788f67994?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            surah=7, verse=137,
            arabic_text='وَفَتَحْنَا أَبْوَابَ السَّمَاءِ ...',
            english_text='And We opened the doors of the sky ...',
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user_id=5
        ),
        Gallery(
            title='Attributes of God',
            image='https://images.unsplash.com/photo-1579332550177-31a901024747?q=80&w=2180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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