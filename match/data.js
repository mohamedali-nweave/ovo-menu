/* OVO Match · data.js
   الأسعار والكلام كله هنا. السعر: رقم، أو [وسط, كبير] (null = الحجم مش موجود)
   الصف: [الاسم, السعر, المجموعة, النكهة, {b: البايو, f: الفلاجز, c: اللون, t: تاجز زيادة, u: شكل الكوباية, k: التوبينج}] */

const EXTRAS = {
  hot:    [["Flavor shot","شوت نكهة",25],["Almond / Coconut milk","لبن لوز / جوز هند",40]],
  iced:   [["Boba","بوبا",25],["Cold foam","كولد فوم",30],["Almond / Coconut milk","لبن لوز / جوز هند",40]],
  matcha: [["Cold foam","كولد فوم",30]],
  boba:   [["Boba","بوبا",25]]
};

// f: [green EN, green AR, red EN, red AR]
const GROUPS = {
  shot:  {cat:["Coffee","قهوة"], cup:"small", col:"#3A2014", tags:"hot coffee strong", f:[
    ["Wakes you up in 10 seconds","بيصحّيك في 10 ثواني","Gone in 3 sips","بيخلص في 3 بُق"]]},
  small: {cat:["Coffee","قهوة"], cup:"small", col:"#9A6A45", tags:"hot coffee strong milky", x:"hot", f:[
    ["Strong but polite","تقيل بس محترم","Small cup, big expectations","كوباية صغيرة وتوقعات كبيرة"]]},
  black: {cat:["Coffee","قهوة"], cup:"mug", col:"#2E1A10", tags:"hot coffee strong", f:[
    ["Honest, never sugarcoats","صريح ومابيجاملش","Not for sweet tooths","مش لبتوع السكر"]]},
  latte: {cat:["Coffee","قهوة"], cup:"mug", col:"#C9A27E", tags:"hot coffee milky", x:"hot", f:[
    ["Warm and never awkward","دافي وعمره ما بيحطك في موقف بايخ","You'll want a second cup","هتطلب التاني"]]},
  flat:  {cat:["Coffee","قهوة"], cup:"mug", col:"#A9774F", tags:"hot coffee milky sweet", x:"hot", f:[
    ["Coffee and dessert on one date","قهوة وتحلية في خروجة واحدة","Sugar rush, then a nap","سكر عالي وبعدين نومة"]]},
  inst:  {cat:["Instant Coffee","قهوة سريعة"], cup:"mug", col:"#5A3A26", tags:"hot coffee", f:[
    ["Quick, cheap, loyal","سريع ورخيص ووفي","Not trying to impress anyone","مش بيحاول يبهر حد"]]},
  turk:  {cat:["Turkish Coffee","قهوة تركي"], cup:"turk", col:"#3A2216", tags:"hot coffee strong", f:[
    ["Comes with a whole ritual","جاي بطقوس كاملة","Don't drink the grounds 😅","ماتشربش التفل 😅"]]},
  fturk: {cat:["Turkish Coffee","قهوة تركي"], cup:"turk", col:"#6B4630", tags:"hot coffee sweet", f:[
    ["Turkish coffee that went to a party","قهوة تركي راحت حفلة","Purists will judge you","المتعصبين للتركي هيبصولك بصة"]]},
  choc:  {cat:["Hot Chocolate","هوت شوكليت"], cup:"mug", col:"#5C3420", tags:"hot choc sweet milky nocaf", x:"hot", f:[
    ["Fixes any bad day","بيصلّح أي يوم وحش","Chocolate mustache guaranteed","شنب شوكولاتة مضمون"]]},
  cream: {cat:["Hot Creamy Drinks","كريمي سخن"], cup:"mug", col:"#C9965E", fc:1, tags:"hot sweet milky nocaf", x:"hot", f:[
    ["Dessert you hold with both hands","تحلية بتمسكها بإيديك الاتنين","Your diet just left the chat","الدايت عمل ليفت من الجروب"]]},
  tea:   {cat:["Hot Drinks","مشروبات سخنة"], cup:"tea", col:"#B5651D", tags:"hot tea", f:[
    ["Always there for you","موجود في كل الظروف","Makes you crave biscuits","هيخليك عايز بسكوت"]]},
  hot:   {cat:["Hot Drinks","مشروبات سخنة"], cup:"mug", col:"#E9C46A", tags:"hot", f:[
    ["Cozy-season essential","أساسي في موسم الدفا","Too wholesome for some","كيوت زيادة عن اللزوم"]]},
  icof:  {cat:["Iced Coffee","آيس كوفي"], cup:"iced", col:"#8A5A3B", tags:"cold coffee milky", x:"iced", f:[
    ["Cold outside, warm heart","ساقع من بره ودافي من جوه","The ice melts, so will you","التلج بيسيح وإنت كمان"],
    ["Looks great on your story","شكله يكسّر على الستوري","You'll be back tomorrow","هترجع بكرة"]]},
  frap:  {cat:["Frappes","فرابيه"], cup:"frappe", col:"#B88A62", tags:"cold coffee blended sweet", f:[
    ["Milkshake vibes with caffeine","فايب ميلك شيك بس فيه كافيين","Brain freeze incoming 🥶","براين فريز جاي في السكة 🥶"],
    ["Instant mood boost","بيعلّي المود على طول","Straw might get stuck. Worth it","الشفاطة ممكن تزنق بس يستاهل"]]},
  shak:  {cat:["Iced Shaken","آيس شيكن"], cup:"iced", col:"#9A6A45", tags:"cold coffee milky sweet", f:[
    ["Shaken, not stirred 😎","متخضوض مش متقلّب 😎","Too cool to explain itself","كوول لدرجة إنه مش هيشرح نفسه"]]},
  iv60:  {cat:["Iced V60","آيس V60"], cup:"iced", col:"#3A2014", tags:"cold coffee strong", f:[
    ["You choose the beans","إنت اللي بتختار البن","Coffee snob alert ☕","تحذير: قهوجي متعصب ☕"]]},
  mat:   {cat:["Matcha","ماتشا"], cup:"iced", col:"#8DB255", tags:"cold matcha milky", x:"matcha", f:[
    ["Calm energy, main character focus","طاقة هادية وتركيز بطل","Pilates class not included","كلاس البيلاتس مش معاه"],
    ["Aesthetic without trying","إستاتيك من غير مجهود","Green mustache risk","خطر شنب أخضر"]]},
  mfrap: {cat:["Matcha Frappes","ماتشا فرابيه"], cup:"frappe", col:"#A7C66B", tags:"cold matcha blended sweet", f:[
    ["Matcha, but make it dessert","ماتشا بس بقت تحلية","Brain freeze, green edition","براين فريز النسخة الخضرا"]]},
  shake: {cat:["Milkshakes","ميلك شيك"], cup:"shake", col:"#F3D9B1", fc:1, tags:"cold milky sweet blended nocaf", x:"boba", f:[
    ["Childhood joy, adult budget","فرحة طفولة بميزانية الكبار","You won't share. Don't lie","مش هتشارك حد. ماتكدبش"],
    ["Thick, creamy, emotionally supportive","تقيل وكريمي وبيدعمك نفسيًا","Free straw workout 💪","تمرين شفاطة ببلاش 💪"],
    ["Best with friends and gossip","أحلى مع الشلة والرغي","Brain freeze is part of the deal","البراين فريز جزء من الاتفاق"]]},
  ice:   {cat:["Ice Cream","آيس كريم"], cup:"cone", col:"#FFF4E0", tags:"cold sweet nocaf", f:[
    ["Cheap date, big smile","خروجة رخيصة وضحكة كبيرة","Melts faster than your excuses","بيسيح أسرع من حججك"]]},
  smoo:  {cat:["Smoothies","سموذي"], cup:"smooth", col:"#F7A325", fc:1, tags:"cold fresh blended fruit nocaf", x:"boba", f:[
    ["Fruit, ice, good decisions","فاكهة وتلج وقرارات صح","You'll feel healthy for 10 minutes","هتحس إنك صحي لمدة 10 دقايق"],
    ["Bright color, brighter mood","لون فاقع ومود أفقع","Needs a strong straw","محتاج شفاطة جامدة"]]},
  juice: {cat:["Fresh Juice","عصير فريش"], cup:"juice", col:"#F7A325", fc:1, tags:"cold fresh nocaf", f:[
    ["Fresh and honest, no filters","فريش وصريح ومن غير فلاتر","Mom approves. Suspicious?","ماما موافقة عليه. مريب؟"]]},
  moj:   {cat:["Mojito & Sunshine","موهيتو آند صن شاين"], cup:"mojito", col:"#E8506B", fc:1, tags:"cold fresh fizzy fruit nocaf", x:"boba", f:[
    ["Instant vacation vibes 🌴","فايب إجازة على طول 🌴","Mint in your teeth 😬","نعناع في سنانك 😬"],
    ["Bubbly personality","شخصية فوّارة","Gone before your food arrives","بيخلص قبل الأكل ما ييجي"]]},
  lem:   {cat:["Lemonade Shakers","ليمونادة"], cup:"juice", col:"#F5E663", tags:"cold fresh citrus nocaf", f:[
    ["Zesty and refreshing","فريش وبيصحصح","Sour face guaranteed 😝","وشك هيتكرمش 😝"]]},
  itea:  {cat:["Iced Tea","آيس تي"], cup:"iced", col:"#C9822E", tags:"cold tea fresh", f:[
    ["Chill, fruity, easy-going","رايق وفروتي وسهل","Basic but reliable","بيسك بس يعتمد عليه"]]},
  cloud: {cat:["Cloudy","كلاودي"], cup:"cloudy", col:"#F4A6B5", fc:1, tags:"cold fresh", f:[
    ["Made for your story","معمول عشان الستوري","You'll ask the cashier what Cloudy is","هتسأل الكاشير يعني إيه كلاودي"]]},
  ener:  {cat:["Soft Drinks","سوفت درينكس"], cup:"can", col:"#1F6FCC", tags:"cold energy fizzy", f:[
    ["Exam-night hero","بطل ليلة الامتحان","Sleep? Never heard of her","نوم؟ مين دي؟"]]},
  soft:  {cat:["Soft Drinks","سوفت درينكس"], cup:"iced", col:"#4A2412", tags:"cold", f:[
    ["Fizzy chaos you'll love","فوضى فوّارة هتحبها","Your tongue will feel attacked","لسانك هيحس إنه اتهاجم"]]}
};

