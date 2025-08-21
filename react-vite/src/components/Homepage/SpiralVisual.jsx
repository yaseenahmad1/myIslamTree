import React from "react";
import "./SpiralVisual.css"; 


const SpiralVisual = () => {
  return (
    <div className="spiral-container">
        <img
        src="/space.jpg"
        alt="Background"
        className="spiral-background"
        />
    <div className="outer-space">
    <div className="black-circle">
        <div className="inner-circle"></div>
        <div className="main-text">الله</div>
        <div className="main-layer-text">الله</div>
    </div>

    <svg className="spiral-svg" viewBox="0 0 500 500">
      <defs>
        <path id="spiralPath1" d="M250,250 C 250,150 350,180 360,250 S 300,380 250,370" />
        <path id="spiralPath2" d="M250,250 C 150,110 330,120 400,200 S 200,600 420,300" />
        <path id="spiralPath3" d="M250,250 C 10,100 470,20 440,250 S 320,400 250,390" />
        <path id="spiralPath4" d="M250,250 C -90,70 450,5 490,130 S 350,300 100,45" />
        <path id="spiralPath5" d="M250,250 C -390,20 869,-60 400,10 S 340,420 250,410" />
        <path id="spiralPath6" d="M250,250 C -690,40 810,-100 400,20 S 10,130 350,130" />
        <path id="spiralPath7" d="M250,250 C -990,190 999,-200 940,100 S 960,140 950,130" /> 
        <path id="spiralPath8" d="M250,250 C 100,300 -960,300 460,50 S 142,250 920,40" />
        <path id="spiralPath9" d="M250,250 C -998,900 -150,-980 -980,50 S 380,460 250,450" /> 

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" >
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="gold" flood-opacity="0.8"/>
            <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="orange" flood-opacity="0.5"/>
          </filter>
      </defs>

      <g className="rotating-arm">
        <text filter="url(#glow)">
          <textPath href="#spiralPath1" startOffset="0%">
            الرَّحْمَنُ · الرَّحِيمُ · الْمَلِكُ · الْقُدُّوسُ · السَّلَامُ · الْمُؤْمِنُ · الْمُهَيْمِنُ · الْعَزِيزُ · الْجَبَّارُ · الْمُتَكَبِّرُ · الْخَالِقُ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath2" startOffset="0%">
            الْبَارِئُ · الْمُصَوِّرُ · الْغَفَّارُ · الْقَهَّارُ · الْوَهَّابُ · الرَّزَّاقُ · الْفَتَّاحُ · الْعَلِيمُ · الْقَابِضُ · الْبَاسِطُ · الْخَافِضُ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath3" startOffset="0%">
            الْرَّافِعُ · الْمُعِزُّ · الْمُذِلُّ · السَّمِيعُ · الْبَصِيرُ · الْحَكَمُ · الْعَدْلُ · اللَّطِيفُ · الْخَبِيرُ · الْحَلِيمُ · الْعَظِيمُ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath4" startOffset="0%">
            الْغَفُورُ · الشَّكُورُ · الْعَلِيُّ · الْكَبِيرُ · الْحَفِيظُ · الْمُقيِتُ · الْحسِيبُ · الْجَلِيلُ · الْكَرِيمُ · الرَّقِيبُ · الْمُجِيبُ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath5" startOffset="0%">
            الْوَاسِعُ · الْحَكِيمُ · الْوَدُودُ · الْمَجِيدُ · الْبَاعِثُ · الشَّهِيدُ · الْحَقُّ · الْوَكِيلُ · الْقَوِيُّ · الْمَتِينُ · الْوَلِيُّ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath6" startOffset="0%">
            الْحَمِيدُ · الْمُحْصِي · الْمُبْدِئُ · الْمُعِيدُ · الْمُحْيِي · الْمُمِيتُ · الْحَيُّ · الْقَيُّومُ · الْوَاجِدُ · الْمَاجِدُ · الْواحِدُ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath7" startOffset="0%">
            الْأَحَدُ · الصَّمَدُ · الْقَادِرُ · الْمُقْتَدِرُ · الْمُقَدِّمُ · الْمُؤَخِّرُ · الْأَوَّلُ · الْآخِرُ · الظَّاهِرُ · الْبَاطِنُ · الْوَالِي ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath8" startOffset="0%">
            الْمُتَعَالِي · الْبَرُّ · التَّوَابُ · الْمُنْتَقِمُ · الْعَفُوُّ · الرَّؤُوفُ · مَالِكُ الْمُلْكِ · ذُوالْجَلاَلِ وَالإكْرَامِ · الْمُقْسِطُ · الْجَامِعُ · الْغَنيُّ ·
          </textPath>
        </text>
      
        <text filter="url(#glow)">
          <textPath href="#spiralPath9" startOffset="0%">
            الْمُغْنِي · الْمَانِعُ · الضَّارَ · النَّافِعُ · النُّورُ · الْهَادِي · الْبَدِيعُ · الْبَاقِي · الْوَارِثُ · الرَّشِيدُ · الصَّبُورُ ·
          </textPath>
        </text>
      </g>
      
    </svg>
  </div>
  </div>
  );
};

export default SpiralVisual;