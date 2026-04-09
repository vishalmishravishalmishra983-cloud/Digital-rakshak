// Multi-language training data for Scam Training Mode

export const supportedLanguages = [
  { code: "en", label: "English", speechLang: "en-IN" },
  { code: "hi", label: "हिन्दी", speechLang: "hi-IN" },
  { code: "ta", label: "தமிழ்", speechLang: "ta-IN" },
  { code: "te", label: "తెలుగు", speechLang: "te-IN" },
  { code: "bn", label: "বাংলা", speechLang: "bn-IN" },
  { code: "mr", label: "मराठी", speechLang: "mr-IN" },
  { code: "gu", label: "ગુજરાતી", speechLang: "gu-IN" },
  { code: "kn", label: "ಕನ್ನಡ", speechLang: "kn-IN" },
] as const;

export type LangCode = (typeof supportedLanguages)[number]["code"];

interface CallScenario {
  caller: string;
  message: string;
  isScam: boolean;
  explanation: string;
}

interface SmsQuiz {
  text: string;
  isScam: boolean;
  explanation: string;
}

interface LinkQuiz {
  url: string;
  isScam: boolean;
  explanation: string;
}

// ─── Call Scenarios ──────────────────────────────────────────────
const callScenarios: Record<LangCode, CallScenario[]> = {
  en: [
    { caller: "SBI Bank Manager", message: "Your account will be blocked in 2 hours. Share your OTP to verify your identity immediately.", isScam: true, explanation: "Banks never ask for OTP over phone. This is a classic impersonation scam." },
    { caller: "Amazon Delivery", message: "Your order #4821 is out for delivery. It will arrive by 5 PM today.", isScam: false, explanation: "This is a normal delivery notification with no suspicious requests." },
    { caller: "RBI Officer", message: "Your PAN is linked to money laundering. Transfer ₹50,000 to avoid arrest.", isScam: true, explanation: "RBI never calls individuals. No government body demands money over phone." },
    { caller: "Insurance Agent", message: "Congratulations! You won a free insurance policy worth ₹10 Lakhs. Share your Aadhaar to claim.", isScam: true, explanation: "Unsolicited prize offers asking for Aadhaar are always scams." },
    { caller: "Mom", message: "Come home for dinner tonight by 8 PM.", isScam: false, explanation: "A normal personal call from family. No suspicious elements." },
    { caller: "Customs Department", message: "A parcel in your name contains illegal items. Pay ₹25,000 fine or face arrest. Press 1.", isScam: true, explanation: "Customs never demands payment over phone. Press-1 prompts are a red flag." },
  ],
  hi: [
    { caller: "SBI बैंक मैनेजर", message: "आपका अकाउंट 2 घंटे में ब्लॉक हो जाएगा। अपनी पहचान सत्यापित करने के लिए तुरंत OTP शेयर करें।", isScam: true, explanation: "बैंक कभी फोन पर OTP नहीं मांगता। यह एक क्लासिक धोखाधड़ी है।" },
    { caller: "Amazon डिलीवरी", message: "आपका ऑर्डर #4821 डिलीवरी के लिए निकल चुका है। आज शाम 5 बजे तक पहुंच जाएगा।", isScam: false, explanation: "यह एक सामान्य डिलीवरी सूचना है, कोई संदिग्ध अनुरोध नहीं है।" },
    { caller: "RBI अधिकारी", message: "आपका PAN मनी लॉन्ड्रिंग से जुड़ा है। गिरफ्तारी से बचने के लिए ₹50,000 ट्रांसफर करें।", isScam: true, explanation: "RBI कभी व्यक्तिगत कॉल नहीं करता। कोई सरकारी संस्था फोन पर पैसे नहीं मांगती।" },
    { caller: "बीमा एजेंट", message: "बधाई हो! आपने ₹10 लाख की मुफ्त बीमा पॉलिसी जीती है। दावा करने के लिए आधार शेयर करें।", isScam: true, explanation: "आधार मांगने वाली अनचाही पुरस्कार ऑफर हमेशा धोखाधड़ी होती हैं।" },
    { caller: "माँ", message: "बेटा, आज डिनर पर आ जाना। 8 बजे तक आ जाना।", isScam: false, explanation: "परिवार से एक सामान्य कॉल। कोई संदिग्ध तत्व नहीं।" },
    { caller: "कस्टम विभाग", message: "आपके नाम का एक पार्सल में अवैध सामान है। ₹25,000 जुर्माना भरें वरना गिरफ्तारी होगी। 1 दबाएं।", isScam: true, explanation: "कस्टम कभी फोन पर भुगतान नहीं मांगता। 1 दबाने का संकेत एक खतरे का संकेत है।" },
  ],
  ta: [
    { caller: "SBI வங்கி மேலாளர்", message: "உங்கள் கணக்கு 2 மணி நேரத்தில் முடக்கப்படும். உடனடியாக OTP பகிரவும்.", isScam: true, explanation: "வங்கிகள் ஒருபோதும் OTP கேட்காது. இது ஒரு மோசடி." },
    { caller: "Amazon டெலிவரி", message: "உங்கள் ஆர்டர் #4821 டெலிவரிக்கு அனுப்பப்பட்டது. மாலை 5 மணிக்கு வரும்.", isScam: false, explanation: "இது சாதாரண டெலிவரி அறிவிப்பு." },
    { caller: "RBI அதிகாரி", message: "உங்கள் PAN பணமோசடியுடன் இணைக்கப்பட்டுள்ளது. கைது தவிர்க்க ₹50,000 அனுப்பவும்.", isScam: true, explanation: "RBI தனிநபர்களை அழைக்காது. அரசு அமைப்பு போனில் பணம் கேட்காது." },
    { caller: "காப்பீட்டு முகவர்", message: "வாழ்த்துகள்! ₹10 லட்சம் காப்பீடு வென்றீர்கள். ஆதார் பகிரவும்.", isScam: true, explanation: "ஆதார் கேட்கும் பரிசு வாக்குறுதிகள் எப்போதும் மோசடி." },
    { caller: "அம்மா", message: "இன்று இரவு சாப்பாட்டுக்கு வா. 8 மணிக்கு வா.", isScam: false, explanation: "குடும்பத்திடமிருந்து சாதாரண அழைப்பு." },
    { caller: "சுங்கத் துறை", message: "உங்கள் பெயரில் சட்டவிரோத பொருட்கள் உள்ள பார்சல். ₹25,000 அபராதம் செலுத்தவும். 1 அழுத்தவும்.", isScam: true, explanation: "சுங்கம் ஒருபோதும் போனில் பணம் கேட்காது." },
  ],
  te: [
    { caller: "SBI బ్యాంక్ మేనేజర్", message: "మీ ఖాతా 2 గంటల్లో బ్లాక్ అవుతుంది. వెంటనే OTP షేర్ చేయండి.", isScam: true, explanation: "బ్యాంకులు ఫోన్‌లో OTP అడగవు. ఇది మోసం." },
    { caller: "Amazon డెలివరీ", message: "మీ ఆర్డర్ #4821 డెలివరీకి బయలుదేరింది. సాయంత్రం 5 గంటలకు వస్తుంది.", isScam: false, explanation: "ఇది సాధారణ డెలివరీ నోటిఫికేషన్." },
    { caller: "RBI అధికారి", message: "మీ PAN మనీ లాండరింగ్‌తో లింక్ అయింది. అరెస్ట్ నుండి తప్పించుకోవడానికి ₹50,000 ట్రాన్స్‌ఫర్ చేయండి.", isScam: true, explanation: "RBI వ్యక్తులకు కాల్ చేయదు. ఏ ప్రభుత్వ సంస్థ ఫోన్‌లో డబ్బు అడగదు." },
    { caller: "బీమా ఏజెంట్", message: "అభినందనలు! మీరు ₹10 లక్షల బీమా పాలసీ గెలిచారు. ఆధార్ షేర్ చేయండి.", isScam: true, explanation: "ఆధార్ అడిగే బహుమతి ఆఫర్లు ఎల్లప్పుడూ మోసం." },
    { caller: "అమ్మ", message: "ఈ రోజు రాత్రి డిన్నర్‌కి రా. 8 గంటలకు రా.", isScam: false, explanation: "కుటుంబం నుండి సాధారణ కాల్." },
    { caller: "కస్టమ్స్ డిపార్ట్‌మెంట్", message: "మీ పేరున చట్టవిరుద్ధ వస్తువులు ఉన్న పార్సెల్. ₹25,000 జరిమానా చెల్లించండి. 1 నొక్కండి.", isScam: true, explanation: "కస్టమ్స్ ఫోన్‌లో చెల్లింపు అడగదు." },
  ],
  bn: [
    { caller: "SBI ব্যাংক ম্যানেজার", message: "আপনার অ্যাকাউন্ট 2 ঘণ্টায় ব্লক হয়ে যাবে। এখনই OTP শেয়ার করুন।", isScam: true, explanation: "ব্যাংক কখনো ফোনে OTP চায় না। এটি প্রতারণা।" },
    { caller: "Amazon ডেলিভারি", message: "আপনার অর্ডার #4821 ডেলিভারির জন্য বের হয়েছে। বিকেল 5টায় পৌঁছাবে।", isScam: false, explanation: "এটি একটি সাধারণ ডেলিভারি বিজ্ঞপ্তি।" },
    { caller: "RBI অফিসার", message: "আপনার PAN মানি লন্ডারিংয়ের সাথে যুক্ত। গ্রেপ্তার এড়াতে ₹50,000 পাঠান।", isScam: true, explanation: "RBI কখনো ব্যক্তিদের কল করে না। সরকারি সংস্থা ফোনে টাকা চায় না।" },
    { caller: "বীমা এজেন্ট", message: "অভিনন্দন! আপনি ₹10 লাখের বীমা পলিসি জিতেছেন। আধার শেয়ার করুন।", isScam: true, explanation: "আধার চাওয়া পুরস্কার অফার সবসময় প্রতারণা।" },
    { caller: "মা", message: "আজ রাতে ডিনারে এসো। 8টায় এসো।", isScam: false, explanation: "পরিবার থেকে সাধারণ কল।" },
    { caller: "কাস্টমস বিভাগ", message: "আপনার নামে অবৈধ পার্সেল আছে। ₹25,000 জরিমানা দিন। 1 চাপুন।", isScam: true, explanation: "কাস্টমস কখনো ফোনে টাকা চায় না।" },
  ],
  mr: [
    { caller: "SBI बँक व्यवस्थापक", message: "तुमचे खाते 2 तासांत ब्लॉक होईल. लगेच OTP शेअर करा.", isScam: true, explanation: "बँक कधीही फोनवर OTP मागत नाही. हा फसवणूक आहे." },
    { caller: "Amazon डिलिव्हरी", message: "तुमची ऑर्डर #4821 डिलिव्हरीसाठी निघाली आहे. संध्याकाळी 5 वाजता येईल.", isScam: false, explanation: "ही सामान्य डिलिव्हरी सूचना आहे." },
    { caller: "RBI अधिकारी", message: "तुमचा PAN मनी लॉन्ड्रिंगशी जोडला गेला आहे. अटक टाळण्यासाठी ₹50,000 ट्रान्सफर करा.", isScam: true, explanation: "RBI कधीही व्यक्तींना कॉल करत नाही." },
    { caller: "विमा एजंट", message: "अभिनंदन! तुम्हाला ₹10 लाखांची विमा पॉलिसी मिळाली. आधार शेअर करा.", isScam: true, explanation: "आधार मागणारे बक्षीस ऑफर नेहमी फसवणूक असतात." },
    { caller: "आई", message: "आज रात्री जेवायला ये. 8 वाजता ये.", isScam: false, explanation: "कुटुंबाकडून सामान्य कॉल." },
    { caller: "कस्टम विभाग", message: "तुमच्या नावाच्या पार्सलमध्ये बेकायदेशीर वस्तू आहेत. ₹25,000 दंड भरा. 1 दाबा.", isScam: true, explanation: "कस्टम कधीही फोनवर पैसे मागत नाही." },
  ],
  gu: [
    { caller: "SBI બેંક મેનેજર", message: "તમારું ખાતું 2 કલાકમાં બ્લોક થઈ જશે. તરત OTP શેર કરો.", isScam: true, explanation: "બેંક ક્યારેય ફોન પર OTP માગતી નથી. આ છેતરપિંડી છે." },
    { caller: "Amazon ડિલિવરી", message: "તમારો ઓર્ડર #4821 ડિલિવરી માટે નીકળ્યો છે. સાંજે 5 વાગે આવશે.", isScam: false, explanation: "આ સામાન્ય ડિલિવરી સૂચના છે." },
    { caller: "RBI અધિકારી", message: "તમારો PAN મની લોન્ડરિંગ સાથે જોડાયેલ છે. ધરપકડ ટાળવા ₹50,000 ટ્રાન્સફર કરો.", isScam: true, explanation: "RBI ક્યારેય વ્યક્તિઓને કૉલ કરતું નથી." },
    { caller: "વીમા એજન્ટ", message: "અભિનંદન! તમે ₹10 લાખની વીમા પોલિસી જીત્યા છો. આધાર શેર કરો.", isScam: true, explanation: "આધાર માગતી ઇનામ ઓફર હંમેશા છેતરપિંડી હોય છે." },
    { caller: "મમ્મી", message: "આજે રાત્રે જમવા આવ. 8 વાગે આવજે.", isScam: false, explanation: "કુટુંબ તરફથી સામાન્ય કૉલ." },
    { caller: "કસ્ટમ વિભાગ", message: "તમારા નામે ગેરકાયદે વસ્તુઓ ધરાવતું પાર્સલ. ₹25,000 દંડ ભરો. 1 દબાવો.", isScam: true, explanation: "કસ્ટમ ક્યારેય ફોન પર ચુકવણી માગતું નથી." },
  ],
  kn: [
    { caller: "SBI ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್", message: "ನಿಮ್ಮ ಖಾತೆ 2 ಗಂಟೆಗಳಲ್ಲಿ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ. ತಕ್ಷಣ OTP ಹಂಚಿಕೊಳ್ಳಿ.", isScam: true, explanation: "ಬ್ಯಾಂಕ್‌ಗಳು ಫೋನ್‌ನಲ್ಲಿ OTP ಕೇಳುವುದಿಲ್ಲ. ಇದು ವಂಚನೆ." },
    { caller: "Amazon ಡೆಲಿವರಿ", message: "ನಿಮ್ಮ ಆರ್ಡರ್ #4821 ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ. ಸಂಜೆ 5 ಗಂಟೆಗೆ ಬರುತ್ತದೆ.", isScam: false, explanation: "ಇದು ಸಾಮಾನ್ಯ ಡೆಲಿವರಿ ಸೂಚನೆ." },
    { caller: "RBI ಅಧಿಕಾರಿ", message: "ನಿಮ್ಮ PAN ಮನಿ ಲಾಂಡರಿಂಗ್‌ಗೆ ಸಂಬಂಧಿಸಿದೆ. ಬಂಧನ ತಪ್ಪಿಸಲು ₹50,000 ವರ್ಗಾಯಿಸಿ.", isScam: true, explanation: "RBI ವ್ಯಕ್ತಿಗಳಿಗೆ ಕರೆ ಮಾಡುವುದಿಲ್ಲ." },
    { caller: "ವಿಮಾ ಏಜೆಂಟ್", message: "ಅಭಿನಂದನೆ! ₹10 ಲಕ್ಷ ವಿಮಾ ಪಾಲಿಸಿ ಗೆದ್ದಿದ್ದೀರಿ. ಆಧಾರ್ ಹಂಚಿಕೊಳ್ಳಿ.", isScam: true, explanation: "ಆಧಾರ್ ಕೇಳುವ ಬಹುಮಾನ ಆಫರ್‌ಗಳು ಯಾವಾಗಲೂ ವಂಚನೆ." },
    { caller: "ಅಮ್ಮ", message: "ಇಂದು ರಾತ್ರಿ ಊಟಕ್ಕೆ ಬಾ. 8 ಗಂಟೆಗೆ ಬಾ.", isScam: false, explanation: "ಕುಟುಂಬದಿಂದ ಸಾಮಾನ್ಯ ಕರೆ." },
    { caller: "ಕಸ್ಟಮ್ಸ್ ಇಲಾಖೆ", message: "ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಅಕ್ರಮ ವಸ್ತುಗಳ ಪಾರ್ಸೆಲ್. ₹25,000 ದಂಡ ಪಾವತಿಸಿ. 1 ಒತ್ತಿ.", isScam: true, explanation: "ಕಸ್ಟಮ್ಸ್ ಫೋನ್‌ನಲ್ಲಿ ಪಾವತಿ ಕೇಳುವುದಿಲ್ಲ." },
  ],
};