// [اللون, تاجز, [EN, AR], ...سطور تانية]
const FLAVORS = {
  van:  ["#F3E3B5","vanilla",["Basic? No. Classic. There's a difference 🤍","بيسك؟ لأ، كلاسيك. وفيه فرق 🤍"]],
  choc: ["#6B3E26","choc",["Chocolate. Need I say more? 🍫","شوكولاتة. محتاج أقول حاجة تانية؟ 🍫"],["Dark, rich, very sure of itself","غامق وغني وواثق من نفسه جدًا"]],
  car:  ["#C98A3D","caramel",["Sweet talker, golden heart 🍯","بيعرف يتكلم حلو وقلبه دهب 🍯"]],
  sc:   ["#B9772F","caramel",["Sweet with a salty attitude 🧂","حلو بس دمه مالح سنة 🧂"],["Sweet and salty, like your best friend","حلو ومالح زي صاحبك الأنتيم"],["The flavor that never gets old","الطعم اللي عمره ما بيقدم"]],
  dul:  ["#B07A45","caramel milky",["Milky caramel, soft-spoken","كراميل بلبن، صوته واطي وطيب"],["Smooth like a 2 AM voice note","ناعم زي فويس نوت الساعة 2 بالليل"]],
  wc:   ["#F1E6D2","choc vanilla",["Soft, sweet, a little extra 🤍","طري وحلو وأوفر سنة 🤍"],["White chocolate is the main character","الوايت شوكليت هي البطلة هنا"]],
  haz:  ["#A0703F","nutty",["Nutty in the best way 🌰","بندق، ومجنون بطريقة حلوة 🌰"]],
  nut:  ["#5A3420","choc nutty",["Spoon-straight-from-the-jar energy 🥄","طاقة المعلقة من البرطمان على طول 🥄"],["Hazelnut chocolate, zero regrets","شوكولاتة بالبندق ومن غير ندم"]],
  lot:  ["#B87333","cookie caramel",["Biscuit crush, caramel soul 🍪","بسكوت لوتس، الكراش اللي مابيخلصش 🍪"],["Tastes like a cozy winter night","طعمه زي قعدة شتوية دافية"]],
  oreo: ["#3B3B3B","cookie choc",["Cookies & cream, never misses 🖤","كوكيز آند كريم، عمره ما بيخيّب 🖤"],["Black and white, zero grey area","أبيض وإسود ومفيش منطقة رمادي"]],
  kin:  ["#D9A066","choc milky",["Childhood memories, grown-up cravings 🧸","ذكريات الطفولة بمزاج الكبار 🧸"]],
  brw:  ["#4A2C1D","choc",["Fudgy, gooey, emotionally available","طري ولزج ومتاح عاطفيًا"]],
  pis:  ["#A5C27A","nutty",["A green flag in flavor form 💚","جرين فلاج على هيئة طعم 💚"],["The trend that deserves the hype","التريند اللي يستاهل الهايب"]],
  pec:  ["#9A6233","nutty",["Fancy nut, fancy mood 🥜","مكسرات فخمة ومود فخم 🥜"]],
  cin:  ["#A0522D","spice",["Warm spice, autumn soul 🍂","قرفة دافية وروح خريفي 🍂"]],
  ban:  ["#F4D35E","fruit",["Potassium, but make it fun 🍌","موز بس بمزاج 🍌"]],
  mar:  ["#F6E7EF","sweet",["Fluffy and proud of it ☁️","منفوش وفخور بده ☁️"]],
  bou:  ["#5A3A26","choc coconut",["Coconut + chocolate = island mode 🏝️","جوز هند وشوكولاتة، مود جزيرة 🏝️"]],
  pb:   ["#C68E4E","nutty",["Peanut butter people know who they are","بتوع زبدة الفول السوداني عارفين نفسهم"]],
  tir:  ["#8B5E3C","choc",["Italian dessert, Alexandrian heart","حلو إيطالي بقلب إسكندراني"]],
  straw:["#E8506B","fruit berry",["Pink and not shy about it 🍓","بينك ومش مكسوف 🍓"],["Sweet, cute, low maintenance","حلو وكيوت ومش متعب"],["Strawberry season is a state of mind","موسم الفراولة ده حالة نفسية"]],
  mango:["#F7A325","fruit tropical",["Summer in a cup, even in winter ☀️","صيف في كوباية حتى في الشتا ☀️"],["Mango never needs a second chance","المانجا عمرها ما محتاجة فرصة تانية"],["Golden, juicy, main character","دهبي وعصيري وبطل الحكاية"]],
  mb:   ["#7D3C98","fruit berry",["A whole berry squad 🫐","شلة توت كاملة 🫐"],["Purple vibes, zero chill","فايب موف ومن غير هدوء"]],
  berry:["#8E2C6B","fruit berry",["Berry sweet, a bit sour, very you","توت حلو وحمضان سنة، شبهك"]],
  blue: ["#4B5FA8","fruit berry",["Blue but never sad 💙","أزرق بس عمره ما زعلان 💙"]],
  pine: ["#F2C94C","fruit tropical",["Spiky outside, sweet inside 🍍","شوك من بره وحلو من جوه 🍍"]],
  pc:   ["#F3E9C6","tropical coconut",["Vacation mode, no passport needed 🏝️","مود إجازة من غير باسبور 🏝️"]],
  peach:["#F8A57B","fruit",["Soft, sweet, a total peach 🍑","طري وحلو وخوخة بجد 🍑"]],
  pf:   ["#F2A516","fruit tropical",["Tangy and dramatic, in a good way","حمضان ودرامي بس بطريقة حلوة"],["Passionate by name and by taste","باشون في الاسم وفي الطعم"]],
  ly:   ["#F2C9CF","fruit",["Floral, rare, kind of mysterious 🌸","زهري ونادر وغامض شوية 🌸"],["Underrated. Give it a chance","مظلوم إعلاميًا. اديله فرصة"]],
  pg:   ["#F28C8C","fruit",["Guava in its pink era 💗","جوافة في عصرها البينك 💗"]],
  cola: ["#4A2412","",["Cola as a milkshake? Trust the process","كولا ميلك شيك؟ ثق في العملية"]],
  lemon:["#F5E663","citrus",["Zesty, wakes up your taste buds 🍋","حامض وبيصحّي حواسك 🍋"]],
  cc:   ["#F7B6D2","sweet",["Pink sugar clouds, zero worries","سحاب سكر بينك ومن غير هموم"]],
  scola:["#5B2E16","sour",["Sour, sweet, chaotic 😜","حمضان وحلو وفوضوي 😜"],["The sour one with main character energy","الحمضان اللي عامل نفسه البطل"]],
  sco:  ["#F4A6B5","berry coconut",["Strawberry is dating coconut. Cute couple","الفراولة مرتبطة بجوز الهند، كابل لذيذ"]],
  mco:  ["#F9C25C","tropical coconut",["Tropical power couple 🥥","أقوى كابل استوائي 🥥"]],
  mpf:  ["#F6A21E","fruit tropical",["Mango brought a friend, it's a party 🥭","المانجا جابت صاحبتها والدنيا ولعت 🥭"]],
  mpe:  ["#F8B55E","fruit",["Two summer fruits, one sunny mood","فاكهتين صيفي ومود مشمس"]],
  coco: ["#F4EFE6","coconut tropical",["Coconut calm, beach energy 🥥","هدوء جوز الهند وطاقة البحر 🥥"]],
  bcar: ["#E6B653","fruit caramel",["Banana and caramel, cozy combo","موز وكراميل، كومبو دافي"]],
  kbr:  ["#6A4029","choc",["Two desserts, one bold decision","حلويتين في قرار واحد جريء"]],
  snk:  ["#7B4A2A","choc nutty caramel",["Nougat, caramel, peanuts. A full meal tbh","نوجا وكراميل وسوداني، وجبة كاملة بصراحة"]],
  kit:  ["#9B5A33","choc cookie",["Crunchy wafer moments","لحظات ويفر مقرمشة"]],
  mars: ["#6E3B22","choc caramel",["From another planet? Pretty much 🪐","من كوكب تاني؟ تقريبًا 🪐"]],
  wat:  ["#F25C6B","fruit",["Summer's favorite child 🍉","ابن الصيف المدلل 🍉"]],
  guava:["#EFB3A1","fruit",["Thick, sweet, very Egyptian 💚","تقيلة وحلوة ومصرية جدًا 💚"]],
  date: ["#A47148","milky sweet",["Dates and milk, Ramadan-level comfort 🌙","بلح بلبن، راحة مستوى رمضان 🌙"]],
  avo:  ["#9DBF6B","milky",["Healthy-ish and proud 🥑","صحي نوعًا ما وفخور 🥑"]]
};

