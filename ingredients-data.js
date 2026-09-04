// ============================================
// SCANSAFE INGREDIENT & ADDITIVE DATABASE
// ============================================

const INGREDIENT_DB = [
  // Common Snack & Marie Gold Ingredients
  {
    id: "refined-wheat-flour",
    name: "Refined Wheat Flour (Maida)",
    aka: ["refined wheat flour", "maida", "wheat flour"],
    eNumber: null,
    category: "Grain / Flour",
    verdict: "caution",
    summary: "Refined grain stripped of natural bran and fiber.",
    whatItIs: "Wheat flour that has had its bran and germ removed, leaving only the starchy endosperm.",
    history: "Gained popularity with industrial milling in the late 19th century due to longer shelf life.",
    commonlyFoundIn: ["Biscuits", "White bread", "Pastries", "Instant noodles"],
    normalEffects: "Provides quick carbohydrate energy.",
    excessEffects: "High glycemic index; rapid consumption can spike blood sugar levels.",
    regulatory: "Standard food ingredient permitted worldwide.",
    alternatives: "Whole wheat flour, oat flour, or millet flour."
  },
  {
    id: "sugar",
    name: "Sugar",
    aka: ["sugar", "sucrose", "refined sugar"],
    eNumber: null,
    category: "Sweetener",
    verdict: "caution",
    summary: "Refined sweetener added for taste and energy.",
    whatItIs: "Simple carbohydrate extracted from sugar cane or sugar beet.",
    history: "Used globally for centuries as the primary bulk sweetener in culinary history.",
    commonlyFoundIn: ["Biscuits", "Beverages", "Sweets", "Baked goods"],
    normalEffects: "Quick source of biological energy.",
    excessEffects: "Excess intake contributes to dental cavities, weight gain, and metabolic risks.",
    regulatory: "Standard food ingredient permitted globally.",
    alternatives: "Jaggery, dates, or natural fruit purees."
  },
  {
    id: "refined-palm-oil",
    name: "Refined Palm Oil",
    aka: ["refined palm oil", "palm oil", "palmolein"],
    eNumber: null,
    category: "Fat / Oil",
    verdict: "caution",
    summary: "Vegetable oil high in saturated fats used for frying and baked goods.",
    whatItIs: "Edible vegetable oil derived from the mesocarp of the fruit of oil palms.",
    history: "Widely adopted by the food industry since the late 20th century due to high yield and stability.",
    commonlyFoundIn: ["Biscuits", "Packaged snacks", "Margarine", "Fried foods"],
    normalEffects: "Provides dietary fats and energy.",
    excessEffects: "High in saturated fatty acids; heavy intake can affect cardiovascular health.",
    regulatory: "Approved for food use globally.",
    alternatives: "Cold-pressed sunflower oil, mustard oil, or coconut oil."
  },
  {
    id: "invert-sugar-syrup",
    name: "Invert Sugar Syrup",
    aka: ["invert sugar syrup", "invert sugar", "invert syrup"],
    eNumber: null,
    category: "Sweetener",
    verdict: "caution",
    summary: "Liquid sweetener mixture of glucose and fructose.",
    whatItIs: "Syrup created by splitting sucrose into glucose and fructose, retaining moisture in baked items.",
    history: "Developed for commercial baking to prevent crystallization and prolong soft textures.",
    commonlyFoundIn: ["Biscuits", "Confectionery", "Cakes"],
    normalEffects: "Acts as a sweetener and humectant.",
    excessEffects: "Spikes blood sugar quickly similarly to refined table sugar.",
    regulatory: "Standard food sweetener.",
    alternatives: "Honey or natural maple syrup."
  },
  {
    id: "milk-solids",
    name: "Milk Solids",
    aka: ["milk solids", "skimmed milk powder", "dairy solids"],
    eNumber: null,
    category: "Dairy Product",
    verdict: "safe",
    summary: "Dried protein and mineral components derived from milk.",
    whatItIs: "Non-water components of milk, including proteins, lactose, and minerals.",
    history: "Commercial spray-drying developed in the 19th century to preserve milk proteins.",
    commonlyFoundIn: ["Biscuits", "Chocolates", "Dairy drinks"],
    normalEffects: "Provides protein and calcium nutrients.",
    excessEffects: "May trigger reactions in individuals with severe lactose intolerance or milk allergies.",
    regulatory: "Safe food ingredient.",
    alternatives: "Plant-based milk proteins (soy, pea)."
  },

  // INS / E-Numbers (Marie Gold & Standard Additives)
  {
    id: "ins-503",
    name: "Ammonium Carbonates (INS 503)",
    aka: ["503", "ins 503", "e503", "ammonium carbonate", "raising agent 503"],
    eNumber: "INS 503",
    category: "Leavening Agent",
    verdict: "safe",
    summary: "Baking salt used to make biscuits light and crispy.",
    whatItIs: "An inorganic compound that breaks down into ammonia and carbon dioxide gas when baked.",
    history: "Traditional baker's salt used long before modern baking powder became common.",
    commonlyFoundIn: ["Biscuits", "Crackers", "Crispbreads"],
    normalEffects: "Completely decomposes during baking, leaving no harmful residue.",
    excessEffects: "None in finished baked goods.",
    regulatory: "Permitted under FSSAI, FDA, and EU standards.",
    alternatives: "Sodium bicarbonate (baking soda)."
  },
  {
    id: "ins-500",
    name: "Sodium Carbonates (INS 500)",
    aka: ["500", "ins 500", "e500", "sodium bicarbonate", "baking soda"],
    eNumber: "INS 500",
    category: "Acidity Regulator / Raising Agent",
    verdict: "safe",
    summary: "Standard baking soda used to control pH and help dough rise.",
    whatItIs: "Sodium salt of carbonic acid naturally found in mineral deposits.",
    history: "Used since ancient Egyptian times and produced commercially since the 19th century.",
    commonlyFoundIn: ["Baked goods", "Biscuits", "Carbonated water"],
    normalEffects: "Neutralizes dietary acids and releases carbon dioxide gas.",
    excessEffects: "None at dietary concentration levels.",
    regulatory: "Generally recognized as safe (GRAS).",
    alternatives: "Potassium bicarbonate."
  },
  {
    id: "ins-472e",
    name: "DATEM (INS 472e)",
    aka: ["472e", "ins 472e", "e472e", "emulsifier 472e", "datem"],
    eNumber: "INS 472e",
    category: "Emulsifier",
    verdict: "safe",
    summary: "Dough conditioner that helps strengthen dough gluten networks.",
    whatItIs: "Diacetyl tartaric acid esters of mono- and diglycerides made from edible oils.",
    history: "Developed in the 20th century to enhance industrial dough volume and texture.",
    commonlyFoundIn: ["Bread", "Biscuits", "Commercial baking"],
    normalEffects: "Metabolized in the body like standard dietary fats and organic acids.",
    excessEffects: "No notable side effects at approved dietary levels.",
    regulatory: "Approved by FSSAI, FDA, and EFSA.",
    alternatives: "Lecithin or mustard powder."
  },
  {
    id: "ins-223",
    name: "Sodium Metabisulfite (INS 223)",
    aka: ["223", "ins 223", "e223", "dough conditioner 223"],
    eNumber: "INS 223",
    category: "Preservative / Dough Conditioner",
    verdict: "caution",
    summary: "Sulphite compound used to bleach dough and extend product shelf life.",
    whatItIs: "An inorganic salt that releases sulphur dioxide under reactive conditions.",
    history: "Used widely since mid-20th-century food processing for browning prevention.",
    commonlyFoundIn: ["Biscuits", "Dried fruits", "Wine"],
    normalEffects: "Prevents unwanted enzymatic browning in dough.",
    excessEffects: "May trigger asthmatic reactions or sensitivities in sensitive individuals.",
    regulatory: "Approved with strict maximum concentration limits.",
    alternatives: "Ascorbic acid (Vitamin C)."
  },
  {
    id: "ins-150d",
    name: "Caramel IV - Sulphite Ammonia (INS 150d)",
    aka: ["150d", "ins 150d", "e150d", "150d color"],
    eNumber: "INS 150d",
    category: "Coloring Agent",
    verdict: "caution",
    summary: "Dark brown food dye created by treating carbohydrates with sulphite and ammonium compounds.",
    whatItIs: "Class IV food color produced via controlled heat treatment of carbohydrates.",
    history: "Industrial food coloring heavily adopted by soft drink and bakery markets.",
    commonlyFoundIn: ["Cola drinks", "Biscuits", "Dark sauces"],
    normalEffects: "Imparts uniform dark brown coloration.",
    excessEffects: "Contains trace manufacturing by-products (4-MEI); safe within regulation bounds.",
    regulatory: "Permitted under regulated acceptable intake limits.",
    alternatives: "Malt extracts or natural molasses."
  },

  // Standard Preservatives, Additives & Sweeteners
  {
    id: "msg",
    name: "Monosodium Glutamate (MSG)",
    aka: ["msg", "monosodium glutamate", "e621", "621"],
    eNumber: "E621",
    category: "Flavor Enhancer",
    verdict: "caution",
    summary: "Savory umami flavor enhancer.",
    whatItIs: "Sodium salt of glutamic acid produced via bacterial starch fermentation.",
    history: "Discovered in 1908 by Japanese chemist Kikunae Ikeda.",
    commonlyFoundIn: ["Instant noodles", "Chips", "Soups", "Seasoning"],
    normalEffects: "Intensifies savory food flavors.",
    excessEffects: "Sensitivity symptoms reported in rare high-dose contexts.",
    regulatory: "Approved as safe (GRAS) by global regulators.",
    alternatives: "Mushrooms, seaweed, or soy sauce."
  },
  {
    id: "sodium-benzoate",
    name: "Sodium Benzoate",
    aka: ["sodium benzoate", "e211", "211"],
    eNumber: "E211",
    category: "Preservative",
    verdict: "caution",
    summary: "Preservative preventing mold and bacterial growth.",
    whatItIs: "Sodium salt of benzoic acid used in acidic foods.",
    history: "Widespread usage started in the early 20th century.",
    commonlyFoundIn: ["Soft drinks", "Juices", "Pickles"],
    normalEffects: "Extends shelf life safely at controlled doses.",
    excessEffects: "May form benzene traces if exposed to heat/light alongside Vitamin C.",
    regulatory: "Strictly limited under FSSAI and FDA regulations.",
    alternatives: "Citric acid or pasteurization."
  },
  {
    id: "aspartame",
    name: "Aspartame",
    aka: ["aspartame", "e951", "951"],
    eNumber: "E951",
    category: "Artificial Sweetener",
    verdict: "caution",
    summary: "Low-calorie artificial sweetener 200x sweeter than sugar.",
    whatItIs: "Dipeptide sweetener composed of aspartic acid and phenylalanine.",
    history: "Discovered in 1965 and approved in the 1980s.",
    commonlyFoundIn: ["Diet drinks", "Sugar-free gum", "Desserts"],
    normalEffects: "Provides sweet taste without carbohydrate calories.",
    excessEffects: "Must be completely avoided by individuals with PKU (phenylketonuria).",
    regulatory: "Approved with clear warning requirements for PKU.",
    alternatives: "Stevia or monk fruit."
  }
];

// Helper: search library
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
