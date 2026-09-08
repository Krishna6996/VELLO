# Catalog seed

## Concerns (slug, title, one-line, icon per spec)
- diabetes: Diabetes. Blood drop.
- blood-pressure: Blood pressure and heart. Icon: a simple pressure gauge arc, not a heart.
- thyroid: Thyroid. Butterfly.
- skin-hair: Skin and hair. Skin layers.
- sexual-health: Sexual health. Icon: two overlapping circles.
- mind-sleep: Mind and sleep. Crescent moon.
- periods: Periods and women's health. Icon: a 28-dot ring with one dot filled.
- everyday: Everyday health. Sunrise.

## SKU schema (lib/catalog/types.ts)
- id, slug, brand, molecule (string; combination molecules joined with " + "), strength, form (tablet | sr-tablet | capsule | syrup | drops | cream | gel | inhaler | vial | sachet | strip | device), packLabel ("strip of 10"), packUnits (number), mrp (number, paise-safe), schedule ("OTC" | "H" | "H1"), rxRequired (derived: schedule !== "OTC"), manufacturer, concerns (slug[]), substitutes (slug[] of same molecule + strength + form), description (2 to 3 plain sentences), howToTake, sideEffects (short list), warnings (short list), storage, inStock (boolean, seed true for all but 6 SKUs so out-of-stock states can be tested)

## Rules
- Schedule tags are data, shown as outlined squares beside the Rx mark, never alone. Schedule X and narcotics are never in the seed.
- Every molecule has at least two brands so substitution ladders render. Include one Jan Aushadhi generic for metformin, telmisartan, amlodipine, atorvastatin.
- Prices are printed MRPs. Keep them realistic for 2026.
- Fill to around 100 SKUs. Verify schedules with Achal before launch; the draft only needs them to be plausible.

## Seed examples (brand, molecule, strength, form, pack, MRP, schedule)
Diabetes: Glycomet 500 SR (metformin, sr-tablet, strip of 20, 36.50, H); Glycomet 850 (metformin, tablet, 20, 44.20, H); Glycomet GP 1 (glimepiride + metformin, 15, 98.00, H); Carbophage SR 500 (metformin, 20, 34.00, H); Gluformin 500 (metformin, 20, 32.80, H); Jan Aushadhi Metformin 500 SR (10, 9.20, H); Amaryl 1 (glimepiride, 30, 165.00, H); Accu-Chek Active strips (device, 50, 899.00, OTC); lancets (100, 240.00, OTC)
Blood pressure and heart: Telma 40 (telmisartan, 30, 112.00, H); Telma AM (telmisartan + amlodipine, 15, 190.00, H); Amlong 5 (amlodipine, 30, 68.00, H); Ecosprin 75 (aspirin, 14, 9.50, H); Atorva 10 (atorvastatin, 30, 145.00, H); Rosuvas 10 (rosuvastatin, 15, 245.00, H); Omron HEM-7120 (device, 1, 1850.00, OTC)
Thyroid: Thyronorm 25 / 50 / 75 / 100 mcg (levothyroxine, 120, 130 to 160, H); Eltroxin 50 (levothyroxine, 100, 152.00, H)
Skin and hair: Tugain 5% (minoxidil, solution 60ml, 890.00, OTC); Finax 1 (finasteride, 30, 230.00, H); Candid cream (clotrimazole, 20g, 95.00, OTC); Clindac A gel (clindamycin, 15g, 160.00, H); Benzac AC 2.5% (benzoyl peroxide, 20g, 210.00, OTC); Betnovate N (betamethasone + neomycin, 20g, 45.00, H)
Sexual health: Suhagra 50 (sildenafil, 4, 90.00, H); Tadalis 10 (tadalafil, 4, 180.00, H); Duralast 30 (dapoxetine, 4, 260.00, H)
Mind and sleep: Nexito 10 (escitalopram, 10, 95.00, H); Serta 50 (sertraline, 10, 110.00, H); Melatonin 3mg (10, 130.00, OTC)
Periods and women's health: Meftal Spas (mefenamic acid + dicyclomine, 10, 42.00, H); Folvite 5 (folic acid, 30, 36.00, OTC); Evion 400 (vitamin E, 10, 30.00, OTC); i-pill (levonorgestrel, 1, 110.00, OTC)
Everyday: Dolo 650 (paracetamol, 15, 31.00, OTC); Crocin Advance (paracetamol, 15, 34.00, OTC); Cetzine (cetirizine, 10, 20.00, OTC); Allegra 120 (fexofenadine, 10, 210.00, H); Pan 40 (pantoprazole, 15, 165.00, H); Digene (10, 15.00, OTC); ORS Electral (sachet, 1, 22.00, OTC); Becosules Z (capsule, 20, 45.00, OTC); Shelcal 500 (15, 115.00, OTC); Limcee 500 (15, 25.00, OTC); Betadine 10% (15ml, 105.00, OTC); Volini gel (30g, 130.00, OTC); Combiflam (20, 46.00, OTC)