const MENU = [
  // Coffee
  ["Espresso",[60,70],"shot",0,{b:["Small but gets the job done ☕","صغير بس بيعمل شغل كبير ☕"]}],
  ["Macchiato",[70,80],"small",0,{b:["An espresso that learned to smile","إسبريسو بس اتعلّم يبتسم"]}],
  ["Cortado",[80,90],"small",0,{b:["Half coffee, half milk. Fair and balanced ⚖️","نص قهوة ونص لبن، عادل ومتوازن ⚖️"],c:"#B07D55"}],
  ["Flat White",[80,90],"small",0,{b:["Velvet smooth, still means business","ناعم زي القطيفة بس جد في شغله"],c:"#C29467"}],
  ["Cappuccino",[85,100],"latte",0,{b:["Big foam, bigger confidence ☁️","رغوة كتير وثقة أكتر ☁️"]}],
  ["Latte",[85,100],"latte",0,{b:["The friend you pick when you can't decide","الصاحب اللي بتختاره لما تحتار"]}],
  ["Americano Black",[null,80],"black",0,{b:["Straight to the point, no small talk","دغري ومابيحبش الرغي"]}],
  ["Americano White",[null,100],"latte",0,{b:["Americano with softer manners","أمريكانو بس اتعلّم الذوق"]}],
  ["Spanish Latte",[90,100],"latte",0,{b:["Sweet but strong 💅 everyone's crush","حلو بس تقيل 💅 كراش الكل"],t:"sweet"}],
  ["Mocha",[100,120],"flat","choc",{b:["Coffee and chocolate, officially dating 🍫","القهوة والشوكولاتة مرتبطين رسمي 🍫"]}],
  ["White Mocha",[100,120],"flat","wc"],
  ["Salted Caramel Latte",[100,120],"flat","sc"],
  ["Dulce de Leche Latte",[100,120],"flat","dul"],
  ["Pecan Latte",[130,150],"flat","pec"],
  ["Pistachio Latte",[130,150],"flat","pis"],
  ["Nescafé Black",[50,60],"inst",0,{b:["The OG study-night buddy","رفيق ليالي المذاكرة من زمان"],t:"strong"}],
  ["Nescafé with Milk",[70,80],"inst",0,{b:["Nostalgia in a mug 🥹","نوستالجيا في مج 🥹"],c:"#B88A62",t:"milky"}],
  ["V60",140,"black",0,{b:["You pick the beans. Respect 🤝","إنت اللي بتختار البن. احترام 🤝"],u:"v60"}],
  // Turkish
  ["Turkish Coffee",[50,60],"turk",0,{b:["The classic that never let you down ☕","الكلاسيك اللي عمره ما خذلك ☕"]}],
  ["Turkish Coffee Mahaweg",[55,65],"turk",0,{b:["Turkish with spice and personality 🔥","تركي بس محوّج وليه شخصية 🔥"],t:"spice"}],
  ["French Coffee",[65,75],"turk",0,{b:["Turkish with milk, the soft one in the family","تركي بلبن، الحنين اللي في العيلة"],c:"#A47148",t:"milky"}],
  ["Hazelnut Coffee",[80,95],"fturk","haz"],
  ["Nutella Coffee",[80,95],"fturk","nut"],
  ["White Chocolate Coffee",[80,95],"fturk","wc"],
  ["Salted Caramel Coffee",[80,95],"fturk","sc"],
  // Hot chocolate & creamy
  ["Hot Chocolate",[85,100],"choc",0,{b:["A hug in a mug 🤎","حضن في مج 🤎"]}],
  ["Nutella Hot Chocolate",[95,120],"choc","nut"],
  ["Marshmallow Hot Chocolate",[95,120],"choc","mar"],
  ["Oreo Hot Chocolate",[95,120],"choc","oreo"],
  ["Bounty Hot Chocolate",[95,120],"choc","bou"],
  ["Peanut Butter Hot Chocolate",[95,120],"choc","pb"],
  ["Tiramisu Hot Chocolate",[120,140],"choc","tir"],
  ["Hot Kinder",[120,140],"cream","kin"],
  ["Hot Lotus",[120,140],"cream","lot"],
  ["Hot Pistachio",[135,150],"cream","pis"],
  // Hot drinks
  ["Tea",30,"tea",0,{b:["Tea. Needs no introduction 🫖","الشاي. مش محتاج تعريف 🫖"]}],
  ["Green Tea",35,"tea",0,{b:["Calm, in its self-care era 🌿","هادي وفي مرحلة حب النفس 🌿"],c:"#C2B04A"}],
  ["Herbal Tea",35,"tea",0,{b:["Tells you to breathe, and it's right 🌼","بيقولك اهدى، وعنده حق 🌼"],c:"#D9A441"}],
  ["Flavored Tea",40,"tea",0,{b:["Tea, but dressed up","شاي بس لابس شيك"],c:"#C0603A"}],
  ["Milk Tea",50,"tea",0,{b:["Tea with milk, tastes like home","شاي بلبن، طعم البيت"],c:"#C8A27A",u:"mug",t:"milky"}],
  ["Hot Lemon",35,"hot",0,{b:["Cold-season best friend 🍋","صاحبك الأنتيم في موسم البرد 🍋"],c:"#F2D45C",t:"citrus nocaf"}],
  ["Hot Cider",70,"hot",0,{b:["Warm apple, winter vibes 🍎","تفاح دافي وفايب شتوي 🍎"],c:"#C7782E",t:"fruit nocaf"}],
  ["Hot Matcha",95,"hot",0,{b:["Green, calm, sneaky energy 🍵","أخضر وهادي بس بيصحّي 🍵"],c:"#8DB255",t:"matcha milky"}],
  // Iced coffee
  ["Iced Coffee",110,"icof",0,{b:["The go-to when you're in a rush","الأساسي وإنت مستعجل"]}],
  ["Iced Caramel Macchiato",120,"icof","car",{b:["Layers, caramel, camera-ready 📸","طبقات وكراميل وجاهز للصورة 📸"]}],
  ["Iced Spanish Latte",120,"icof",0,{b:["The menu's official crush 💅","الكراش الرسمي للمنيو 💅"],t:"sweet"}],
  ["Iced White Mocha",125,"icof","wc"],
  ["Iced Blended Mocha",125,"icof","choc",{b:["Mocha that got blended and loves it","موكا اتخلطت ومزاجها عالي"],t:"blended"}],
  ["Iced Brown Sugar Latte",125,"icof",0,{b:["Brown sugar warmth, served cold","دفا السكر البني بس ساقع"],t:"sweet caramel"}],
  ["Iced Salted Caramel Latte",125,"icof","sc"],
  ["Iced Spanish Pecan Latte",150,"icof","pec",{b:["Spanish latte after the glow-up 🥜","السبانيش لاتيه بعد الجلو أب 🥜"]}],
  // Frappes
  ["Classic Frappe",130,"frap",0,{b:["Ice, coffee, no drama","تلج وقهوة ومن غير دراما"]}],
  ["White Mocha Frappe",145,"frap","wc"],
  ["Salted Caramel Frappe",145,"frap","sc"],
  ["Chocolate Frappe",145,"frap","choc"],
  ["Cinnamon Frappe",145,"frap","cin"],
  ["Lotus Frappe",145,"frap","lot"],
  ["Oreo Frappe",145,"frap","oreo"],
  ["Brownies Frappe",145,"frap","brw"],
  ["Dulce de Leche Frappe",145,"frap","dul"],
  ["Banana Frappe",145,"frap","ban"],
  // Iced shaken & V60
  ["Iced Shaken White Mocha",140,"shak","wc"],
  ["Iced Shaken Salted Caramel",140,"shak","sc"],
  ["Iced Shaken Dulce de Leche",140,"shak","dul"],
  ["Iced V60",150,"iv60",0,{b:["Pour-over, but make it cold 🧊","V60 بس ساقع ومزاجه رايق 🧊"]}],
  // Matcha
  ["Iced Matcha Latte",125,"mat",0,{b:["That girl in a cup 🍵","الـthat girl في كوباية 🍵"]}],
  ["Iced Spanish Matcha",135,"mat",0,{b:["Matcha that found condensed milk 💚","ماتشا لقت اللبن المكثف وحبته 💚"],t:"sweet"}],
  ["White Chocolate Iced Matcha",140,"mat","wc"],
  ["Banana Caramel Iced Matcha",140,"mat","bcar"],
  ["Salted Caramel Iced Matcha",140,"mat","sc"],
  ["Strawberry Iced Matcha",140,"mat","straw"],
  ["Mango Coconut Iced Matcha",140,"mat","mco"],
  ["Passion Fruit Iced Matcha",140,"mat","pf"],
  ["Lychee Iced Matcha",140,"mat","ly"],
  ["Strawberry Coconut Iced Matcha",140,"mat","sco"],
  ["Mango Matcha Frappe",150,"mfrap","mango"],
  ["Strawberry Matcha Frappe",150,"mfrap","straw"],
  ["Coconut Matcha Frappe",150,"mfrap","coco"],
  ["White Chocolate Matcha Frappe",150,"mfrap","wc"],
  ["Lychee Matcha Frappe",150,"mfrap","ly"],
  // Energy
  ["Red Bull",90,"ener",0,{b:["No intro needed. You know what it does ⚡","مش محتاج تعريف، إنت عارف بيعمل إيه ⚡"]}],
  ["Flavored Red Bull",135,"ener",0,{b:["Energy with a flavor twist ⚡","طاقة بتويست نكهة ⚡"],c:"#E85A8C"}],
  // Milkshakes
  ["Vanilla Milkshake",130,"shake","van"],
  ["Chocolate Milkshake",130,"shake","choc"],
  ["Caramel Milkshake",130,"shake","car"],
  ["Salted Caramel Milkshake",130,"shake","sc"],
  ["Mango Milkshake",130,"shake","mango"],
  ["Strawberry Milkshake",130,"shake","straw"],
  ["Mixed Berry Milkshake",130,"shake","mb"],
  ["Pineapple Milkshake",130,"shake","pine"],
  ["Blueberry Milkshake",130,"shake","blue"],
  ["Cola Milkshake",130,"shake","cola"],
  ["Peach Milkshake",130,"shake","peach"],
  ["Lemon Milkshake",130,"shake","lemon"],
  ["Passion Fruit Milkshake",130,"shake","pf"],
  ["Lychee Milkshake",130,"shake","ly"],
  ["Pink Guava Milkshake",130,"shake","pg"],
  ["Cotton Candy Milkshake",130,"shake","cc"],
  ["Sour Cola Milkshake",130,"shake","scola"],
  ["Mango Passion Fruit Milkshake",140,"shake","mpf"],
  ["Mango Peach Milkshake",140,"shake","mpe"],
  ["Strawberry Coconut Milkshake",140,"shake","sco"],
  ["Mango Coconut Milkshake",140,"shake","mco"],
  ["Brownies Milkshake",140,"shake","brw"],
  ["Nutella Milkshake",140,"shake","nut"],
  ["Lotus Milkshake",140,"shake","lot"],
  ["Oreo Milkshake",140,"shake","oreo"],
  ["Kinder Milkshake",140,"shake","kin"],
  ["Berry Yogurt",140,"shake","berry",{b:["Tangy, creamy, your gut says yes","زبادي حمضان وكريمي ومعدتك موافقة"]}],
  ["Mango Yogurt",140,"shake","mango",{b:["Mango meets yogurt. Fresh start","مانجا قابلت الزبادي. بداية جديدة"]}],
  ["Cheesecake Berry",140,"shake","berry",{b:["Dessert pretending to be a drink 🍰","تشيز كيك عامل نفسه مشروب 🍰"]}],
  ["Cheesecake Strawberry",140,"shake","straw",{b:["Strawberry cheesecake, now sippable 🍰","تشيز كيك فراولة بس بيتشرب 🍰"]}],
  ["Cheesecake Blueberry",140,"shake","blue",{b:["Blueberry cheesecake in its liquid era","تشيز كيك بلوبيري في عصره السايل"]}],
  ["White Chocolate Strawberry",140,"shake","straw",{b:["Strawberries dipped in white chocolate, but drinkable","فراولة متغطسة وايت شوكليت بس بتتشرب"],t:"choc"}],
  ["Kinder Brownies Milkshake",150,"shake","kbr"],
  ["Snickers Milkshake",150,"shake","snk"],
  ["KitKat Milkshake",150,"shake","kit"],
  ["Mars Milkshake",150,"shake","mars"],
  ["Bounty Milkshake",150,"shake","bou"],
  ["Berry Yogurt Cheesecake",150,"shake","berry",{b:["Yogurt, berries, cheesecake. Overachiever","زبادي وتوت وتشيز كيك، شاطر زيادة عن اللزوم"]}],
  ["Milk Nutella Banana",150,"shake","nut",{b:["Nutella and banana, breakfast of champions","نوتيلا وموز، فطار الأبطال"],t:"fruit"}],
  ["Jelly Cola Mix",150,"shake","cola",{b:["The chaotic one in the group. Respect 😜","الفوضوي بتاع الشلة. احترام 😜"]}],
  ["Cotton Candy Marshmallow",150,"shake","cc",{b:["A whole theme park in a cup 🎡","ملاهي كاملة في كوباية 🎡"]}],
  ["Pecan Salted Caramel",160,"shake","pec",{b:["Pecan + salted caramel = premium mood","بيكان وسولتد كراميل، مود بريميوم"],t:"caramel"}],
  ["Cashew Caramel",160,"shake","car",{b:["Cashew and caramel, quietly elite","كاجو وكراميل، فخامة في صمت"],t:"nutty"}],
  ["Pistachio Milkshake",170,"shake","pis",{b:["Priciest on the menu and knows it 💅","أغلى واحد في المنيو وعارف كده 💅"]}],
  // Ice cream
  ["Soft Ice Cream (Flavor / Boba)",70,"ice",0,{b:["Soft serve, soft heart 🍦","آيس كريم سوفت وقلب سوفت 🍦"],k:"boba"}],
  ["Soft Ice Cream (Brownies / Oreo)",85,"ice",0,{b:["Ice cream with toppings. Obviously yes","آيس كريم بتوبينج. أكيد آه"],k:"chunk"}],
  // Smoothies
  ["Watermelon Smoothie",100,"smoo","wat"],
  ["Mango Smoothie",100,"smoo","mango"],
  ["Strawberry Smoothie",100,"smoo","straw"],
  ["Pineapple Smoothie",100,"smoo","pine"],
  ["Piña Colada Smoothie",100,"smoo","pc"],
  ["Peach Smoothie",100,"smoo","peach"],
  ["Pink Guava Smoothie",100,"smoo","pg"],
  ["Blueberry Smoothie",100,"smoo","blue"],
  ["Mixed Berry Smoothie",100,"smoo","mb"],
  ["Passion Fruit Smoothie",100,"smoo","pf"],
  ["Lychee Smoothie",100,"smoo","ly"],
  // Fresh juice
  ["Mango Juice",85,"juice","mango"],
  ["Strawberry Juice",85,"juice","straw"],
  ["Guava Juice",85,"juice","guava"],
  ["Date with Milk",85,"juice","date"],
  ["Watermelon Juice",85,"juice","wat"],
  ["Avocado with Honey",120,"juice","avo"],
  // Mojito & Sunshine
  ["Strawberry Mojito",100,"moj","straw"],
  ["Berry Mojito",100,"moj","berry"],
  ["Pineapple Mojito",100,"moj","pine"],
  ["Blueberry Mojito",100,"moj","blue"],
  ["Mixed Berry Mojito",100,"moj","mb"],
  ["Peach Mojito",100,"moj","peach"],
  ["Passion Fruit Mojito",100,"moj","pf"],
  ["Lychee Mojito",100,"moj","ly"],
  // Lemonade
  ["Pink Lemon Coconut",120,"lem",0,{b:["Pink lemonade with a coconut twist","ليمونادة بينك بتويست جوز هند"],c:"#F49AC1",t:"coconut"}],
  ["Mango Lemon Coconut",120,"lem",0,{b:["Mango, lemon, coconut: the trio","مانجا وليمون وجوز هند، التلاتي"],c:"#F7C24A",t:"tropical coconut"}],
  ["Pina Colada Lemonade",120,"lem",0,{b:["Piña colada met lemonade at the beach","البينا كولادا قابلت الليمونادة على البحر"],c:"#F5EBB0",t:"tropical"}],
  // Iced tea
  ["Passion Fruit Iced Tea",100,"itea","pf"],
  ["Mixed Berries Iced Tea",100,"itea","mb"],
  ["Strawberry Iced Tea",100,"itea","straw"],
  // Cloudy
  ["Piña Colada Cloudy",130,"cloud","pc"],
  ["Lychee Cloudy",130,"cloud","ly"],
  ["Mixed Berry Cloudy",130,"cloud","mb"],
  ["Strawberry Cloudy",130,"cloud","straw"],
  ["Passion Fruit Cloudy",130,"cloud","pf"],
  // Soft drinks
  ["Sour Cola",110,"soft","scola",{t:"fizzy"}],
  ["Water",12,"soft",0,{b:["Hydration is self-care 💧","المية حياة 💧"],u:"bottle",c:"#BFE3FF",t:"fresh",
    f:["Zero calories, zero drama","صفر سعرات وصفر دراما","Literally just water","مية يعني"]}]
];

// أول كروت بتظهر للزبون. غيّرها لأكتر حاجات بتتباع عندكم
const STARTERS = ["Iced Spanish Latte","Lotus Milkshake","Spanish Latte","Mango Smoothie","Strawberry Mojito",
  "Hot Chocolate","Iced Matcha Latte","Turkish Coffee","Oreo Frappe","Red Bull"];