// ─── SMS Quizzes ──────────────────────────────────────────────
const smsQuizzes: Record<LangCode, SmsQuiz[]> = {
  en: [
    { text: "Dear customer, your KYC is expired. Update now: http://bit.ly/3xKYC-update or your account will be frozen in 24hrs.", isScam: true, explanation: "Shortened links + urgency + KYC update request = classic phishing SMS." },
    { text: "Your Flipkart order #FK-9821 has been shipped. Track: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "Official domain (flipkart.com) and standard order notification." },
    { text: "You won ₹50,00,000 in Jio Lucky Draw! Claim now by sending ₹500 registration fee to UPI: lucky@ybl", isScam: true, explanation: "No legitimate lottery asks for money to claim prizes." },
    { text: "HDFC Bank: ₹15,000 debited from A/c XX4521. Not you? Call 1800-XXX-XXXX immediately.", isScam: false, explanation: "Standard bank debit alert with official helpline number." },
    { text: "URGENT: Your WhatsApp will expire today! Verify now: http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp never expires. Suspicious domain (.xyz) is a phishing site." },
    { text: "Your electricity bill of ₹3,240 is due. Pay before 15th to avoid disconnection. Visit: https://uppcl.org", isScam: false, explanation: "Official government domain and standard bill reminder." },
  ],
  hi: [
    { text: "प्रिय ग्राहक, आपका KYC समाप्त हो गया है। अभी अपडेट करें: http://bit.ly/3xKYC-update या 24 घंटे में खाता फ्रीज हो जाएगा।", isScam: true, explanation: "छोटे लिंक + तत्काल + KYC अपडेट = फिशिंग SMS।" },
    { text: "आपका Flipkart ऑर्डर #FK-9821 शिप हो गया है। ट्रैक करें: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "आधिकारिक डोमेन (flipkart.com) और सामान्य ऑर्डर सूचना।" },
    { text: "आपने Jio Lucky Draw में ₹50,00,000 जीते! ₹500 रजिस्ट्रेशन फीस UPI: lucky@ybl पर भेजकर क्लेम करें।", isScam: true, explanation: "कोई भी वैध लॉटरी पुरस्कार के लिए पैसे नहीं मांगती।" },
    { text: "HDFC Bank: A/c XX4521 से ₹15,000 डेबिट। आप नहीं? तुरंत 1800-XXX-XXXX कॉल करें।", isScam: false, explanation: "आधिकारिक हेल्पलाइन के साथ मानक बैंक डेबिट अलर्ट।" },
    { text: "तत्काल: आपका WhatsApp आज समाप्त हो जाएगा! अभी सत्यापित करें: http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp कभी समाप्त नहीं होता। संदिग्ध डोमेन (.xyz) फिशिंग साइट है।" },
    { text: "आपका बिजली बिल ₹3,240 बकाया है। 15 तारीख से पहले भुगतान करें। विजिट करें: https://uppcl.org", isScam: false, explanation: "आधिकारिक सरकारी डोमेन और मानक बिल रिमाइंडर।" },
  ],
  ta: [
    { text: "வாடிக்கையாளரே, உங்கள் KYC காலாவதியாகிவிட்டது. இப்போதே புதுப்பிக்கவும்: http://bit.ly/3xKYC-update", isScam: true, explanation: "சுருக்கிய இணைப்பு + அவசரம் + KYC = ஃபிஷிங் SMS." },
    { text: "உங்கள் Flipkart ஆர்டர் #FK-9821 அனுப்பப்பட்டது. ட்ராக்: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "அதிகாரப்பூர்வ டொமைன் (flipkart.com)." },
    { text: "நீங்கள் Jio லக்கி டிராவில் ₹50,00,000 வென்றீர்கள்! ₹500 பதிவுக் கட்டணம் UPI: lucky@ybl க்கு அனுப்பவும்.", isScam: true, explanation: "எந்த சட்டபூர்வ லாட்டரியும் பணம் கேட்காது." },
    { text: "HDFC Bank: A/c XX4521 லிருந்து ₹15,000 டெபிட். நீங்களா இல்லையா? 1800-XXX-XXXX அழைக்கவும்.", isScam: false, explanation: "அதிகாரப்பூர்வ ஹெல்ப்லைன் எண்ணுடன் நிலையான வங்கி எச்சரிக்கை." },
    { text: "அவசரம்: உங்கள் WhatsApp இன்று காலாவதியாகும்! சரிபார்க்கவும்: http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp ஒருபோதும் காலாவதியாகாது. .xyz சந்தேகத்திற்குரிய டொமைன்." },
    { text: "உங்கள் மின்சார கட்டணம் ₹3,240 நிலுவை. 15ஆம் தேதிக்குள் செலுத்தவும். https://uppcl.org", isScam: false, explanation: "அதிகாரப்பூர்வ அரசு டொமைன்." },
  ],
  te: [
    { text: "ప్రియ కస్టమర్, మీ KYC గడువు ముగిసింది. ఇప్పుడే అప్‌డేట్ చేయండి: http://bit.ly/3xKYC-update", isScam: true, explanation: "చిన్న లింక్ + ఆతృత + KYC = ఫిషింగ్ SMS." },
    { text: "మీ Flipkart ఆర్డర్ #FK-9821 షిప్ అయింది. ట్రాక్: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "అధికారిక డొమైన్ (flipkart.com)." },
    { text: "మీరు Jio లక్కీ డ్రాలో ₹50,00,000 గెలిచారు! ₹500 రిజిస్ట్రేషన్ ఫీ UPI: lucky@ybl కు పంపండి.", isScam: true, explanation: "ఏ చట్టబద్ధ లాటరీ డబ్బు అడగదు." },
    { text: "HDFC Bank: A/c XX4521 నుండి ₹15,000 డెబిట్. మీరు కాదా? 1800-XXX-XXXX కాల్ చేయండి.", isScam: false, explanation: "అధికారిక హెల్ప్‌లైన్ తో సాధారణ బ్యాంక్ అలర్ట్." },
    { text: "అత్యవసరం: మీ WhatsApp ఈ రోజు ఎక్స్‌పైర్ అవుతుంది! http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp ఎప్పుడూ ఎక్స్‌పైర్ కాదు. .xyz అనుమానాస్పద డొమైన్." },
    { text: "మీ విద్యుత్ బిల్ ₹3,240 బకాయి. 15వ తేదీలోపు చెల్లించండి. https://uppcl.org", isScam: false, explanation: "అధికారిక ప్రభుత్వ డొమైన్." },
  ],
  bn: [
    { text: "প্রিয় গ্রাহক, আপনার KYC মেয়াদ শেষ। এখনই আপডেট করুন: http://bit.ly/3xKYC-update", isScam: true, explanation: "ছোট লিংক + জরুরি + KYC = ফিশিং SMS।" },
    { text: "আপনার Flipkart অর্ডার #FK-9821 শিপ হয়েছে। ট্র্যাক: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "অফিসিয়াল ডোমেইন (flipkart.com)।" },
    { text: "আপনি Jio লাকি ড্রতে ₹50,00,000 জিতেছেন! ₹500 রেজিস্ট্রেশন ফি UPI: lucky@ybl পাঠান।", isScam: true, explanation: "কোনো বৈধ লটারি টাকা চায় না।" },
    { text: "HDFC Bank: A/c XX4521 থেকে ₹15,000 ডেবিট। আপনি না? 1800-XXX-XXXX কল করুন।", isScam: false, explanation: "অফিসিয়াল হেল্পলাইন সহ স্ট্যান্ডার্ড ব্যাংক অ্যালার্ট।" },
    { text: "জরুরি: আপনার WhatsApp আজ এক্সপায়ার হবে! http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp কখনো এক্সপায়ার হয় না। .xyz সন্দেহজনক ডোমেইন।" },
    { text: "আপনার বিদ্যুৎ বিল ₹3,240 বকেয়া। 15 তারিখের মধ্যে দিন। https://uppcl.org", isScam: false, explanation: "অফিসিয়াল সরকারি ডোমেইন।" },
  ],
  mr: [
    { text: "प्रिय ग्राहक, तुमचे KYC कालबाह्य झाले. आता अपडेट करा: http://bit.ly/3xKYC-update", isScam: true, explanation: "लहान लिंक + तातडी + KYC = फिशिंग SMS." },
    { text: "तुमची Flipkart ऑर्डर #FK-9821 शिप झाली. ट्रॅक: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "अधिकृत डोमेन (flipkart.com)." },
    { text: "तुम्ही Jio Lucky Draw मध्ये ₹50,00,000 जिंकलेत! ₹500 रजिस्ट्रेशन फी UPI: lucky@ybl ला पाठवा.", isScam: true, explanation: "कोणतीही वैध लॉटरी पैसे मागत नाही." },
    { text: "HDFC Bank: A/c XX4521 मधून ₹15,000 डेबिट. तुम्ही नाही? 1800-XXX-XXXX कॉल करा.", isScam: false, explanation: "अधिकृत हेल्पलाइनसह मानक बँक अलर्ट." },
    { text: "तातडी: तुमचे WhatsApp आज संपणार! http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp कधीच संपत नाही. .xyz संशयास्पद डोमेन." },
    { text: "तुमचे वीज बिल ₹3,240 थकबाकी. 15 तारखेपूर्वी भरा. https://uppcl.org", isScam: false, explanation: "अधिकृत सरकारी डोमेन." },
  ],
  gu: [
    { text: "પ્રિય ગ્રાહક, તમારું KYC સમાપ્ત થયું. અપડેટ કરો: http://bit.ly/3xKYC-update", isScam: true, explanation: "ટૂંકી લિંક + ઉતાવળ + KYC = ફિશિંગ SMS." },
    { text: "તમારો Flipkart ઓર્ડર #FK-9821 શિપ થયો. ટ્રેક: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "અધિકૃત ડોમેન (flipkart.com)." },
    { text: "તમે Jio લકી ડ્રોમાં ₹50,00,000 જીત્યા! ₹500 રજિસ્ટ્રેશન ફી UPI: lucky@ybl પર મોકલો.", isScam: true, explanation: "કોઈ કાયદેસર લોટરી પૈસા માગતી નથી." },
    { text: "HDFC Bank: A/c XX4521 માંથી ₹15,000 ડેબિટ. તમે નહીં? 1800-XXX-XXXX કૉલ કરો.", isScam: false, explanation: "અધિકૃત હેલ્પલાઈન સાથે સ્ટાન્ડર્ડ બેંક એલર્ટ." },
    { text: "તાત્કાલિક: તમારું WhatsApp આજે સમાપ્ત થશે! http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp ક્યારેય સમાપ્ત થતું નથી. .xyz શંકાસ્પદ ડોમેન." },
    { text: "તમારું વીજળી બિલ ₹3,240 બાકી. 15મી પહેલાં ભરો. https://uppcl.org", isScam: false, explanation: "અધિકૃત સરકારી ડોમેન." },
  ],
  kn: [
    { text: "ಪ್ರಿಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ KYC ಮುಕ್ತಾಯವಾಗಿದೆ. ಈಗಲೇ ನವೀಕರಿಸಿ: http://bit.ly/3xKYC-update", isScam: true, explanation: "ಚಿಕ್ಕ ಲಿಂಕ್ + ಅವಸರ + KYC = ಫಿಶಿಂಗ್ SMS." },
    { text: "ನಿಮ್ಮ Flipkart ಆರ್ಡರ್ #FK-9821 ಶಿಪ್ ಆಗಿದೆ. ಟ್ರ್ಯಾಕ್: https://www.flipkart.com/track/FK9821", isScam: false, explanation: "ಅಧಿಕೃತ ಡೊಮೈನ್ (flipkart.com)." },
    { text: "ನೀವು Jio ಲಕ್ಕಿ ಡ್ರಾನಲ್ಲಿ ₹50,00,000 ಗೆದ್ದಿದ್ದೀರಿ! ₹500 ನೋಂದಣಿ ಶುಲ್ಕ UPI: lucky@ybl ಗೆ ಕಳುಹಿಸಿ.", isScam: true, explanation: "ಯಾವುದೇ ಕಾನೂನುಬದ್ಧ ಲಾಟರಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ." },
    { text: "HDFC Bank: A/c XX4521 ನಿಂದ ₹15,000 ಡೆಬಿಟ್. ನೀವಲ್ಲ? 1800-XXX-XXXX ಕರೆ ಮಾಡಿ.", isScam: false, explanation: "ಅಧಿಕೃತ ಹೆಲ್ಪ್‌ಲೈನ್ ಸಹಿತ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಬ್ಯಾಂಕ್ ಅಲರ್ಟ್." },
    { text: "ತುರ್ತು: ನಿಮ್ಮ WhatsApp ಇಂದು ಮುಕ್ತಾಯವಾಗುತ್ತದೆ! http://whatsapp-verify.xyz/renew", isScam: true, explanation: "WhatsApp ಎಂದಿಗೂ ಮುಕ್ತಾಯವಾಗುವುದಿಲ್ಲ. .xyz ಅನುಮಾನಾಸ್ಪದ ಡೊಮೈನ್." },
    { text: "ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ₹3,240 ಬಾಕಿ. 15ರ ಒಳಗೆ ಪಾವತಿಸಿ. https://uppcl.org", isScam: false, explanation: "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಡೊಮೈನ್." },
  ],
};

// ─── Link Quizzes ──────────────────────────────────────────────
// Links are the same across languages, only explanations are translated
const linkQuizzesBase = [
  { url: "https://www.sbi.co.in/personal-banking", isScam: false },
  { url: "http://sbi-secure-login.xyz/verify", isScam: true },
  { url: "https://pay.google.com/send", isScam: false },
  { url: "http://googl-pay.in/claim-reward", isScam: true },
  { url: "https://www.amazon.in/orders", isScam: false },
  { url: "http://amazon-prize-winner.com/claim", isScam: true },
  { url: "https://incometax.gov.in/refund", isScam: false },
  { url: "http://income-tax-refund.online/apply", isScam: true },
];

const linkExplanations: Record<LangCode, string[]> = {
  en: ["Official SBI domain.", "Fake domain (.xyz) mimicking SBI.", "Official Google Pay domain.", "Misspelled domain (googl-pay) is phishing.", "Official Amazon India domain.", "Fake domain, Amazon doesn't run prize claims on external sites.", "Official government domain (.gov.in).", "Fake domain (.online), government sites use .gov.in."],
  hi: ["SBI का आधिकारिक डोमेन।", "SBI की नकल करने वाला नकली डोमेन (.xyz)।", "Google Pay का आधिकारिक डोमेन।", "गलत स्पेलिंग वाला डोमेन (googl-pay) फिशिंग है।", "Amazon India का आधिकारिक डोमेन।", "नकली डोमेन, Amazon बाहरी साइट पर पुरस्कार नहीं देता।", "सरकारी आधिकारिक डोमेन (.gov.in)।", "नकली डोमेन (.online), सरकारी साइट .gov.in इस्तेमाल करती हैं।"],
  ta: ["SBI அதிகாரப்பூர்வ டொமைன்.", "SBI போன்று நடிக்கும் போலி டொமைன் (.xyz).", "Google Pay அதிகாரப்பூர்வ டொமைன்.", "தவறான எழுத்துப்பிழை டொமைன் (googl-pay) ஃபிஷிங்.", "Amazon India அதிகாரப்பூர்வ டொமைன்.", "போலி டொமைன், Amazon வெளி தளத்தில் பரிசு கொடுக்காது.", "அதிகாரப்பூர்வ அரசு டொமைன் (.gov.in).", "போலி டொமைன் (.online), அரசு தளம் .gov.in பயன்படுத்தும்."],
  te: ["SBI అధికారిక డొమైన్.", "SBI ని అనుకరిస్తున్న నకిలీ డొమైన్ (.xyz).", "Google Pay అధికారిక డొమైన్.", "తప్పు స్పెల్లింగ్ డొమైన్ (googl-pay) ఫిషింగ్.", "Amazon India అధికారిక డొమైన్.", "నకిలీ డొమైన్, Amazon బయటి సైట్లో బహుమతులు ఇవ్వదు.", "అధికారిక ప్రభుత్వ డొమైన్ (.gov.in).", "నకిలీ డొమైన్ (.online), ప్రభుత్వ సైట్లు .gov.in వాడతాయి."],
  bn: ["SBI অফিসিয়াল ডোমেইন।", "SBI নকল করা ভুয়া ডোমেইন (.xyz)।", "Google Pay অফিসিয়াল ডোমেইন।", "ভুল বানান ডোমেইন (googl-pay) ফিশিং।", "Amazon India অফিসিয়াল ডোমেইন।", "ভুয়া ডোমেইন, Amazon বাইরের সাইটে পুরস্কার দেয় না।", "অফিসিয়াল সরকারি ডোমেইন (.gov.in)।", "ভুয়া ডোমেইন (.online), সরকারি সাইট .gov.in ব্যবহার করে।"],
  mr: ["SBI अधिकृत डोमेन.", "SBI ची नक्कल करणारे बनावट डोमेन (.xyz).", "Google Pay अधिकृत डोमेन.", "चुकीचे स्पेलिंग डोमेन (googl-pay) फिशिंग.", "Amazon India अधिकृत डोमेन.", "बनावट डोमेन, Amazon बाह्य साइटवर बक्षिसे देत नाही.", "अधिकृत सरकारी डोमेन (.gov.in).", "बनावट डोमेन (.online), सरकारी साइट .gov.in वापरतात."],
  gu: ["SBI અધિકૃત ડોમેન.", "SBI ની નકલ કરતું નકલી ડોમેન (.xyz).", "Google Pay અધિકૃત ડોમેન.", "ખોટી સ્પેલિંગ ડોમેન (googl-pay) ફિશિંગ.", "Amazon India અધિકૃત ડોમેન.", "નકલી ડોમેન, Amazon બહારની સાઈટ પર ઇનામ આપતું નથી.", "અધિકૃત સરકારી ડોમેન (.gov.in).", "નકલી ડોમેન (.online), સરકારી સાઈટ .gov.in વાપરે છે."],
  kn: ["SBI ಅಧಿಕೃತ ಡೊಮೈನ್.", "SBI ಅನುಕರಿಸುವ ನಕಲಿ ಡೊಮೈನ್ (.xyz).", "Google Pay ಅಧಿಕೃತ ಡೊಮೈನ್.", "ತಪ್ಪು ಸ್ಪೆಲ್ಲಿಂಗ್ ಡೊಮೈನ್ (googl-pay) ಫಿಶಿಂಗ್.", "Amazon India ಅಧಿಕೃತ ಡೊಮೈನ್.", "ನಕಲಿ ಡೊಮೈನ್, Amazon ಬಾಹ್ಯ ತಾಣದಲ್ಲಿ ಬಹುಮಾನ ನೀಡುವುದಿಲ್ಲ.", "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಡೊಮೈನ್ (.gov.in).", "ನಕಲಿ ಡೊಮೈನ್ (.online), ಸರ್ಕಾರಿ ತಾಣಗಳು .gov.in ಬಳಸುತ್ತವೆ."],
};

const linkQuizzes: Record<LangCode, LinkQuiz[]> = {} as any;
for (const lang of supportedLanguages) {
  linkQuizzes[lang.code] = linkQuizzesBase.map((item, i) => ({
    ...item,
    explanation: linkExplanations[lang.code][i],
  }));
}

// ─── UI Labels ──────────────────────────────────────────────
export const uiLabels: Record<LangCode, {
  title: string;
  subtitle: string;
  scamBtn: string;
  safeBtn: string;
  correct: string;
  wrong: string;
  nextQuestion: string;
  seeResults: string;
  trainingComplete: string;
  youGot: string;
  outOf: string;
  tryAgain: string;
  question: string;
  score: string;
  listen: string;
  expert: string;
  good: string;
  average: string;
  needsPractice: string;
  incomingCall: string;
  smsReceived: string;
  isLinkSafe: string;
  videoTitle: string;
  videoSubtitle: string;
  videoAfter: string;
  selectLanguage: string;
}> = {
  en: { title: "Scam Training Mode", subtitle: "Learn to identify scams through interactive quizzes!", scamBtn: "🚨 Scam", safeBtn: "✅ Safe", correct: "Correct! 🎉", wrong: "Wrong! ❌", nextQuestion: "Next Question", seeResults: "See Results", trainingComplete: "Training Complete!", youGot: "You got", outOf: "out of", tryAgain: "Try Again", question: "Question", score: "Score", listen: "🔊 Listen", expert: "Expert", good: "Good", average: "Average", needsPractice: "Needs Practice", incomingCall: "Incoming call from", smsReceived: "SMS Received", isLinkSafe: "Is this link safe?", videoTitle: "Scam Awareness Training Video", videoSubtitle: "Watch this short guide to learn how to identify scams.", videoAfter: "After watching, try the interactive quizzes!", selectLanguage: "Language" },
  hi: { title: "स्कैम ट्रेनिंग मोड", subtitle: "इंटरैक्टिव क्विज़ से स्कैम पहचानना सीखें!", scamBtn: "🚨 स्कैम", safeBtn: "✅ सुरक्षित", correct: "सही! 🎉", wrong: "गलत! ❌", nextQuestion: "अगला सवाल", seeResults: "परिणाम देखें", trainingComplete: "ट्रेनिंग पूरी!", youGot: "आपने", outOf: "में से", tryAgain: "फिर से कोशिश करें", question: "सवाल", score: "स्कोर", listen: "🔊 सुनें", expert: "विशेषज्ञ", good: "अच्छा", average: "औसत", needsPractice: "अभ्यास करें", incomingCall: "कॉल आ रहा है", smsReceived: "SMS आया", isLinkSafe: "क्या यह लिंक सुरक्षित है?", videoTitle: "स्कैम जागरूकता ट्रेनिंग वीडियो", videoSubtitle: "स्कैम पहचानने का तरीका सीखें।", videoAfter: "वीडियो के बाद क्विज़ खेलें!", selectLanguage: "भाषा" },
  ta: { title: "மோசடி பயிற்சி", subtitle: "வினாடி வினா மூலம் மோசடிகளை கண்டறியுங்கள்!", scamBtn: "🚨 மோசடி", safeBtn: "✅ பாதுகாப்பு", correct: "சரி! 🎉", wrong: "தவறு! ❌", nextQuestion: "அடுத்த கேள்வி", seeResults: "முடிவுகள்", trainingComplete: "பயிற்சி முடிந்தது!", youGot: "நீங்கள்", outOf: "இல்", tryAgain: "மீண்டும் முயற்சி", question: "கேள்வி", score: "மதிப்பெண்", listen: "🔊 கேளுங்கள்", expert: "நிபுணர்", good: "நல்லது", average: "சராசரி", needsPractice: "பயிற்சி தேவை", incomingCall: "அழைப்பு வருகிறது", smsReceived: "SMS வந்தது", isLinkSafe: "இந்த இணைப்பு பாதுகாப்பா?", videoTitle: "மோசடி விழிப்புணர்வு வீடியோ", videoSubtitle: "மோசடிகளை கண்டறிய கற்றுக்கொள்ளுங்கள்.", videoAfter: "வீடியோ பார்த்த பிறகு வினாடி வினா விளையாடுங்கள்!", selectLanguage: "மொழி" },
  te: { title: "స్కామ్ ట్రైనింగ్", subtitle: "క్విజ్‌ల ద్వారా స్కామ్‌లను గుర్తించడం నేర్చుకోండి!", scamBtn: "🚨 స్కామ్", safeBtn: "✅ సేఫ్", correct: "సరైన! 🎉", wrong: "తప్పు! ❌", nextQuestion: "తదుపరి ప్రశ్న", seeResults: "ఫలితాలు", trainingComplete: "ట్రైనింగ్ పూర్తి!", youGot: "మీరు", outOf: "లో", tryAgain: "మళ్ళీ ప్రయత్నించండి", question: "ప్రశ్న", score: "స్కోర్", listen: "🔊 వినండి", expert: "నిపుణుడు", good: "మంచి", average: "సగటు", needsPractice: "అభ్యాసం అవసరం", incomingCall: "కాల్ వస్తోంది", smsReceived: "SMS వచ్చింది", isLinkSafe: "ఈ లింక్ సేఫ్ అా?", videoTitle: "స్కామ్ అవగాహన వీడియో", videoSubtitle: "స్కామ్‌లను గుర్తించడం నేర్చుకోండి.", videoAfter: "వీడియో తర్వాత క్విజ్ ఆడండి!", selectLanguage: "భాష" },
  bn: { title: "স্ক্যাম ট্রেনিং", subtitle: "কুইজের মাধ্যমে স্ক্যাম চিনতে শিখুন!", scamBtn: "🚨 স্ক্যাম", safeBtn: "✅ নিরাপদ", correct: "সঠিক! 🎉", wrong: "ভুল! ❌", nextQuestion: "পরবর্তী প্রশ্ন", seeResults: "ফলাফল দেখুন", trainingComplete: "ট্রেনিং সম্পন্ন!", youGot: "আপনি", outOf: "এর মধ্যে", tryAgain: "আবার চেষ্টা করুন", question: "প্রশ্ন", score: "স্কোর", listen: "🔊 শুনুন", expert: "বিশেষজ্ঞ", good: "ভালো", average: "গড়", needsPractice: "অনুশীলন দরকার", incomingCall: "কল আসছে", smsReceived: "SMS এসেছে", isLinkSafe: "এই লিংক কি নিরাপদ?", videoTitle: "স্ক্যাম সচেতনতা ভিডিও", videoSubtitle: "স্ক্যাম চিনতে শিখুন।", videoAfter: "ভিডিও দেখে কুইজ খেলুন!", selectLanguage: "ভাষা" },
  mr: { title: "स्कॅम ट्रेनिंग", subtitle: "क्विझद्वारे स्कॅम ओळखायला शिका!", scamBtn: "🚨 स्कॅम", safeBtn: "✅ सुरक्षित", correct: "बरोबर! 🎉", wrong: "चूक! ❌", nextQuestion: "पुढचा प्रश्न", seeResults: "निकाल पहा", trainingComplete: "ट्रेनिंग पूर्ण!", youGot: "तुम्हाला", outOf: "पैकी", tryAgain: "पुन्हा प्रयत्न करा", question: "प्रश्न", score: "गुण", listen: "🔊 ऐका", expert: "तज्ञ", good: "चांगले", average: "सरासरी", needsPractice: "सराव आवश्यक", incomingCall: "कॉल येत आहे", smsReceived: "SMS आला", isLinkSafe: "हा लिंक सुरक्षित आहे का?", videoTitle: "स्कॅम जागरूकता व्हिडिओ", videoSubtitle: "स्कॅम ओळखायला शिका.", videoAfter: "व्हिडिओ पाहिल्यानंतर क्विझ खेळा!", selectLanguage: "भाषा" },
  gu: { title: "સ્કેમ ટ્રેનિંગ", subtitle: "ક્વિઝ દ્વારા સ્કેમ ઓળખવાનું શીખો!", scamBtn: "🚨 સ્કેમ", safeBtn: "✅ સેફ", correct: "સાચું! 🎉", wrong: "ખોટું! ❌", nextQuestion: "આગળનો પ્રશ્ન", seeResults: "પરિણામ જુઓ", trainingComplete: "ટ્રેનિંગ પૂર્ણ!", youGot: "તમે", outOf: "માંથી", tryAgain: "ફરી પ્રયાસ કરો", question: "પ્રશ્ન", score: "સ્કોર", listen: "🔊 સાંભળો", expert: "નિષ્ણાત", good: "સારું", average: "સરેરાશ", needsPractice: "પ્રેક્ટિસ જરૂરી", incomingCall: "કૉલ આવી રહ્યો છે", smsReceived: "SMS આવ્યો", isLinkSafe: "આ લિંક સેફ છે?", videoTitle: "સ્કેમ જાગૃતિ વીડિયો", videoSubtitle: "સ્કેમ ઓળખવાનું શીખો.", videoAfter: "વીડિયો જોયા પછી ક્વિઝ રમો!", selectLanguage: "ભાષા" },
  kn: { title: "ಸ್ಕ್ಯಾಮ್ ತರಬೇತಿ", subtitle: "ಕ್ವಿಜ್ ಮೂಲಕ ಸ್ಕ್ಯಾಮ್ ಗುರುತಿಸಿ!", scamBtn: "🚨 ಸ್ಕ್ಯಾಮ್", safeBtn: "✅ ಸುರಕ್ಷಿತ", correct: "ಸರಿ! 🎉", wrong: "ತಪ್ಪು! ❌", nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ", seeResults: "ಫಲಿತಾಂಶ", trainingComplete: "ತರಬೇತಿ ಪೂರ್ಣ!", youGot: "ನೀವು", outOf: "ರಲ್ಲಿ", tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", question: "ಪ್ರಶ್ನೆ", score: "ಸ್ಕೋರ್", listen: "🔊 ಕೇಳಿ", expert: "ತಜ್ಞ", good: "ಒಳ್ಳೆಯದು", average: "ಸರಾಸರಿ", needsPractice: "ಅಭ್ಯಾಸ ಬೇಕು", incomingCall: "ಕರೆ ಬರುತ್ತಿದೆ", smsReceived: "SMS ಬಂದಿದೆ", isLinkSafe: "ಈ ಲಿಂಕ್ ಸುರಕ್ಷಿತವೇ?", videoTitle: "ಸ್ಕ್ಯಾಮ್ ಜಾಗೃತಿ ವೀಡಿಯೊ", videoSubtitle: "ಸ್ಕ್ಯಾಮ್ ಗುರುತಿಸಲು ಕಲಿಯಿರಿ.", videoAfter: "ವೀಡಿಯೊ ನೋಡಿ ಕ್ವಿಜ್ ಆಡಿ!", selectLanguage: "ಭಾಷೆ" },
};

export function getTrainingData(lang: LangCode) {
  return {
    calls: callScenarios[lang],
    sms: smsQuizzes[lang],
    links: linkQuizzes[lang],
    labels: uiLabels[lang],
  };
}
