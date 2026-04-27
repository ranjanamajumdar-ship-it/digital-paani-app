/* ============================================================
   Digital Paani — Language switcher
   13 languages. Hindi is the baseline. Translations target the
   most common strings — CTAs, status pills, tab labels, headings.
   Equipment names, units, sensor params remain in English.
   ============================================================ */
(function(){
  const LANGS = [
    { code:'hi', name:'हिंदी',     en:'Hindi'},
    { code:'en', name:'English',   en:'English'},
    { code:'mr', name:'मराठी',     en:'Marathi'},
    { code:'bn', name:'বাংলা',     en:'Bengali'},
    { code:'ta', name:'தமிழ்',      en:'Tamil'},
    { code:'te', name:'తెలుగు',    en:'Telugu'},
    { code:'kn', name:'ಕನ್ನಡ',     en:'Kannada'},
    { code:'ml', name:'മലയാളം',   en:'Malayalam'},
    { code:'pa', name:'ਪੰਜਾਬੀ',     en:'Punjabi'},
    { code:'gu', name:'ગુજરાતી',   en:'Gujarati'},
    { code:'ur', name:'اردو',     en:'Urdu', rtl:true},
    { code:'as', name:'অসমীয়া',   en:'Assamese'},
    { code:'or', name:'ଓଡ଼ିଆ',      en:'Odia'},
  ];

  // Each row: hindi-key, then translations.
  // Keep set focused on the most operator-facing strings.
  const T = {
    // CTAs
    'जांच शुरू करें': {en:'Start Diagnostic', mr:'तपासणी सुरू करा', bn:'পরীক্ষা শুরু করুন', ta:'பரிசோதனை தொடங்கு', te:'తనిఖీ ప్రారంభించండి', kn:'ಪರಿಶೀಲನೆ ಪ್ರಾರಂಭಿಸಿ', ml:'പരിശോധന തുടങ്ങുക', pa:'ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ', gu:'ચકાસણી શરૂ કરો', ur:'تشخیص شروع کریں', as:'পৰীক্ষা আৰম্ভ কৰক', or:'ଯାଞ୍ଚ ଆରମ୍ଭ କରନ୍ତୁ'},
    'आगे बढ़ें': {en:'Continue', mr:'पुढे जा', bn:'এগিয়ে যান', ta:'தொடர்க', te:'కొనసాగించండి', kn:'ಮುಂದುವರೆಯಿರಿ', ml:'തുടരുക', pa:'ਅੱਗੇ ਵਧੋ', gu:'આગળ વધો', ur:'آگے بڑھیں', as:'আগবাঢ়ক', or:'ଆଗକୁ ଯାଆନ୍ତୁ'},
    'जमा करें': {en:'Submit', mr:'जमा करा', bn:'জমা দিন', ta:'சமர்ப்பிக்க', te:'సమర్పించండి', kn:'ಸಲ್ಲಿಸಿ', ml:'സമർപ്പിക്കുക', pa:'ਜਮ੍ਹਾਂ ਕਰੋ', gu:'જમા કરો', ur:'جمع کریں', as:'দাখিল কৰক', or:'ଦାଖଲ କରନ୍ତୁ'},
    'हल करें': {en:'Resolve', mr:'सोडवा', bn:'সমাধান', ta:'தீர்க்க', te:'పరిష్కరించండి', kn:'ಪರಿಹರಿಸಿ', ml:'പരിഹരിക്കുക', pa:'ਹੱਲ ਕਰੋ', gu:'ઉકેલો', ur:'حل کریں', as:'সমাধান কৰক', or:'ସମାଧାନ କରନ୍ତୁ'},
    'आगे बढ़ाएं': {en:'Escalate', mr:'पुढे पाठवा', bn:'উপরে পাঠান', ta:'மேலே அனுப்பு', te:'పైకి పంపండి', kn:'ಮೇಲಕ್ಕೆ ಕಳುಹಿಸಿ', ml:'മുകളിലേക്ക് അയക്കുക', pa:'ਉੱਪਰ ਭੇਜੋ', gu:'ઉપર મોકલો', ur:'اوپر بھیجیں', as:'ওপৰলৈ পঠাওক', or:'ଉପରକୁ ପଠାନ୍ତୁ'},
    'अभी आगे बढ़ाएं': {en:'Escalate Now', mr:'आता पुढे पाठवा', bn:'এখনই পাঠান', ta:'இப்போது அனுப்பு', te:'ఇప్పుడే పంపండి', kn:'ಈಗಲೇ ಕಳುಹಿಸಿ', ml:'ഇപ്പോൾ അയക്കുക', pa:'ਹੁਣੇ ਉੱਪਰ ਭੇਜੋ', gu:'હમણાં મોકલો', ur:'ابھی بھیجیں', as:'এতিয়াই পঠাওক', or:'ଏବେ ପଠାନ୍ତୁ'},
    'समस्या दर्ज करें': {en:'Create Issue', mr:'समस्या नोंदवा', bn:'সমস্যা নথিভুক্ত করুন', ta:'பிரச்சினை பதிவு', te:'సమస్య నమోదు', kn:'ಸಮಸ್ಯೆ ನೋಂದಾಯಿಸಿ', ml:'പ്രശ്നം രേഖപ്പെടുത്തുക', pa:'ਸਮੱਸਿਆ ਦਰਜ ਕਰੋ', gu:'સમસ્યા નોંધો', ur:'مسئلہ درج کریں', as:'সমস্যা পঞ্জীকৰণ', or:'ସମସ୍ୟା ପଞ୍ଜୀକରଣ'},
    'समस्या देखें': {en:'View Issue', mr:'समस्या पहा', bn:'সমস্যা দেখুন', ta:'பிரச்சினை பார்', te:'సమస్య చూడండి', kn:'ಸಮಸ್ಯೆ ನೋಡಿ', ml:'പ്രശ്നം കാണുക', pa:'ਸਮੱਸਿਆ ਵੇਖੋ', gu:'સમસ્યા જુઓ', ur:'مسئلہ دیکھیں', as:'সমস্যা চাওক', or:'ସମସ୍ୟା ଦେଖନ୍ତୁ'},
    'समस्या जमा करें': {en:'Submit Issue', mr:'समस्या जमा करा', bn:'সমস্যা জমা দিন', ta:'பிரச்சினை சமர்ப்பி', te:'సమస్య సమర్పించండి', kn:'ಸಮಸ್ಯೆ ಸಲ್ಲಿಸಿ', ml:'പ്രശ്നം സമർപ്പിക്കുക', pa:'ਸਮੱਸਿਆ ਜਮ੍ਹਾਂ ਕਰੋ', gu:'સમસ્યા જમા કરો', ur:'مسئلہ جمع کریں', as:'সমস্যা দাখিল কৰক', or:'ସମସ୍ୟା ଦାଖଲ କରନ୍ତୁ'},
    'लॉगबुक भरें': {en:'Fill Logbook', mr:'लॉगबुक भरा', bn:'লগবুক ভরুন', ta:'லாக்புக் நிரப்பு', te:'లాగ్‌బుక్ నింపండి', kn:'ಲಾಗ್‌ಬುಕ್ ಭರ್ತಿ ಮಾಡಿ', ml:'ലോഗ്ബുക്ക് പൂരിപ്പിക്കുക', pa:'ਲੌਗਬੁੱਕ ਭਰੋ', gu:'લોગબુક ભરો', ur:'لاگ بک بھریں', as:'লগবুক পূৰণ কৰক', or:'ଲଗ୍‌ବୁକ୍ ପୂରଣ କରନ୍ତୁ'},
    'लॉगबुक जमा करें': {en:'Submit Logbook', mr:'लॉगबुक जमा करा', bn:'লগবুক জমা দিন', ta:'லாக்புக் சமர்ப்பி', te:'లాగ్‌బుక్ సమర్పించండి', kn:'ಲಾಗ್‌ಬುಕ್ ಸಲ್ಲಿಸಿ', ml:'ലോഗ്ബുക്ക് സമർപ്പിക്കുക', pa:'ਲੌਗਬੁੱਕ ਜਮ੍ਹਾਂ ਕਰੋ', gu:'લોગબુક જમા કરો', ur:'لاگ بک جمع کریں', as:'লগবুক দাখিল কৰক', or:'ଲଗ୍‌ବୁକ୍ ଦାଖଲ କରନ୍ତୁ'},
    'कैमरा खोलें': {en:'Open Camera', mr:'कॅमेरा उघडा', bn:'ক্যামেরা খুলুন', ta:'கேமரா திற', te:'కెమెరా తెరవండి', kn:'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ', ml:'ക്യാമറ തുറക്കുക', pa:'ਕੈਮਰਾ ਖੋਲ੍ਹੋ', gu:'કેમેરા ખોલો', ur:'کیمرہ کھولیں', as:'কেমেৰা খোলক', or:'କ୍ୟାମେରା ଖୋଲନ୍ତୁ'},
    'नोट जोड़ें': {en:'Add Note', mr:'नोट जोडा', bn:'নোট যোগ', ta:'குறிப்பு சேர்', te:'గమనిక జోడించండి', kn:'ಟಿಪ್ಪಣಿ ಸೇರಿಸಿ', ml:'കുറിപ്പ് ചേർക്കുക', pa:'ਨੋਟ ਜੋੜੋ', gu:'નોંધ ઉમેરો', ur:'نوٹ شامل کریں', as:'টোকা যোগ কৰক', or:'ଟୀକା ଯୋଡ଼ନ୍ତୁ'},
    'रद्द करें': {en:'Cancel', mr:'रद्द करा', bn:'বাতিল', ta:'ரத்து', te:'రద్దు', kn:'ರದ್ದು', ml:'റദ്ദാക്കുക', pa:'ਰੱਦ ਕਰੋ', gu:'રદ કરો', ur:'منسوخ', as:'বাতিল', or:'ବାତିଲ'},
    'पीछे': {en:'Back', mr:'मागे', bn:'পিছনে', ta:'பின்', te:'వెనుక', kn:'ಹಿಂದೆ', ml:'പിന്നോട്ട്', pa:'ਪਿੱਛੇ', gu:'પાછા', ur:'پیچھے', as:'পিছলৈ', or:'ପଛକୁ'},
    'शुरू करें': {en:'Start', mr:'सुरू', bn:'শুরু', ta:'தொடங்கு', te:'ప్రారంభించు', kn:'ಪ್ರಾರಂಭ', ml:'ആരംഭിക്കുക', pa:'ਸ਼ੁਰੂ', gu:'શરૂ', ur:'شروع', as:'আৰম্ভ', or:'ଆରମ୍ଭ'},
    'अभी शुरू करें': {en:'Start Now', mr:'आता सुरू करा', bn:'এখনই শুরু', ta:'இப்போது தொடங்கு', te:'ఇప్పుడే ప్రారంభించండి', kn:'ಈಗಲೇ ಪ್ರಾರಂಭಿಸಿ', ml:'ഇപ്പോൾ ആരംഭിക്കുക', pa:'ਹੁਣੇ ਸ਼ੁਰੂ ਕਰੋ', gu:'હમણાં શરૂ', ur:'ابھی شروع کریں', as:'এতিয়াই আৰম্ভ', or:'ଏବେ ଆରମ୍ଭ'},
    'सही': {en:'Pass', mr:'योग्य', bn:'ঠিক', ta:'சரி', te:'సరి', kn:'ಸರಿ', ml:'ശരി', pa:'ਠੀਕ', gu:'સાચું', ur:'صحیح', as:'ঠিক', or:'ଠିକ'},
    'गलत': {en:'Fail', mr:'चूक', bn:'ভুল', ta:'தவறு', te:'తప్పు', kn:'ತಪ್ಪು', ml:'തെറ്റ്', pa:'ਗਲਤ', gu:'ખોટું', ur:'غلط', as:'ভুল', or:'ଭୁଲ'},
    'स्वीकार': {en:'Accept', mr:'स्वीकार', bn:'গ্রহণ', ta:'ஏற்க', te:'అంగీకరించు', kn:'ಸ್ವೀಕರಿಸಿ', ml:'സ്വീകരിക്കുക', pa:'ਸਵੀਕਾਰ', gu:'સ્વીકાર', ur:'قبول', as:'গ্ৰহণ', or:'ଗ୍ରହଣ'},
    'अस्वीकार': {en:'Decline', mr:'नाकार', bn:'প্রত্যাখ্যান', ta:'மறு', te:'తిరస్కరించు', kn:'ತಿರಸ್ಕರಿಸಿ', ml:'നിരസിക്കുക', pa:'ਇਨਕਾਰ', gu:'નકારો', ur:'انکار', as:'প্ৰত্যাখ্যান', or:'ପ୍ରତ୍ୟାଖ୍ୟାନ'},
    'कॉल': {en:'Call', mr:'कॉल', bn:'কল', ta:'அழை', te:'కాల్', kn:'ಕರೆ', ml:'വിളിക്കുക', pa:'ਕਾਲ', gu:'કૉલ', ur:'کال', as:'কল', or:'କଲ'},
    'बाद में': {en:'Snooze', mr:'नंतर', bn:'পরে', ta:'பின்னர்', te:'తర్వాత', kn:'ನಂತರ', ml:'പിന്നീട്', pa:'ਬਾਅਦ ਵਿੱਚ', gu:'પછી', ur:'بعد میں', as:'পিছত', or:'ପରେ'},
    'दोबारा लें': {en:'Retake', mr:'पुन्हा घ्या', bn:'আবার তুলুন', ta:'மீண்டும் எடு', te:'మళ్లీ తీసుకో', kn:'ಮತ್ತೆ ಪಡೆ', ml:'വീണ്ടും എടുക്കുക', pa:'ਦੁਬਾਰਾ ਲਓ', gu:'ફરી લો', ur:'دوبارہ لیں', as:'পুনৰ লওক', or:'ପୁଣି ନିଅନ୍ତୁ'},

    // Status
    'गंभीर': {en:'Critical', mr:'गंभीर', bn:'গুরুতর', ta:'அவசர', te:'తీవ్రమైన', kn:'ಗಂಭೀರ', ml:'ഗുരുതരം', pa:'ਗੰਭੀਰ', gu:'ગંભીર', ur:'سنگین', as:'গুৰুতৰ', or:'ଗୁରୁତର'},
    'चेतावनी': {en:'Warning', mr:'इशारा', bn:'সতর্কতা', ta:'எச்சரிக்கை', te:'హెచ్చరిక', kn:'ಎಚ್ಚರಿಕೆ', ml:'മുന്നറിയിപ്പ്', pa:'ਚੇਤਾਵਨੀ', gu:'ચેતવણી', ur:'انتباہ', as:'সতৰ্কতা', or:'ସତର୍କତା'},
    'चल रहा है': {en:'In progress', mr:'चालू', bn:'চলমান', ta:'நடைபெறுகிறது', te:'జరుగుతోంది', kn:'ನಡೆಯುತ್ತಿದೆ', ml:'നടക്കുന്നു', pa:'ਚੱਲ ਰਿਹਾ', gu:'ચાલુ', ur:'جاری', as:'চলি আছে', or:'ଚାଲିଛି'},
    'हल हुआ': {en:'Resolved', mr:'सोडवले', bn:'সমাধান', ta:'தீர்க்கப்பட்டது', te:'పరిష్కరించబడింది', kn:'ಪರಿಹಾರ', ml:'പരിഹരിച്ചു', pa:'ਹੱਲ ਹੋਇਆ', gu:'ઉકેલ્યું', ur:'حل ہو گیا', as:'সমাধান হ\'ল', or:'ସମାଧାନ ହୋଇଛି'},
    'बाकी': {en:'Pending', mr:'बाकी', bn:'বাকি', ta:'நிலுவை', te:'పెండింగ్', kn:'ಬಾಕಿ', ml:'ബാക്കി', pa:'ਬਾਕੀ', gu:'બાકી', ur:'باقی', as:'বাকী', or:'ବାକି'},
    'ठीक': {en:'Healthy', mr:'ठीक', bn:'ভাল', ta:'நலம்', te:'మంచిది', kn:'ಚೆನ್ನಾಗಿದೆ', ml:'നല്ലത്', pa:'ਠੀਕ', gu:'સારું', ur:'ٹھیک', as:'ভাল', or:'ଭଲ'},
    'मरम्मत': {en:'Maintenance', mr:'दुरुस्ती', bn:'মেরামত', ta:'பராமரிப்பு', te:'మెయింటెనెన్స్', kn:'ನಿರ್ವಹಣೆ', ml:'അറ്റകുറ്റപ്പണി', pa:'ਮੁਰੰਮਤ', gu:'જાળવણી', ur:'مرمت', as:'মেৰামতি', or:'ମରାମତି'},
    'पुरानी शिफ्ट': {en:'Transferred', mr:'मागील शिफ्ट', bn:'পূর্ব শিফট', ta:'முந்தைய ஷிப்ட்', te:'పాత షిఫ్ట్', kn:'ಹಿಂದಿನ ಶಿಫ್ಟ್', ml:'പഴയ ഷിഫ്റ്റ്', pa:'ਪਿਛਲੀ ਸ਼ਿਫਟ', gu:'જૂની શિફ્ટ', ur:'پچھلی شفٹ', as:'পুৰণা শ্বিফ্ট', or:'ପୁରୁଣା ସିଫ୍ଟ'},
    'हल नहीं हुआ': {en:'Unresolved', mr:'न सोडवलेले', bn:'অসমাধান', ta:'தீர்க்கப்படவில்லை', te:'పరిష్కరించని', kn:'ಪರಿಹಾರವಾಗದ', ml:'പരിഹരിക്കാത്ത', pa:'ਅਣਸੁਲਝਿਆ', gu:'અનિર્ણીત', ur:'غیر حل', as:'অসমাধান', or:'ଅସମାଧାନ'},
    'सक्रिय': {en:'Active', mr:'सक्रिय', bn:'সক্রিয়', ta:'செயலில்', te:'క్రియాశీలం', kn:'ಸಕ್ರಿಯ', ml:'സജീവം', pa:'ਸਰਗਰਮ', gu:'સક્રિય', ur:'فعال', as:'সক্ৰিয়', or:'ସକ୍ରିୟ'},
    'ज़रूरी': {en:'Required', mr:'आवश्यक', bn:'প্রয়োজনীয়', ta:'அவசியம்', te:'అవసరం', kn:'ಅಗತ್ಯ', ml:'ആവശ്യം', pa:'ਜ਼ਰੂਰੀ', gu:'જરૂરી', ur:'ضروری', as:'প্ৰয়োজনীয়', or:'ଆବଶ୍ୟକ'},
    'लाइव': {en:'Live', mr:'थेट', bn:'লাইভ', ta:'நேரடி', te:'లైవ్', kn:'ಲೈವ್', ml:'തത്സമയം', pa:'ਲਾਈਵ', gu:'લાઇવ', ur:'لائیو', as:'প্ৰত্যক্ষ', or:'ଲାଇଭ'},

    // Tabs / sections
    'समस्याएँ': {en:'Issues', mr:'समस्या', bn:'সমস্যা', ta:'பிரச்சினைகள்', te:'సమస్యలు', kn:'ಸಮಸ್ಯೆಗಳು', ml:'പ്രശ്നങ്ങൾ', pa:'ਸਮੱਸਿਆਵਾਂ', gu:'સમસ્યાઓ', ur:'مسائل', as:'সমস্যাসমূহ', or:'ସମସ୍ୟାଗୁଡ଼ିକ'},
    'काम': {en:'Tasks', mr:'कामे', bn:'কাজ', ta:'பணிகள்', te:'పనులు', kn:'ಕಾರ್ಯಗಳು', ml:'ജോലികൾ', pa:'ਕੰਮ', gu:'કામ', ur:'کام', as:'কাম', or:'କାମ'},
    'प्लांट': {en:'Plant', mr:'प्लांट', bn:'প্ল্যান্ট', ta:'ஆலை', te:'ప్లాంట్', kn:'ಪ್ಲಾಂಟ್', ml:'പ്ലാന്റ്', pa:'ਪਲਾਂਟ', gu:'પ્લાન્ટ', ur:'پلانٹ', as:'প্লাণ্ট', or:'ପ୍ଲାଣ୍ଟ'},
    'रिपोर्ट': {en:'Report', mr:'रिपोर्ट', bn:'রিপোর্ট', ta:'அறிக்கை', te:'రిపోర్ట్', kn:'ವರದಿ', ml:'റിപ്പോർട്ട്', pa:'ਰਿਪੋਰਟ', gu:'રિપોર્ટ', ur:'رپورٹ', as:'প্ৰতিবেদন', or:'ରିପୋର୍ଟ'},
    'मशीनें': {en:'Equipment', mr:'मशीन', bn:'যন্ত্রপাতি', ta:'உபகரணம்', te:'పరికరాలు', kn:'ಉಪಕರಣ', ml:'ഉപകരണം', pa:'ਮਸ਼ੀਨ', gu:'સાધનો', ur:'مشینیں', as:'যন্ত্ৰপাতি', or:'ଯନ୍ତ୍ରପାତି'},
    'लॉगबुक': {en:'Logbook', mr:'लॉगबुक', bn:'লগবুক', ta:'பதிவேடு', te:'లాగ్‌బుక్', kn:'ಲಾಗ್‌ಬುಕ್', ml:'ലോഗ്ബുക്ക്', pa:'ਲੌਗਬੁੱਕ', gu:'લોગબુક', ur:'لاگ بک', as:'লগবুক', or:'ଲଗ୍‌ବୁକ୍'},
    'आज': {en:'Today', mr:'आज', bn:'আজ', ta:'இன்று', te:'నేడు', kn:'ಇಂದು', ml:'ഇന്ന്', pa:'ਅੱਜ', gu:'આજે', ur:'آج', as:'আজি', or:'ଆଜି'},
    'आने वाले': {en:'Upcoming', mr:'आगामी', bn:'আসন্ন', ta:'வரவிருக்கும்', te:'రాబోయే', kn:'ಮುಂಬರುವ', ml:'വരാനിരിക്കുന്ന', pa:'ਆਉਣ ਵਾਲੇ', gu:'આવનારા', ur:'آنے والے', as:'অহাবোৰ', or:'ଆସୁଥିବା'},
    'देर हुए': {en:'Overdue', mr:'मुदत संपलेले', bn:'বিলম্বিত', ta:'தாமதம்', te:'ఆలస్యం', kn:'ತಡವಾದ', ml:'വൈകിയ', pa:'ਦੇਰੀ ਵਾਲੇ', gu:'મોડા થયેલા', ur:'تاخیر زدہ', as:'পলম হোৱা', or:'ବିଳମ୍ବିତ'},
    'पूरे हुए': {en:'Done', mr:'पूर्ण', bn:'সম্পন্ন', ta:'முடிந்தது', te:'పూర్తి', kn:'ಮುಗಿದ', ml:'പൂർത്തിയായി', pa:'ਮੁਕੰਮਲ', gu:'પૂર્ણ', ur:'مکمل', as:'সম্পূৰ্ণ', or:'ସମ୍ପୂର୍ଣ୍ଣ'},
    'खुले': {en:'Open', mr:'उघडे', bn:'খোলা', ta:'திறந்த', te:'తెరిచిన', kn:'ತೆರೆದ', ml:'തുറന്ന', pa:'ਖੁੱਲ੍ਹੇ', gu:'ખુલ્લા', ur:'کھلے', as:'খোলা', or:'ଖୋଲା'},
    'हल हुए': {en:'Resolved', mr:'सोडवलेले', bn:'সমাধান হয়েছে', ta:'தீர்க்கப்பட்டவை', te:'పరిష్కరించబడ్డవి', kn:'ಪರಿಹಾರವಾದ', ml:'പരിഹരിച്ചവ', pa:'ਹੱਲ ਹੋਏ', gu:'ઉકેલેલા', ur:'حل شدہ', as:'সমাধান হোৱা', or:'ସମାଧାନ ହୋଇଥିବା'},
    'हल नहीं हुए': {en:'Unresolved', mr:'न सुटलेले', bn:'অমীমাংসিত', ta:'தீராதவை', te:'పరిష్కరించని', kn:'ಪರಿಹಾರವಾಗದ', ml:'പരിഹരിക്കാത്തവ', pa:'ਅਣਸੁਲਝੇ', gu:'અણઉકેલ', ur:'غیر حل شدہ', as:'অসমাধান', or:'ଅସମାଧାନ'},

    // Common headings
    'सभी समस्याएँ': {en:'All issues', mr:'सर्व समस्या', bn:'সকল সমস্যা', ta:'அனைத்து பிரச்சினைகள்', te:'అన్ని సమస్యలు', kn:'ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳು', ml:'എല്ലാ പ്രശ്നങ്ങളും', pa:'ਸਾਰੀਆਂ ਸਮੱਸਿਆਵਾਂ', gu:'બધી સમસ્યાઓ', ur:'تمام مسائل', as:'সকলো সমস্যা', or:'ସବୁ ସମସ୍ୟା'},
    'आज का काम': {en:'Today\'s work', mr:'आजचे काम', bn:'আজকের কাজ', ta:'இன்றைய பணி', te:'నేటి పని', kn:'ಇಂದಿನ ಕೆಲಸ', ml:'ഇന്നത്തെ ജോലി', pa:'ਅੱਜ ਦਾ ਕੰਮ', gu:'આજનું કામ', ur:'آج کا کام', as:'আজিৰ কাম', or:'ଆଜିର କାମ'},
    'नई समस्या दर्ज करें': {en:'Report new issue', mr:'नवीन समस्या नोंदवा', bn:'নতুন সমস্যা নথিভুক্ত করুন', ta:'புதிய பிரச்சினை பதிவு', te:'కొత్త సమస్య నమోదు', kn:'ಹೊಸ ಸಮಸ್ಯೆ ನೋಂದಣಿ', ml:'പുതിയ പ്രശ്നം രേഖപ്പെടുത്തുക', pa:'ਨਵੀਂ ਸਮੱਸਿਆ ਦਰਜ', gu:'નવી સમસ્યા નોંધો', ur:'نیا مسئلہ درج کریں', as:'নতুন সমস্যা পঞ্জীকৰণ', or:'ନୂଆ ସମସ୍ୟା ପଞ୍ଜୀକରଣ'},
    'स्मार्ट लॉगबुक': {en:'Smart Logbook', mr:'स्मार्ट लॉगबुक', bn:'স্মার্ট লগবুক', ta:'ஸ்மார்ட் லாக்புக்', te:'స్మార్ట్ లాగ్‌బుక్', kn:'ಸ್ಮಾರ್ಟ್ ಲಾಗ್‌ಬುಕ್', ml:'സ്മാർട്ട് ലോഗ്ബുക്ക്', pa:'ਸਮਾਰਟ ਲੌਗਬੁੱਕ', gu:'સ્માર્ટ લોગબુક', ur:'سمارٹ لاگ بک', as:'স্মাৰ্ট লগবুক', or:'ସ୍ମାର୍ଟ ଲଗ୍‌ବୁକ୍'},
    'प्लांट का दृश्य': {en:'Plant overview', mr:'प्लांट दृश्य', bn:'প্ল্যান্ট ওভারভিউ', ta:'ஆலை மேலோட்டம்', te:'ప్లాంట్ అవలోకనం', kn:'ಪ್ಲಾಂಟ್ ಅವಲೋಕನ', ml:'പ്ലാന്റ് ഓവർവ്യൂ', pa:'ਪਲਾਂਟ ਨਜ਼ਾਰਾ', gu:'પ્લાન્ટ ઝાંખી', ur:'پلانٹ کا جائزہ', as:'প্লাণ্ট চমু বিৱৰণ', or:'ପ୍ଲାଣ୍ଟ ସମୀକ୍ଷା'},

    // CTA on launcher
    'मोबाइल प्रोटोटाइप खोलें': {en:'Open mobile prototype', mr:'मोबाइल प्रोटोटाइप उघडा', bn:'মোবাইল প্রোটোটাইপ খুলুন', ta:'மொபைல் முன்மாதிரி திற', te:'మొబైల్ ప్రోటోటైప్ తెరవండి', kn:'ಮೊಬೈಲ್ ಪ್ರೊಟೋಟೈಪ್ ತೆರೆಯಿರಿ', ml:'മൊബൈൽ പ്രോട്ടോടൈപ്പ് തുറക്കുക', pa:'ਮੋਬਾਈਲ ਪ੍ਰੋਟੋਟਾਈਪ ਖੋਲ੍ਹੋ', gu:'મોબાઇલ પ્રોટોટાઇપ ખોલો', ur:'موبائل پروٹوٹائپ کھولیں', as:'মোবাইল প্ৰটোটাইপ খোলক', or:'ମୋବାଇଲ୍ ପ୍ରୋଟୋଟାଇପ୍ ଖୋଲନ୍ତୁ'},
    'डेस्कटॉप व्यू खोलें': {en:'Open desktop view', mr:'डेस्कटॉप दृश्य उघडा', bn:'ডেস্কটপ ভিউ খুলুন', ta:'டெஸ்க்டாப் காட்சி திற', te:'డెస్క్‌టాప్ వ్యూ తెరవండి', kn:'ಡೆಸ್ಕ್‌ಟಾಪ್ ವೀಕ್ಷಣೆ ತೆರೆ', ml:'ഡെസ്‌ക്‌ടോപ്പ് കാഴ്ച തുറക്കുക', pa:'ਡੈਸਕਟਾਪ ਵਿਊ ਖੋਲ੍ਹੋ', gu:'ડેસ્કટોપ વ્યુ ખોલો', ur:'ڈیسک ٹاپ ویو کھولیں', as:'ডেস্কটপ দৃশ্য খোলক', or:'ଡେସ୍କଟପ୍ ଭ୍ୟୁ ଖୋଲନ୍ତୁ'},
    'डिज़ाइन सिस्टम': {en:'Design system', mr:'डिझाइन सिस्टम', bn:'ডিজাইন সিস্টেম', ta:'வடிவமைப்பு அமைப்பு', te:'డిజైన్ సిస్టమ్', kn:'ವಿನ್ಯಾಸ ವ್ಯವಸ್ಥೆ', ml:'ഡിസൈൻ സിസ്റ്റം', pa:'ਡਿਜ਼ਾਈਨ ਸਿਸਟਮ', gu:'ડિઝાઇન સિસ્ટમ', ur:'ڈیزائن سسٹم', as:'ডিজাইন ছিষ্টেম', or:'ଡିଜାଇନ୍ ସିଷ୍ଟମ'},

    // Diagnostic flow
    'सिस्टम ने पाया': {en:'System detected', mr:'सिस्टमला आढळले', bn:'সিস্টেম শনাক্ত করেছে', ta:'அமைப்பு கண்டறிந்தது', te:'సిస్టం గుర్తించింది', kn:'ಸಿಸ್ಟಮ್ ಪತ್ತೆಹಚ್ಚಿತು', ml:'സിസ്റ്റം കണ്ടെത്തി', pa:'ਸਿਸਟਮ ਨੇ ਲੱਭਿਆ', gu:'સિસ્ટમે શોધ્યું', ur:'سسٹم نے پہچانا', as:'চিষ্টেমে চিনাক্ত কৰিলে', or:'ସିଷ୍ଟମ ଚିହ୍ନଟ କଲା'},
    'सिस्टम सुझाव': {en:'System insight', mr:'सिस्टम सुचना', bn:'সিস্টেম পরামর্শ', ta:'அமைப்பு பரிந்துரை', te:'సిస్టం సూచన', kn:'ಸಿಸ್ಟಮ್ ಸಲಹೆ', ml:'സിസ്റ്റം നിർദ്ദേശം', pa:'ਸਿਸਟਮ ਸੁਝਾਅ', gu:'સિસ્ટમ સૂચન', ur:'سسٹم تجویز', as:'চিষ্টেম পৰামৰ্শ', or:'ସିଷ୍ଟମ ପରାମର୍ଶ'},
    'सुझाव': {en:'Suggested fix', mr:'सुचवलेले निराकरण', bn:'সুপারিশকৃত সমাধান', ta:'பரிந்துரை', te:'సూచన', kn:'ಸೂಚನೆ', ml:'നിർദ്ദേശം', pa:'ਸੁਝਾਅ', gu:'સૂચન', ur:'تجویز', as:'পৰামৰ্শ', or:'ପରାମର୍ଶ'},
    'कार्य योजना': {en:'Action plan', mr:'कृती योजना', bn:'কার্য পরিকল্পনা', ta:'செயல் திட்டம்', te:'కార్యాచరణ ప్రణాళిక', kn:'ಕ್ರಿಯಾ ಯೋಜನೆ', ml:'പ്രവർത്തന പദ്ധതി', pa:'ਕਾਰਜ ਯੋਜਨਾ', gu:'કાર્ય યોજના', ur:'ایکشن پلان', as:'কাৰ্য পৰিকল্পনা', or:'କାର୍ଯ୍ୟ ଯୋଜନା'},
  };

  // ===== Apply translations =====
  function getCurrentLang(){
    try { return localStorage.getItem('dp.lang') || 'hi'; } catch(e) { return 'hi'; }
  }
  function setLang(code){
    try { localStorage.setItem('dp.lang', code); } catch(e) {}
    apply(code);
    // Update RTL on body
    document.documentElement.dir = code === 'ur' ? 'rtl' : 'ltr';
    // Update picker label
    const label = document.querySelector('.lang-picker .current');
    if (label) {
      const l = LANGS.find(x => x.code === code);
      if (l) label.textContent = l.name;
    }
    // Update active state
    document.querySelectorAll('.lang-menu a').forEach(a => {
      a.classList.toggle('active', a.dataset.lang === code);
    });
  }
  function apply(code){
    if (code === 'hi') {
      // Restore Hindi from data-orig snapshot
      document.querySelectorAll('[data-i18n-orig]').forEach(el => {
        el.textContent = el.dataset.i18nOrig;
      });
      return;
    }
    // First time? capture the current Hindi text into data-orig.
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (!el.dataset.i18nOrig) el.dataset.i18nOrig = el.textContent;
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18nOrig.trim();
      const entry = T[key];
      if (entry && entry[code]) el.textContent = entry[code];
      else if (code === 'en') {
        const e = T[key];
        if (e && e.en) el.textContent = e.en;
      } else {
        el.textContent = el.dataset.i18nOrig;  // fallback
      }
    });
  }

  // Auto-tag visible text nodes that match known keys.
  function autoTag(){
    const keys = Object.keys(T);
    const skipTags = new Set(['SCRIPT','STYLE','SVG','PATH','RECT','CIRCLE','LINE','TEXT','TITLE','META','LINK']);
    function walk(node){
      if (node.nodeType === 1) {
        if (skipTags.has(node.tagName)) return;
        if (node.dataset && 'i18n' in node.dataset) return; // already tagged
        for (const c of node.childNodes) walk(c);
        // If element has exactly one text child and that text is a known key, tag it
        if (node.children.length === 0) {
          const t = (node.textContent || '').trim();
          if (t && keys.includes(t)) {
            node.dataset.i18n = '1';
            node.dataset.i18nOrig = t;
          }
        }
      }
    }
    walk(document.body);
  }

  // ===== Picker UI =====
  function injectPicker(){
    if (document.querySelector('.lang-picker')) return;
    const cur = getCurrentLang();
    const curName = (LANGS.find(l => l.code === cur) || LANGS[0]).name;
    const wrap = document.createElement('div');
    wrap.className = 'lang-picker';
    wrap.innerHTML = `
      <button class="trigger" type="button" aria-expanded="false">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13" stroke="currentColor" stroke-width="1.2"/></svg>
        <span class="current">${curName}</span>
        <svg viewBox="0 0 16 16" fill="none" width="10" height="10"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="lang-menu" role="menu">
        ${LANGS.map(l => `<a data-lang="${l.code}" class="${l.code===cur?'active':''}"><span class="native">${l.name}</span><span class="latin">${l.en}</span></a>`).join('')}
      </div>`;
    document.body.appendChild(wrap);
    const trigger = wrap.querySelector('.trigger');
    const menu = wrap.querySelector('.lang-menu');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        setLang(a.dataset.lang);
        wrap.classList.remove('open');
      });
    });
  }

  function init(){
    autoTag();
    injectPicker();
    const lang = getCurrentLang();
    if (lang !== 'hi') setLang(lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.DPLang = { setLang, getCurrentLang, LANGS };
})();
