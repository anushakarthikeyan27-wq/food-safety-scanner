// ============================================
// INGREDIENT AWARENESS DATABASE
// Educational reference only — not medical advice.
// Compiled from widely documented, publicly available
// food science and regulatory information.
// ============================================

const INGREDIENT_DB = [
  {
    id: "msg",
    name: "Monosodium Glutamate (MSG)",
    aka: ["msg", "monosodium glutamate", "e621", "621"],
    eNumber: "E621",
    category: "Flavor Enhancer",
    verdict: "caution",
    summary: "A flavor enhancer that intensifies savory (umami) taste, found naturally in tomatoes and cheese as well as added synthetically.",
    whatItIs: "MSG is the sodium salt of glutamic acid, a naturally occurring amino acid. It's produced industrially through bacterial fermentation of starches.",
    history: "Discovered in 1908 by Japanese chemist Kikunae Ikeda while studying kombu seaweed broth. It became commercially available shortly after and has been used globally in cooking and processed food since.",
    commonlyFoundIn: ["Instant noodles", "Chips and savory snacks", "Canned soups", "Chinese and processed restaurant food", "Seasoning blends"],
    normalEffects: "Considered safe by major food safety bodies (FSSAI, FDA, EFSA) at typical dietary levels. The amount of glutamate from MSG is small compared to what's naturally present in many whole foods.",
    excessEffects: "Some people report sensitivity symptoms (headache, flushing, sweating) after consuming large amounts, sometimes called 'MSG symptom complex' — though controlled studies haven't consistently proven a causal link at normal doses.",
    regulatory: "Approved as safe (GRAS) by the FDA; permitted under FSSAI and EU regulations with no set upper limit, though labeling is required.",
    alternatives: "Naturally umami-rich ingredients like mushrooms, seaweed, aged cheese, or fermented soy products."
  },
  {
    id: "sodium-benzoate",
    name: "Sodium Benzoate",
    aka: ["sodium benzoate", "e211", "211"],
    eNumber: "E211",
    category: "Preservative",
    verdict: "caution",
    summary: "A widely used preservative that prevents mold, yeast, and bacterial growth in acidic foods and drinks.",
    whatItIs: "The sodium salt of benzoic acid, a compound found naturally in trace amounts in berries, apples, and cinnamon. Commercially it's synthesized for use as a preservative.",
    history: "Benzoic acid was first isolated from gum benzoin resin in the 16th century. Sodium benzoate began wide commercial use as a food preservative in the early 20th century due to its effectiveness and low cost.",
    commonlyFoundIn: ["Carbonated soft drinks", "Fruit juices", "Pickles", "Salad dressings", "Jams"],
    normalEffects: "Generally recognized as safe at regulated levels for the general population.",
    excessEffects: "When combined with ascorbic acid (Vitamin C) in some beverages, it can form small amounts of benzene, a known carcinogen, under certain storage conditions (heat, light). Regulatory bodies monitor and limit this. Some studies also link artificial preservatives to hyperactivity in sensitive children when combined with certain food dyes.",
    regulatory: "Approved by FSSAI and FDA within specified concentration limits (typically under 0.1% of product weight).",
    alternatives: "Natural preservation methods like refrigeration, vinegar, or rosemary extract."
  },
  {
    id: "trans-fat",
    name: "Trans Fat (Partially Hydrogenated Oil)",
    aka: ["trans fat", "partially hydrogenated", "hydrogenated vegetable oil", "vanaspati"],
    eNumber: null,
    category: "Fat / Oil",
    verdict: "harmful",
    summary: "An artificially created fat that extends shelf life and improves texture, but is strongly linked to cardiovascular disease even in small amounts.",
    whatItIs: "Created by adding hydrogen to liquid vegetable oil to make it more solid at room temperature — a process called partial hydrogenation.",
    history: "Developed in the early 1900s and became widely used commercially through products like margarine and vanaspati ghee, prized for being cheaper and more shelf-stable than butter or natural oils.",
    commonlyFoundIn: ["Bakery items (cakes, biscuits, pastries)", "Fried snacks", "Margarine and vanaspati", "Packaged frozen foods"],
    normalEffects: "There is no known safe level of intake — even small amounts consumed regularly raise LDL ('bad') cholesterol and lower HDL ('good') cholesterol.",
    excessEffects: "Directly linked to increased risk of heart disease, stroke, and type 2 diabetes with regular consumption. This is one of the most well-established harms in nutrition science.",
    regulatory: "FSSAI has capped industrial trans fat at 2% of total fat in food products (as of 2022), moving toward stricter limits, mirroring WHO's global elimination push. Many countries have banned it outright.",
    alternatives: "Naturally occurring fats like ghee, cold-pressed oils, or unhydrogenated vegetable oils."
  },
  {
    id: "aspartame",
    name: "Aspartame",
    aka: ["aspartame", "e951", "951"],
    eNumber: "E951",
    category: "Artificial Sweetener",
    verdict: "caution",
    summary: "A widely used artificial sweetener roughly 200 times sweeter than sugar, common in 'diet' and sugar-free products.",
    whatItIs: "A low-calorie sweetener made by combining two amino acids, aspartic acid and phenylalanine.",
    history: "Discovered accidentally in 1965 by a chemist researching anti-ulcer drugs. It was approved for use in the U.S. in 1981 after extensive review and became popular through diet sodas in the 1980s.",
    commonlyFoundIn: ["Diet soft drinks", "Sugar-free chewing gum", "Low-calorie desserts", "Tabletop sweetener packets"],
    normalEffects: "Considered safe for most people at typical intake levels by FSSAI, FDA, and EFSA.",
    excessEffects: "In 2023, the WHO's cancer research arm (IARC) classified aspartame as 'possibly carcinogenic to humans' based on limited evidence, while food safety bodies maintained existing intake limits remain safe. It must be avoided entirely by people with the rare genetic condition phenylketonuria (PKU).",
    regulatory: "Approved with an acceptable daily intake limit set by FSSAI and international bodies; mandatory warning label required for PKU.",
    alternatives: "Stevia, natural sugar in moderation, or monk fruit extract."
  },
  {
    id: "red-40",
    name: "Allura Red AC (Red 40)",
    aka: ["red 40", "allura red", "e129", "129"],
    eNumber: "E129",
    category: "Artificial Color",
    verdict: "caution",
    summary: "A synthetic red dye used to make food and drinks visually vibrant, especially candies and beverages.",
    whatJournal: null,
    whatItIs: "A petroleum-derived synthetic azo dye that produces a bright red-orange color.",
    history: "Developed in the 1970s as a replacement for Red Dye No. 2, which was banned in the US in 1976 over safety concerns. It has since become one of the most widely used food colorants globally.",
    commonlyFoundIn: ["Candy", "Flavored drinks and sports drinks", "Breakfast cereals", "Flavored snacks"],
    normalEffects: "Approved as safe in regulated amounts by most food authorities.",
    excessEffects: "Several studies have linked artificial dyes, including Red 40, to increased hyperactivity in some children, prompting mandatory warning labels in the EU. California passed a law in 2024 restricting it in school foods.",
    regulatory: "Permitted under FSSAI and FDA; requires a hyperactivity warning label on packaging sold in the EU.",
    alternatives: "Natural colorants like beet extract, anthocyanins from berries, or paprika extract."
  },
  {
    id: "hfcs",
    name: "High Fructose Corn Syrup (HFCS)",
    aka: ["high fructose corn syrup", "hfcs", "glucose-fructose syrup", "corn syrup"],
    eNumber: null,
    category: "Sweetener",
    verdict: "caution",
    summary: "A liquid sweetener made from corn starch, cheaper than sugar and widely used to sweeten processed foods and drinks.",
    whatItIs: "Corn starch is processed into glucose syrup, then some glucose is converted to fructose using enzymes, creating a very sweet, shelf-stable liquid.",
    history: "Developed in the late 1950s-60s and became widespread in the US food supply through the 1970s-80s as a cheaper substitute for cane sugar, driven partly by US corn subsidies and sugar import tariffs.",
    commonlyFoundIn: ["Soft drinks", "Packaged baked goods", "Sauces and condiments (ketchup, salad dressing)", "Sweetened cereals"],
    normalEffects: "Nutritionally similar to table sugar in small amounts; the concern is more about total added sugar intake than HFCS specifically being uniquely dangerous.",
    excessEffects: "Regular high consumption is linked to obesity, fatty liver disease, and increased triglycerides, mainly because it's cheap and easy to over-consume in sweetened beverages.",
    regulatory: "Permitted without special restriction, but many countries now require added sugar content (including HFCS) to be listed on nutrition labels.",
    alternatives: "Whole fruit, jaggery, or moderate use of cane sugar."
  },
  {
    id: "sodium-nitrite",
    name: "Sodium Nitrite",
    aka: ["sodium nitrite", "e250", "250"],
    eNumber: "E250",
    category: "Preservative",
    verdict: "harmful",
    summary: "A curing agent used in processed meats to prevent bacterial growth and preserve pink color, but a known source of carcinogenic compounds when heated.",
    whatItIs: "A salt used primarily to cure meats, inhibiting the growth of Clostridium botulinum (the bacteria causing botulism) and giving cured meat its characteristic pink color.",
    history: "Meat curing with nitrate-rich salts dates back centuries, but sodium nitrite specifically became standardized in industrial meat processing in the early-to-mid 20th century for its reliability and safety against botulism.",
    commonlyFoundIn: ["Bacon", "Sausages and hot dogs", "Cured deli meats", "Salami"],
    normalEffects: "Effective and important for preventing dangerous bacterial contamination in cured meats when used correctly.",
    excessEffects: "When exposed to high heat (like frying bacon), sodium nitrite can form nitrosamines, compounds classified as probable carcinogens. The WHO classified processed meat as a Group 1 carcinogen in 2015 partly due to this mechanism.",
    regulatory: "Permitted under FSSAI and FDA within strict concentration limits due to its dual role as both a safety necessity and a health risk.",
    alternatives: "Uncured meats (which use natural nitrates from celery powder, though the chemistry is similar), or reducing processed meat consumption overall."
  },
  {
    id: "carrageenan",
    name: "Carrageenan",
    aka: ["carrageenan", "e407", "407"],
    eNumber: "E407",
    category: "Thickener / Stabilizer",
    verdict: "caution",
    summary: "A plant-derived thickener extracted from red seaweed, used to give creamy texture to dairy and plant-based products.",
    whatItIs: "A natural polysaccharide extracted from red edible seaweeds (Chondrus crispus and related species), used as a thickening and stabilizing agent.",
    history: "Named after Carragheen, a coastal area in Ireland where the seaweed was traditionally harvested and used in cooking for centuries before being industrially extracted starting in the mid-20th century.",
    commonlyFoundIn: ["Plant-based milk (almond, soy, coconut)", "Ice cream", "Deli meats", "Infant formula (historically, now largely phased out)"],
    normalEffects: "Considered safe by regulatory bodies at food-grade purity levels.",
    excessEffects: "Some animal studies have raised concerns about gut inflammation, particularly with 'degraded carrageenan,' a different compound not permitted in food. Human evidence on food-grade carrageenan remains inconclusive and debated among researchers.",
    regulatory: "Approved by FSSAI and FDA; ongoing scientific debate has led some manufacturers to voluntarily remove it despite regulatory approval.",
    alternatives: "Guar gum, xanthan gum, or agar-agar."
  },
  {
    id: "citric-acid",
    name: "Citric Acid",
    aka: ["citric acid", "e330", "330"],
    eNumber: "E330",
    category: "Acidity Regulator / Preservative",
    verdict: "safe",
    summary: "A natural acid found in citrus fruits, widely used to add tartness and help preserve packaged foods.",
    whatItIs: "An organic acid naturally present in lemons, limes, and oranges. Most commercial citric acid today is produced via fermentation of sugar using the mold Aspergillus niger, rather than extracted from fruit.",
    history: "First isolated from lemon juice in 1784 by chemist Carl Wilhelm Scheele. Industrial fermentation production began in the 1920s, making it cheap and abundant for food use.",
    commonlyFoundIn: ["Soft drinks", "Candy", "Canned fruits and vegetables", "Jams"],
    normalEffects: "Widely regarded as safe; the body metabolizes it the same way as citric acid from fruit.",
    excessEffects: "Very high, concentrated exposure can contribute to tooth enamel erosion over time, mainly from acidic drinks rather than the compound itself being toxic.",
    regulatory: "Generally recognized as safe (GRAS) with no meaningful upper limit in food use.",
    alternatives: "Lemon or lime juice for natural tartness."
  },
  {
    id: "sodium-chloride",
    name: "Sodium Chloride (Salt)",
    aka: ["salt", "sodium chloride", "table salt"],
    eNumber: null,
    category: "Seasoning / Preservative",
    verdict: "caution",
    summary: "Common table salt, essential for the body in small amounts but a major contributor to health issues when consumed in excess through processed foods.",
    whatItIs: "A naturally occurring mineral compound essential for nerve and muscle function, fluid balance, and flavor.",
    history: "One of the oldest food additives in human history, used for both seasoning and preservation for thousands of years — historically valuable enough to be used as currency in some cultures (the origin of the word 'salary').",
    commonlyFoundIn: ["Packaged snacks", "Instant noodles and soups", "Bread and baked goods", "Processed and canned foods"],
    normalEffects: "Necessary in small daily amounts (WHO recommends under 5g/day) for normal bodily function.",
    excessEffects: "Most people consume far more than recommended, mainly through processed foods rather than table salt added at home. Excess intake is strongly linked to high blood pressure, heart disease, and stroke risk.",
    regulatory: "No upper limit set on sale, but health bodies including FSSAI actively campaign for reduced sodium in packaged foods.",
    alternatives: "Herbs, spices, and reduced-sodium seasoning blends."
  },
  {
    id: "sucralose",
    name: "Sucralose",
    aka: ["sucralose", "e955", "955", "splenda"],
    eNumber: "E955",
    category: "Artificial Sweetener",
    verdict: "caution",
    summary: "A calorie-free artificial sweetener made from sugar, roughly 600 times sweeter, commonly sold as Splenda.",
    whatItIs: "Made by chemically modifying sugar (sucrose) to replace certain hydroxyl groups with chlorine atoms, making it pass through the body largely unmetabolized.",
    history: "Discovered accidentally in 1976 during research into new pesticides at a UK university, when a researcher misheard an instruction to 'test' a compound as 'taste' it. It was approved for food use in the US in 1998.",
    commonlyFoundIn: ["Diet drinks", "Sugar-free baked goods", "Protein bars and shakes", "Tabletop sweetener packets"],
    normalEffects: "Considered safe at typical intake by major regulatory bodies, as most passes through the body unabsorbed.",
    excessEffects: "Some emerging research suggests high, regular intake may alter gut bacteria composition, though findings remain mixed and are still being studied.",
    regulatory: "Approved by FSSAI, FDA, and EFSA with an established acceptable daily intake.",
    alternatives: "Stevia or moderate use of natural sugar."
  },
  {
    id: "guar-gum",
    name: "Guar Gum",
    aka: ["guar gum", "e412", "412"],
    eNumber: "E412",
    category: "Thickener / Stabilizer",
    verdict: "safe",
    summary: "A natural thickening agent derived from guar beans, commonly grown in India, used to improve texture in food products.",
    whatItIs: "A fiber extracted from the seeds of the guar plant (Cyamopsis tetragonoloba), ground into a powder that thickens when mixed with water.",
    history: "Guar has been cultivated in India and Pakistan for centuries as a food crop and cattle feed; its use as a commercial food thickener grew significantly from the mid-20th century onward as demand for stabilizers in processed foods increased.",
    commonlyFoundIn: ["Ice cream", "Sauces and dressings", "Gluten-free baked goods", "Dairy products"],
    normalEffects: "Considered safe and even beneficial in small amounts, acting as a soluble dietary fiber.",
    excessEffects: "Very high concentrated doses (well above typical food use) have historically caused digestive blockages in medical/weight-loss product contexts, which is unrelated to the small amounts used in typical packaged food.",
    regulatory: "Approved by FSSAI and FDA as generally safe within standard food-use concentrations.",
    alternatives: "Xanthan gum or cornstarch as thickeners."
  },
  {
    id: "titanium-dioxide",
    name: "Titanium Dioxide",
    aka: ["titanium dioxide", "e171", "171"],
    eNumber: "E171",
    category: "Color / Whitening Agent",
    verdict: "caution",
    summary: "A white pigment used to brighten and whiten food products, banned in the EU since 2022 over safety concerns.",
    whatItIs: "A naturally occurring mineral compound processed into a fine white powder, used for its opacity and whitening properties.",
    history: "Industrially produced since the early 1900s, primarily for paints and plastics, and later adopted by the food industry for its bright white, opaque finish.",
    commonlyFoundIn: ["Candy and chewing gum", "Icing and cake decorations", "Sauces", "Coffee creamers"],
    normalEffects: "Long considered inert and safe for consumption by most regulatory bodies.",
    excessEffects: "In 2021, EFSA (Europe's food safety authority) concluded it could no longer be considered safe as a food additive, citing concerns about nanoparticle accumulation in the body and potential genotoxicity, leading to an EU-wide ban in 2022.",
    regulatory: "Banned in EU food products since 2022; still permitted in the US and India as of current regulations, highlighting regional differences in food safety standards.",
    alternatives: "Natural whitening from ingredients like rice starch or simply omitting the whitening agent."
  },
  {
    id: "ascorbic-acid",
    name: "Ascorbic Acid (Vitamin C)",
    aka: ["ascorbic acid", "vitamin c", "e300", "300"],
    eNumber: "E300",
    category: "Antioxidant / Preservative",
    verdict: "safe",
    summary: "The chemical name for Vitamin C, used both as a nutrient and as a natural antioxidant preservative to prevent browning and spoilage.",
    whatItIs: "An essential vitamin the human body cannot produce on its own; added to food both for nutritional fortification and its antioxidant preservative properties.",
    history: "Identified in the 1930s by researchers studying scurvy, a disease caused by Vitamin C deficiency common among sailors on long voyages. It was one of the first vitamins to be industrially synthesized for widespread use.",
    commonlyFoundIn: ["Fruit juices", "Cured meats (as a preservative)", "Fortified cereals", "Sliced fruit (to prevent browning)"],
    normalEffects: "Essential and beneficial nutrient; supports immune function and acts as an antioxidant.",
    excessEffects: "Very high supplemental doses can cause digestive upset, but this is essentially never a concern from food-additive-level amounts.",
    regulatory: "Generally recognized as safe with no meaningful upper limit for food use.",
    alternatives: "Not needed — it's one of the more universally beneficial additives on this list."
  },
  {
    id: "maltodextrin",
    name: "Maltodextrin",
    aka: ["maltodextrin"],
    eNumber: null,
    category: "Filler / Thickener",
    verdict: "caution",
    summary: "A flavorless carbohydrate filler made from starch, used to add bulk and texture to processed foods.",
    whatItIs: "Produced by breaking down starch (typically corn, rice, or potato) into shorter chains through partial hydrolysis, creating a fine white powder.",
    history: "Became widely used in food manufacturing from the 1960s onward as processed and convenience food production scaled up, valued for being cheap, flavorless, and versatile as a bulking agent.",
    commonlyFoundIn: ["Protein powders and sports supplements", "Instant soups and sauces", "Snack foods", "Baby formula"],
    normalEffects: "Digested quickly like other refined carbohydrates; not toxic, but nutritionally low-value.",
    excessEffects: "Has a very high glycemic index, meaning it spikes blood sugar faster than table sugar in some cases — a meaningful concern for people managing diabetes or blood sugar levels.",
    regulatory: "Generally recognized as safe with no specific intake limit, though diabetics are often advised to monitor products containing it.",
    alternatives: "Whole food thickeners like arrowroot or tapioca starch."
  },
  {
    id: "potassium-sorbate",
    name: "Potassium Sorbate",
    aka: ["potassium sorbate", "e202", "202"],
    eNumber: "E202",
    category: "Preservative",
    verdict: "safe",
    summary: "A widely used mold and yeast inhibitor considered one of the milder, better-tolerated synthetic preservatives.",
    whatItIs: "The potassium salt of sorbic acid, a compound originally derived from the berries of the mountain ash tree.",
    history: "Sorbic acid was first isolated from unripe rowan berries in 1859. Potassium sorbate was developed later as a more soluble, food-friendly form and became commercially popular from the 1950s onward.",
    commonlyFoundIn: ["Cheese", "Baked goods", "Wine", "Dried fruits"],
    normalEffects: "Widely regarded as one of the safer synthetic preservatives, with the body metabolizing it similarly to other fatty acids.",
    excessEffects: "Rarely causes issues even at higher intakes; mild skin or eye irritation has been reported only in direct concentrated contact during manufacturing, not from eating treated food.",
    regulatory: "Approved by FSSAI, FDA, and EFSA with generous permitted limits due to its strong safety profile.",
    alternatives: "Refrigeration or natural preservation methods where feasible."
  }
];

