# JARVIS X — Starter 0.1

यह आपका पहला customizable Hindi + English voice assistant starter है।

## इसमें अभी क्या काम करता है?
- Microphone बटन दबाकर voice input (Chrome/Android में supported होने पर)
- Text command
- बोलकर जवाब (Speech Synthesis)
- समय और तारीख बताना
- YouTube और Google खोलना
- PWA installable structure और basic offline app shell

## जरूरी सीमाएँ
- यह अभी पूर्ण generative AI नहीं है। Unknown सवालों का AI-जैसा उत्तर देने के लिए आगे सुरक्षित backend/API जोड़ना होगा।
- Voice recognition कुछ browsers में internet मांग सकता है और सभी devices में उपलब्ध नहीं होता।
- यह ऐप background में हमेशा नहीं सुनता। Microphone केवल बटन दबाने पर शुरू होता है।
- यह APK नहीं है; यह web app/PWA है।
- फोन के दूसरे apps को नियंत्रित करने के लिए Android native code और अलग-अलग permissions की जरूरत होगी।

## GitHub Pages पर चलाने का तरीका (मोबाइल से)
1. GitHub पर नया public repository बनाएं: `jarvis-x`
2. इस ZIP के अंदर की सभी files repository के root में upload करें।
3. Repository में Settings → Pages खोलें।
4. Build and deployment में `Deploy from a branch` चुनें।
5. Branch `main`, folder `/ (root)` चुनकर Save करें।
6. कुछ मिनट बाद GitHub Pages URL खुलेगा।
7. Realme में Chrome से URL खोलें → Chrome menu (⋮) → Add to Home screen / Install app.

## Voice test
- "Namaste Jarvis"
- "What time is it?"
- "Aaj ki date batao"
- "YouTube kholo"
- "Google kholo"

## अगला विकास
1. बेहतर Hindi/English language selector
2. सुरक्षित AI backend (API key कभी भी `app.js` में न रखें)
3. User-approved actions
4. Android native wrapper / APK
5. Custom wake word — इसके लिए native background audio handling चाहिए; PWA अकेले में भरोसेमंद always-on wake word नहीं दे सकता।
