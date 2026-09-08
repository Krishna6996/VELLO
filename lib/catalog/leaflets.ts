import type { Regimen } from "@/lib/catalog/types";

/**
 * Plain leaflet text per molecule, in the Vello voice. Every brand of a
 * molecule shares this; the brand adds only its name, strength, form and pack.
 * Nothing here goes beyond what a patient leaflet says.
 */
export interface Leaflet {
  /** Two sentences on what it does and when doctors prescribe it. */
  about: string;
  howToTake: string;
  sideEffects: readonly string[];
  warnings: readonly string[];
  storage?: string;
  regimen?: Regimen;
}

export const defaultStorage =
  "Keep below 25°C, in the original pack, away from moisture and out of children's reach.";

const topicalStorage = "Keep below 25°C with the cap closed, out of children's reach.";

export const leaflets: Record<string, Leaflet> = {
  Metformin: {
    about:
      "Metformin lowers blood sugar by helping the body respond to its own insulin and by reducing the sugar the liver releases. It is usually the first medicine prescribed for type 2 diabetes and is often taken for years.",
    howToTake:
      "Take it with or just after a meal, as your doctor wrote. Swallow sustained-release tablets whole; don't crush or chew them.",
    sideEffects: [
      "Loose motions, nausea or a metallic taste, usually in the first weeks",
      "Stomach discomfort or less appetite",
      "Low vitamin B12 over long use, rarely",
    ],
    warnings: [
      "Tell your doctor about any kidney problem; the dose depends on kidney function",
      "Stop and call your doctor if you have severe vomiting, fast breathing or unusual drowsiness",
      "Avoid heavy alcohol while taking it",
    ],
    regimen: { pattern: "1-0-1", note: "after food" },
  },
  Glimepiride: {
    about:
      "Glimepiride helps the pancreas release more insulin, which lowers blood sugar. It is taken once a day, usually with breakfast.",
    howToTake:
      "Take it just before or with your first main meal. Don't skip the meal after taking it.",
    sideEffects: [
      "Low blood sugar: shakiness, sweating, hunger, confusion",
      "Weight gain",
      "Headache or dizziness",
    ],
    warnings: [
      "Keep something sweet with you and learn the signs of low sugar",
      "Tell your doctor if you're fasting, unwell or eating less than usual",
      "Alcohol makes low sugar more likely",
    ],
    regimen: { pattern: "1-0-0", note: "with breakfast" },
  },
  "Glimepiride + metformin": {
    about:
      "This combines two diabetes medicines in one tablet: glimepiride, which helps the pancreas release insulin, and metformin, which helps the body use it. Doctors prescribe it when one medicine alone isn't enough.",
    howToTake: "Take it with breakfast, or as written. Don't skip meals after a dose.",
    sideEffects: [
      "Low blood sugar: shakiness, sweating, hunger, confusion",
      "Nausea, loose motions or a metallic taste",
      "Headache",
    ],
    warnings: [
      "Tell your doctor about any kidney problem",
      "Learn the signs of low sugar and keep something sweet with you",
      "Avoid heavy alcohol while taking it",
    ],
    regimen: { pattern: "1-0-0", note: "with breakfast" },
  },
  Vildagliptin: {
    about:
      "Vildagliptin helps the body release insulin after meals and lowers the sugar the liver makes. It is usually added when metformin alone isn't enough, and on its own it rarely causes low blood sugar.",
    howToTake: "Take it once or twice a day, with or without food, as written.",
    sideEffects: ["Headache or dizziness", "Nausea", "Joint pain or skin blistering, rarely"],
    warnings: [
      "Tell your doctor about any liver problem; a liver test may be needed before starting",
      "Stop and call your doctor if your eyes yellow or your urine turns dark",
    ],
    regimen: { pattern: "1-0-1", note: "with or without food" },
  },
  "Blood glucose test strips": {
    about:
      "Test strips for a matching glucose meter. Each strip is used once with a small drop of blood from a fingertip.",
    howToTake:
      "Use only with the matching meter. Check the expiry date and close the box tightly after taking a strip out.",
    sideEffects: [],
    warnings: [
      "Strips made for other meters won't work with this one",
      "Don't use strips that have been left open or exposed to moisture",
    ],
    storage: "Keep in the original box, closed, below 30°C.",
  },
  Lancets: {
    about:
      "Sterile single-use lancets for a lancing device. One lancet, one prick, then it goes in a closed container.",
    howToTake: "Load a fresh lancet each time. Dispose of used lancets in a closed container.",
    sideEffects: [],
    warnings: ["Never share lancets or the lancing device, even within the family"],
    storage: "Keep dry, in the original box.",
  },
  "Blood pressure monitor": {
    about:
      "An automatic upper-arm blood pressure monitor. It gives a reading in about 30 seconds and shows the upper number, the lower number and the pulse.",
    howToTake:
      "Sit quietly for five minutes with your arm resting at heart level, before medicine, tea or coffee. Take two readings a minute apart and note both.",
    sideEffects: [],
    warnings: [
      "A single high reading isn't a diagnosis; share a week of readings with your doctor",
      "The cuff must fit the arm; a cuff that is too small or too large gives a wrong number",
    ],
    storage: "Keep dry, away from heat.",
  },
  Telmisartan: {
    about:
      "Telmisartan relaxes blood vessels so blood flows with less pressure. It is taken once a day and does its job only when it is taken every day, even when you feel fine.",
    howToTake: "Take it once a day at the same time, with or without food.",
    sideEffects: [
      "Dizziness, especially when standing up",
      "Back pain or a blocked nose",
      "High potassium, rarely",
    ],
    warnings: [
      "Don't take it in pregnancy or if you're planning one; tell your doctor",
      "Tell your doctor if you have kidney problems or take potassium supplements",
      "Don't stop suddenly; blood pressure can rise again",
    ],
    regimen: { pattern: "1-0-0", note: "same time each day" },
  },
  "Telmisartan + amlodipine": {
    about:
      "Two blood pressure medicines in one tablet: telmisartan relaxes blood vessels and amlodipine keeps them relaxed. Doctors prescribe it when one medicine alone doesn't bring the number down enough.",
    howToTake: "Take it once a day at the same time, with or without food.",
    sideEffects: ["Swollen ankles", "Dizziness or flushing", "Headache in the first weeks"],
    warnings: [
      "Don't take it in pregnancy or if you're planning one; tell your doctor",
      "Tell your doctor about kidney or liver problems",
      "Don't stop suddenly; blood pressure can rise again",
    ],
    regimen: { pattern: "1-0-0", note: "same time each day" },
  },
  Amlodipine: {
    about:
      "Amlodipine relaxes the muscle in blood vessel walls, which lowers blood pressure and eases chest pain from angina. It is taken once a day and takes a week or two to show its full effect.",
    howToTake: "Take it once a day at the same time, with or without food.",
    sideEffects: ["Swollen ankles or feet", "Flushing or headache", "Tiredness"],
    warnings: [
      "Tell your doctor about liver problems",
      "Grapefruit can raise the level of this medicine in the blood",
      "Don't stop suddenly; blood pressure can rise again",
    ],
    regimen: { pattern: "1-0-0", note: "same time each day" },
  },
  Aspirin: {
    about:
      "Low-dose aspirin makes blood less likely to clot. Doctors prescribe it to lower the risk of heart attack or stroke in people who are at risk or have had one.",
    howToTake: "Take it once a day after food. Don't crush a coated tablet.",
    sideEffects: [
      "Stomach irritation or heartburn",
      "Bruising more easily",
      "Bleeding that takes longer to stop",
    ],
    warnings: [
      "Tell your doctor if you have a stomach ulcer, asthma or a bleeding problem",
      "Tell your dentist or surgeon before any procedure",
      "Not for children or teenagers with a fever",
    ],
    regimen: { pattern: "1-0-0", note: "after breakfast" },
  },
  Atorvastatin: {
    about:
      "Atorvastatin lowers cholesterol by reducing how much the liver makes. It is taken every day for the long term to lower the risk of heart attack and stroke.",
    howToTake:
      "Take it once a day at the same time, with or without food. Many people take it at night.",
    sideEffects: ["Muscle aches", "Headache or nausea", "Raised liver enzymes, rarely"],
    warnings: [
      "Tell your doctor about muscle pain or weakness, especially with fever",
      "Tell your doctor if you have liver problems or drink heavily",
      "Not for use in pregnancy",
    ],
    regimen: { pattern: "0-0-1", note: "at night" },
  },
  Rosuvastatin: {
    about:
      "Rosuvastatin lowers cholesterol by reducing how much the liver makes. It is one of the stronger statins, so smaller doses are used, and it is taken every day for the long term.",
    howToTake: "Take it once a day at the same time, with or without food.",
    sideEffects: ["Muscle aches", "Headache or constipation", "Raised liver enzymes, rarely"],
    warnings: [
      "Tell your doctor about muscle pain or weakness, especially with fever",
      "Tell your doctor if you have kidney or liver problems",
      "Not for use in pregnancy",
    ],
    regimen: { pattern: "0-0-1", note: "at night" },
  },
  Levothyroxine: {
    about:
      "Levothyroxine replaces the thyroid hormone the body isn't making enough of. It is a small tablet, taken once a day on an empty stomach, usually for life.",
    howToTake:
      "Take it first thing in the morning with water, 30 to 60 minutes before food, tea or coffee. Keep iron, calcium and antacids at least four hours away.",
    sideEffects: [
      "If the dose is too high: palpitations, sweating, weight loss, trouble sleeping",
      "If the dose is too low: tiredness, weight gain, feeling cold",
      "Hair thinning in the first months, which usually settles",
    ],
    warnings: [
      "Don't change brand or strength without your doctor; small differences matter",
      "Tell your doctor if you're pregnant; the dose often needs adjusting",
      "Blood tests every few months guide the dose",
    ],
    storage: "Keep below 25°C with the cap tight, away from light and moisture.",
    regimen: { pattern: "1-0-0", note: "empty stomach" },
  },
  Minoxidil: {
    about:
      "Minoxidil solution is applied to the scalp to slow hair loss and help regrowth in pattern baldness. It takes three to six months to see a difference, and the effect lasts only while you keep using it.",
    howToTake:
      "Apply 1ml to the dry scalp twice a day and spread with fingertips. Wash your hands after. Don't use more than written.",
    sideEffects: [
      "Scalp itching, dryness or flaking",
      "Some extra shedding in the first weeks",
      "Unwanted hair where the solution runs",
    ],
    warnings: [
      "Keep it away from the eyes and broken skin",
      "Stop and see a doctor if you get chest pain, a fast heartbeat or dizziness",
      "Not for use in pregnancy or while breastfeeding",
    ],
    storage: "Keep below 25°C with the cap closed, away from flame.",
    regimen: { pattern: "1-0-1", note: "apply to dry scalp" },
  },
  Finasteride: {
    about:
      "Finasteride 1mg lowers the hormone that shrinks hair follicles in male pattern baldness. It is taken once a day, and results take three to six months to show.",
    howToTake: "One tablet a day, with or without food, at about the same time.",
    sideEffects: [
      "Lower sex drive or trouble with erections in a small number of men",
      "Breast tenderness",
      "Mood changes; tell your doctor",
    ],
    warnings: [
      "Not for women or children; women who are or may become pregnant shouldn't handle crushed or broken tablets",
      "Tell your doctor before a PSA blood test; finasteride lowers the result",
    ],
    regimen: { pattern: "1-0-0", note: "same time each day" },
  },
  Clotrimazole: {
    about:
      "Clotrimazole is an antifungal cream for ringworm, athlete's foot, jock itch and other fungal skin infections. It works on the fungus that causes the itch and rash.",
    howToTake:
      "Wash and dry the area, then apply a thin layer twice a day. Keep going for two weeks after the rash clears so it doesn't come back.",
    sideEffects: ["Mild burning or stinging where applied", "Redness or itching"],
    warnings: [
      "Don't use it in the eyes or mouth",
      "See a doctor if it's no better after four weeks",
      "Keep the area dry; fungi like damp skin",
    ],
    storage: topicalStorage,
    regimen: { pattern: "1-0-1", note: "thin layer on clean, dry skin" },
  },
  Clindamycin: {
    about:
      "Clindamycin gel is an antibiotic applied to the skin for acne with red, inflamed pimples. It reduces the bacteria that cause them.",
    howToTake:
      "Apply a thin film to the affected area once or twice a day on clean, dry skin, as written.",
    sideEffects: ["Dryness, peeling or oiliness", "Mild burning or itching"],
    warnings: [
      "Keep it away from the eyes, mouth and broken skin",
      "Stop and see a doctor if you get severe or bloody diarrhoea",
      "Use it only as long as your doctor says; long use can breed resistance",
    ],
    storage: topicalStorage,
    regimen: { pattern: "1-0-1", note: "thin film on clean skin" },
  },
  "Benzoyl peroxide": {
    about:
      "Benzoyl peroxide kills acne bacteria and helps unblock pores. The 2.5% strength works about as well as stronger ones with less irritation.",
    howToTake:
      "Start once a day on clean, dry skin and build up to twice a day if your skin tolerates it. Use a moisturiser and sunscreen.",
    sideEffects: ["Dryness, redness and peeling, especially in the first weeks", "Mild stinging"],
    warnings: [
      "It bleaches fabric; let it dry before dressing and use a white towel",
      "Keep it away from the eyes, lips and broken skin",
      "Stop if you get severe swelling or blistering",
    ],
    storage: topicalStorage,
    regimen: { pattern: "0-0-1", note: "at night, on clean skin" },
  },
  "Betamethasone valerate": {
    about:
      "Betamethasone is a steroid cream for eczema, dermatitis and other itchy, inflamed skin. It calms the inflammation; it doesn't treat infections.",
    howToTake:
      "Apply a thin layer once or twice a day to the affected skin only, for the number of days your doctor wrote.",
    sideEffects: [
      "Thinning of the skin with long use",
      "Burning or stinging at first",
      "Stretch marks or lighter patches with long use",
    ],
    warnings: [
      "Don't use it on the face, in skin folds or on children unless a doctor said so",
      "Don't use it on fungal infections or acne; it can make them worse",
      "Don't cover it with a dressing unless told to",
    ],
    storage: topicalStorage,
    regimen: { pattern: "1-0-1", note: "thin layer, affected skin only" },
  },
  Sildenafil: {
    about:
      "Sildenafil helps men get and keep an erection by improving blood flow when there is sexual arousal. It works for about four hours and doesn't affect desire.",
    howToTake:
      "Take one tablet about an hour before sex, not more than once a day. A heavy meal delays it.",
    sideEffects: [
      "Headache or flushing",
      "Blocked nose or indigestion",
      "Changes in colour vision",
    ],
    warnings: [
      "Never take it with nitrates, the heart medicines such as isosorbide or nitroglycerin; the combination is dangerous",
      "Tell your doctor about heart disease, a recent stroke or very low blood pressure",
      "Get medical help if an erection lasts more than four hours",
    ],
  },
  Tadalafil: {
    about:
      "Tadalafil helps with erections in the same way as sildenafil but lasts longer, up to 36 hours. It works only with sexual arousal.",
    howToTake:
      "Take one tablet at least 30 minutes before sex, not more than once a day, with or without food.",
    sideEffects: ["Headache", "Back or muscle ache", "Indigestion or flushing"],
    warnings: [
      "Never take it with nitrates, the heart medicines such as isosorbide or nitroglycerin; the combination is dangerous",
      "Tell your doctor about heart disease, a recent stroke or very low blood pressure",
      "Get medical help if an erection lasts more than four hours",
    ],
  },
  Dapoxetine: {
    about:
      "Dapoxetine is taken before sex to delay ejaculation. It is a short-acting medicine from the same family as some antidepressants, made for this use.",
    howToTake:
      "Take one tablet one to three hours before sex with a full glass of water, not more than once in 24 hours.",
    sideEffects: [
      "Nausea or dizziness",
      "Headache",
      "Feeling faint, especially when standing up quickly",
    ],
    warnings: [
      "Don't take it with alcohol; fainting is more likely",
      "Tell your doctor if you take antidepressants or migraine medicines, or have heart problems",
      "Not for men under 18 or over 65",
    ],
  },
  Fluconazole: {
    about:
      "Fluconazole is an antifungal tablet. A single 150mg dose treats most vaginal yeast infections; longer courses are used for other fungal infections.",
    howToTake:
      "Swallow one tablet with water, with or without food. If symptoms return within two months, see your doctor rather than repeating it.",
    sideEffects: [
      "Headache or nausea",
      "Stomach pain or loose motions",
      "Rash; stop and see a doctor if it spreads",
    ],
    warnings: [
      "Tell your doctor about liver problems and other medicines; fluconazole interacts with many",
      "Avoid it in pregnancy unless your doctor says otherwise",
    ],
  },
  Escitalopram: {
    about:
      "Escitalopram is an antidepressant used for depression and anxiety. It takes two to four weeks to start helping and is usually taken for several months or longer.",
    howToTake: "One tablet a day, morning or evening, with or without food, at the same time.",
    sideEffects: [
      "Nausea, dry mouth or sweating, usually easing in the first weeks",
      "Trouble sleeping or feeling drowsy",
      "Changes in sex drive",
    ],
    warnings: [
      "Don't stop suddenly; your doctor will lower the dose gradually",
      "Tell your doctor straight away about new or worse thoughts of harming yourself, especially in the first weeks",
      "Tell your doctor about other medicines, including painkillers and migraine tablets",
    ],
    regimen: { pattern: "1-0-0", note: "same time each day" },
  },
  Sertraline: {
    about:
      "Sertraline is an antidepressant used for depression, anxiety, panic and obsessive thoughts. It takes two to four weeks to start helping and is usually taken for several months or longer.",
    howToTake: "One tablet a day, morning or evening, with food, at the same time.",
    sideEffects: [
      "Nausea, loose motions or sweating, usually easing in the first weeks",
      "Trouble sleeping or feeling drowsy",
      "Changes in sex drive",
    ],
    warnings: [
      "Don't stop suddenly; your doctor will lower the dose gradually",
      "Tell your doctor straight away about new or worse thoughts of harming yourself, especially in the first weeks",
      "Tell your doctor about other medicines, including painkillers and migraine tablets",
    ],
    regimen: { pattern: "1-0-0", note: "with food, same time each day" },
  },
  Melatonin: {
    about:
      "Melatonin is the hormone that signals night to the body. A small dose before bed can help reset sleep timing, for example after travel or a shifted routine.",
    howToTake:
      "Take one tablet 30 to 60 minutes before bedtime, at the same time each night, for as long as your doctor suggests.",
    sideEffects: ["Morning drowsiness", "Headache or vivid dreams"],
    warnings: [
      "Don't drive after taking it",
      "Tell your doctor if you take blood thinners, blood pressure medicine or antidepressants",
      "Not a treatment for long-term insomnia on its own",
    ],
    regimen: { pattern: "0-0-1", note: "30 minutes before bed" },
  },
  Zolpidem: {
    about:
      "Zolpidem is a sleeping tablet for short-term insomnia. It helps you fall asleep and is meant for a few nights or weeks, not months.",
    howToTake:
      "Take it just before bed, only on nights when you can sleep for seven to eight hours. Not more than one tablet a night.",
    sideEffects: [
      "Drowsiness or unsteadiness the next morning",
      "Headache or dizziness",
      "Walking or eating during sleep without remembering, rarely",
    ],
    warnings: [
      "Don't take it with alcohol or other sedatives",
      "Don't drive the next morning if you feel drowsy",
      "It can be habit-forming; use it only as written and don't stop suddenly after long use",
    ],
    regimen: { pattern: "0-0-1", note: "at bedtime" },
  },
  "Mefenamic acid + dicyclomine": {
    about:
      "Mefenamic acid eases period pain and dicyclomine relaxes the cramping muscle. Together they treat painful periods and stomach cramps.",
    howToTake:
      "Take one tablet after food up to three times a day when needed, as written. Don't take it on an empty stomach.",
    sideEffects: [
      "Heartburn or stomach pain",
      "Dry mouth or blurred vision",
      "Drowsiness or dizziness",
    ],
    warnings: [
      "Don't take it for more than a few days without seeing a doctor",
      "Tell your doctor if you have a stomach ulcer, asthma or kidney problems",
      "Don't use it in the last three months of pregnancy",
    ],
    regimen: { pattern: "1-1-1", note: "after food, when needed" },
  },
  "Folic acid": {
    about:
      "Folic acid is a B vitamin the body needs to make new cells. Doctors prescribe 5mg when planning a pregnancy, in early pregnancy, or for some kinds of anaemia.",
    howToTake: "One tablet a day, with or without food.",
    sideEffects: ["Mild nausea or bloating", "A rash, rarely"],
    warnings: [
      "Tell your doctor if you have vitamin B12 deficiency; folic acid alone can hide it",
      "Tell your doctor about epilepsy medicines",
    ],
    regimen: { pattern: "1-0-0", note: "with or without food" },
  },
  "Vitamin E": {
    about:
      "Vitamin E is an antioxidant vitamin. Doctors sometimes prescribe it for dry skin and hair and for deficiency.",
    howToTake: "One capsule a day after food, or as written.",
    sideEffects: ["Nausea or loose motions at higher doses"],
    warnings: [
      "Tell your doctor if you take blood thinners",
      "Don't take more than the dose written; large doses over long periods can be harmful",
    ],
    regimen: { pattern: "1-0-0", note: "after food" },
  },
  Levonorgestrel: {
    about:
      "Levonorgestrel is an emergency contraceptive pill. Taken within 72 hours of unprotected sex it lowers the chance of pregnancy, and the sooner it is taken the better it works.",
    howToTake:
      "Swallow one tablet as soon as possible, within 72 hours. If you vomit within two hours, take another.",
    sideEffects: [
      "Nausea or tiredness",
      "Your next period coming early or late",
      "Breast tenderness or spotting",
    ],
    warnings: [
      "It doesn't work if you're already pregnant and doesn't protect against infections",
      "Take a pregnancy test if your period is more than a week late",
      "It isn't meant for regular use; ask about ongoing contraception",
    ],
  },
  Norethisterone: {
    about:
      "Norethisterone is a progestogen hormone. Doctors prescribe it to postpone a period, to control heavy or irregular bleeding, or for endometriosis.",
    howToTake:
      "Take it exactly as written; the timing matters. To delay a period it is usually started three days before the period is due and taken until you want it to start.",
    sideEffects: ["Bloating or breast tenderness", "Spotting", "Headache or mood changes"],
    warnings: [
      "Not for use in pregnancy; rule it out before starting",
      "Tell your doctor about a history of clots, liver disease or migraine with aura",
    ],
    regimen: { pattern: "1-0-1", note: "as written" },
  },
  "Tranexamic acid": {
    about:
      "Tranexamic acid reduces heavy menstrual bleeding by helping blood clot where it is needed. It is taken only on the heavy days of a period.",
    howToTake:
      "Take it during the period, up to three times a day for as many days as written, usually not more than four.",
    sideEffects: ["Nausea or loose motions", "Headache"],
    warnings: [
      "Tell your doctor about any history of blood clots or if you take the combined pill",
      "Stop and get help if you have sudden leg pain, chest pain or breathlessness",
    ],
    regimen: { pattern: "1-1-1", note: "on heavy days only" },
  },
  "Ferrous ascorbate + folic acid": {
    about:
      "An iron tablet with folic acid for iron-deficiency anaemia and in pregnancy. Ferrous ascorbate is a form of iron that is gentler on the stomach than some others.",
    howToTake:
      "One tablet a day after food, or as written. Keep it two hours away from tea, coffee, milk and antacids.",
    sideEffects: ["Dark stools, which are harmless", "Constipation or nausea"],
    warnings: [
      "Keep it away from children; iron overdose is dangerous for them",
      "Tell your doctor if you have thalassaemia or another iron-overload condition",
    ],
    regimen: { pattern: "1-0-0", note: "after food" },
  },
  Paracetamol: {
    about:
      "Paracetamol brings down fever and eases mild to moderate pain. It is gentle on the stomach and safe for most people at the right dose.",
    howToTake:
      "One tablet every four to six hours when needed, not more than four tablets in 24 hours. Leave at least four hours between doses.",
    sideEffects: ["Side effects are rare at the right dose", "A rash, rarely"],
    warnings: [
      "Too much paracetamol harms the liver; check other medicines for paracetamol before taking it",
      "Don't take more than 3g a day if you drink alcohol regularly or have liver problems",
      "See a doctor if fever lasts more than three days",
    ],
  },
  Cetirizine: {
    about:
      "Cetirizine is an antihistamine for sneezing, runny nose, itchy eyes and hives. It works within an hour and lasts a day.",
    howToTake: "One tablet once a day, usually in the evening, with or without food.",
    sideEffects: ["Drowsiness in some people", "Dry mouth or headache"],
    warnings: [
      "Take care driving until you know how it affects you",
      "Avoid alcohol; it adds to the drowsiness",
    ],
    regimen: { pattern: "0-0-1", note: "in the evening" },
  },
  Fexofenadine: {
    about:
      "Fexofenadine is a non-drowsy antihistamine for hay fever and allergic rhinitis. It relieves sneezing and itching without making most people sleepy.",
    howToTake:
      "One tablet once a day with water, before a meal. Avoid fruit juice within two hours; it reduces absorption.",
    sideEffects: ["Headache", "Drowsiness or nausea, uncommonly"],
    warnings: ["Keep antacids two hours away", "Tell your doctor about kidney problems"],
    regimen: { pattern: "1-0-0", note: "before food" },
  },
  Pantoprazole: {
    about:
      "Pantoprazole lowers the acid the stomach makes. It treats acidity, reflux and ulcers and lets the lining heal.",
    howToTake:
      "One tablet once a day, 30 to 60 minutes before breakfast. Swallow it whole; don't crush it.",
    sideEffects: [
      "Headache or loose motions",
      "Stomach pain or wind",
      "Low magnesium or B12 with long use",
    ],
    warnings: [
      "Don't take it for more than a few weeks without your doctor reviewing it",
      "Tell your doctor if you have black stools, vomiting or difficulty swallowing",
      "Long use raises the risk of fractures and gut infections",
    ],
    regimen: { pattern: "1-0-0", note: "before breakfast" },
  },
  "Aluminium hydroxide + magnesium hydroxide + simethicone": {
    about:
      "An antacid that neutralises stomach acid and breaks up gas. It works within minutes for heartburn, acidity and bloating after meals.",
    howToTake: "Chew one or two tablets after meals and at bedtime when needed, or as written.",
    sideEffects: ["Constipation or loose motions", "A chalky taste"],
    warnings: [
      "Keep other medicines two hours away; antacids block their absorption",
      "Tell your doctor if you have kidney problems",
      "See a doctor if you need it every day for more than two weeks",
    ],
  },
  "Oral rehydration salts": {
    about:
      "Oral rehydration salts replace the water and salts lost in loose motions and vomiting. This is the WHO formula, which is what doctors recommend for dehydration.",
    howToTake:
      "Dissolve one sachet in one litre of clean drinking water. Sip through the day and discard what's left after 24 hours.",
    sideEffects: ["None expected at the right dilution"],
    warnings: [
      "Use exactly one litre; a stronger solution is harmful, especially for children",
      "See a doctor if loose motions last more than two days, or sooner for a child or an older person",
      "Don't add sugar",
    ],
    storage: "Keep the sachet sealed, below 30°C.",
  },
  "B-complex + vitamin C + zinc": {
    about:
      "A supplement of B vitamins, vitamin C and zinc. Doctors prescribe it during recovery from illness, for mouth ulcers, or when the diet falls short.",
    howToTake: "One capsule a day after food.",
    sideEffects: [
      "Bright yellow urine, which is harmless",
      "Mild nausea if taken on an empty stomach",
    ],
    warnings: [
      "Don't take more than one a day",
      "Tell your doctor about other supplements so you don't double up",
    ],
    regimen: { pattern: "1-0-0", note: "after food" },
  },
  "Calcium carbonate + vitamin D3": {
    about: "Calcium with vitamin D3 for bones. The vitamin D helps the body absorb the calcium.",
    howToTake:
      "One tablet a day after food, or as written. Keep it two hours away from iron and thyroid tablets.",
    sideEffects: ["Constipation or bloating", "Wind"],
    warnings: [
      "Tell your doctor about kidney stones or high blood calcium",
      "Don't take it with other calcium supplements without checking the total",
    ],
    regimen: { pattern: "1-0-0", note: "after food" },
  },
  "Ascorbic acid": {
    about:
      "Vitamin C is needed for healing, healthy gums and iron absorption. A chewable tablet tops up a diet short of fruit and vegetables.",
    howToTake: "Chew one tablet a day after food.",
    sideEffects: ["Loose motions or stomach upset at high doses"],
    warnings: [
      "Tell your doctor if you have had kidney stones",
      "Don't take more than the dose written",
    ],
    regimen: { pattern: "1-0-0", note: "after food" },
  },
  "Povidone iodine": {
    about:
      "Povidone iodine is an antiseptic for minor cuts, scrapes and burns. It kills a wide range of germs on the skin and stains it brown for a while.",
    howToTake:
      "Clean the wound, apply a thin layer once or twice a day and cover with a dressing if needed.",
    sideEffects: ["Mild stinging", "Skin irritation or redness"],
    warnings: [
      "Don't use it on large or deep wounds without a doctor",
      "Tell your doctor if you have a thyroid problem or are pregnant; iodine is absorbed through the skin",
      "Don't use it if you're allergic to iodine",
    ],
    storage: topicalStorage,
  },
  "Diclofenac diethylamine + linseed oil + methyl salicylate + menthol": {
    about:
      "A pain-relief gel for sprains, strains, backache and joint pain. Diclofenac reduces inflammation where it is rubbed in; menthol and methyl salicylate give a warming feel.",
    howToTake:
      "Rub a small amount into the painful area three to four times a day. Wash your hands after, unless you're treating the hands.",
    sideEffects: ["Redness or itching where applied", "A rash, rarely"],
    warnings: [
      "Don't use it on broken skin or with a heat pad",
      "Don't use it if you're allergic to aspirin or other painkillers",
      "Avoid it in the last three months of pregnancy",
    ],
    storage: topicalStorage,
  },
  "Ibuprofen + paracetamol": {
    about:
      "Ibuprofen and paracetamol together, for pain and fever that one alone doesn't settle: toothache, period pain, sprains, headache. Ibuprofen also reduces swelling.",
    howToTake:
      "One tablet up to three times a day after food when needed. Don't take it on an empty stomach.",
    sideEffects: ["Heartburn or stomach pain", "Nausea", "Dizziness"],
    warnings: [
      "Don't take it with other painkillers containing paracetamol or ibuprofen",
      "Tell your doctor if you have a stomach ulcer, asthma, kidney or heart problems",
      "Not for more than three days without a doctor's advice",
    ],
  },
};