// Helper: search the database by name, alias, or E-number
function searchIngredients(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INGREDIENT_DB.filter((item) => {
    return (
      item.name.toLowerCase().includes(q) ||
      item.aka.some((a) => a.toLowerCase().includes(q)) ||
      (item.eNumber && item.eNumber.toLowerCase().includes(q))
    );
  });
}

// Helper: match a raw ingredient string (from a product label) to our database
function matchIngredientText(text) {
  const t = text.trim().toLowerCase();
  return INGREDIENT_DB.find((item) => {
    return (
      t.includes(item.name.toLowerCase()) ||
      item.aka.some((a) => t.includes(a.toLowerCase()))
    );
  }) || null;
}
// ADD THESE TO YOUR EXISTING ingredientsData OBJECT/ARRAY:

"refined wheat flour": { name: "Refined Wheat Flour (Maida)", safety: "Caution", details: "High glycemic index; stripped of natural fiber." },
"maida": { name: "Refined Wheat Flour (Maida)", safety: "Caution", details: "High glycemic index; stripped of natural fiber." },
"sugar": { name: "Sugar", safety: "Caution", details: "Added sweetener; high intake contributes to energy spikes." },
"refined palm oil": { name: "Refined Palm Oil", safety: "Moderate Risk", details: "High in saturated fats." },
"invert sugar syrup": { name: "Invert Sugar Syrup", safety: "Caution", details: "Added sweetener; rapidly elevates blood glucose levels." },
"milk solids": { name: "Milk Solids", safety: "Safe", details: "Dairy nutrient source; contains lactose allergen." },

// INS Numbers found on Marie Gold packs:
"503": { name: "Ammonium Carbonates (INS 503)", safety: "Safe", details: "Leavening agent / baking soda." },
"500": { name: "Sodium Carbonates (INS 500)", safety: "Safe", details: "Baking soda / acidity regulator." },
"472e": { name: "DATEM (INS 472e)", safety: "Safe", details: "Emulsifier used to improve biscuit texture." },
"223": { name: "Sodium Metabisulfite (INS 223)", safety: "Caution", details: "Preservative; contains sulphites which may trigger asthma." },
"150d": { name: "Sulphite Ammonia Caramel (INS 150d)", safety: "Moderate Risk", details: "Caramel coloring agent." }
