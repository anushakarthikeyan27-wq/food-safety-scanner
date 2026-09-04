/**
 * ScanSafe Engine v2.0 - Core Logic
 * Includes advanced tokenization, E-number parsing, hazard scoring, dynamic UI rendering, and personalized safety overrides.
 */

// ==========================================
// 1. INGREDIENT DATABASE
// ==========================================
const INGREDIENT_DB = [
  {
    id: "ing-1400",
    name: "Maltodextrin",
    aka: ["ins 1400", "1400", "e1400", "dextrin"],
    verdict: "caution",
    category: "High-Glycemic Filler",
    summary: "Fast-digesting carbohydrate that rapidly spikes blood sugar levels.",
    whatItIs: "A heavily processed starch powder used as a thickener, filler, or preservative.",
    allergens: [],
    dietaryFlags: ["High Glycemic Index", "Ultra-Processed"],
    normalEffects: "Provides rapid energy; can cause sudden blood glucose spikes higher than table sugar.",
    excessEffects: "May negatively impact gut microbiota balance and exacerbate insulin resistance.",
    regulatory: "US FDA GRAS (Generally Recognized as Safe)."
  },
  {
    id: "ing-322",
    name: "Soy Lecithin",
    aka: ["ins 322", "322", "e322", "lecithin", "soy lecithin (ins 322)"],
    verdict: "safe",
    category: "Emulsifier",
    summary: "Common emulsifier derived from soybeans; helps blend fats and water.",
    whatItIs: "A fatty substance extracted from soybeans used to improve texture and shelf stability.",
    allergens: ["Soy"],
    dietaryFlags: [],
    normalEffects: "Completely safe for the general population; excellent source of choline.",
    excessEffects: "May trigger reactions in individuals with severe soy allergies.",
    regulatory: "Approved globally for general food use."
  },
  {
    id: "ing-223",
    name: "Sodium Metabisulfite",
    aka: ["ins 223", "223", "e223", "disodium disulfite", "pyrosulfite"],
    verdict: "danger",
    category: "Preservative / Antioxidant",
    summary: "Sulfite preservative used to prevent browning and extend shelf life.",
    whatItIs: "An inorganic compound used as a bleach and disinfectant in wine, dried fruit, and bakery items.",
    allergens: ["Sulfites"],
    dietaryFlags: ["Sensitivity Concern"],
    normalEffects: "Can cause severe asthmatic or allergic reactions in sensitive individuals.",
    excessEffects: "May cause gastrointestinal irritation, headaches, and respiratory distress.",
    regulatory: "Strictly regulated; requires clear allergen labeling."
  },
  {
    id: "ing-503ii",
    name: "Ammonium Bicarbonate",
    aka: ["ins 503ii", "ins 503", "503ii", "503", "e503", "hartshorn"],
    verdict: "safe",
    category: "Leavening Agent",
    summary: "Traditional baker's ammonia used as a raising agent in crisp baked goods.",
    whatItIs: "A chemical compound that releases carbon dioxide gas when heated to make dough rise.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "Completely decomposes into gases during baking, leaving no harmful residues.",
    excessEffects: "No notable health risks when consumed in baked food products.",
    regulatory: "Approved globally for food manufacturing."
  },
  {
    id: "ing-500ii",
    name: "Sodium Bicarbonate",
    aka: ["ins 500ii", "ins 500", "500ii", "500", "e500", "baking soda"],
    verdict: "safe",
    category: "Leavening Agent",
    summary: "Standard baking soda used for leavening and alkalinity control.",
    whatItIs: "A soluble alkaline salt used to release carbon dioxide in batters and doughs.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "Safe for general consumption; aids in reducing gastric acidity.",
    excessEffects: "Excessive consumption can contribute to high dietary sodium intake.",
    regulatory: "GRAS approved globally."
  },
  {
    id: "ing-471",
    name: "Mono- and Diglycerides of Fatty Acids",
    aka: ["ins 471", "471", "e471", "monoglycerides", "diglycerides"],
    verdict: "caution",
    category: "Emulsifier",
    summary: "Synthetic fat additive used to blend oil and water and extend softness.",
    whatItIs: "Fats produced from glycerol and fatty acids; may contain small amounts of trans fats.",
    allergens: [],
    dietaryFlags: ["Ultra-Processed"],
    normalEffects: "Digested in the body similarly to natural fats.",
    excessEffects: "May contribute small amounts of hidden trans fats to the diet over time.",
    regulatory: "Approved for food use globally."
  },
  {
    id: "ing-481i",
    name: "Sodium Stearoyl Lactylate",
    aka: ["ins 481i", "ins 481", "481i", "481", "e481", "ssl"],
    verdict: "safe",
    category: "Dough Conditioner / Emulsifier",
    summary: "Used in baked goods to strengthen dough and improve crumb structure.",
    whatItIs: "A food additive produced from stearic acid and lactic acid.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "Safe for human consumption; metabolized easily into lactic and stearic acids.",
    excessEffects: "No toxicological hazards identified at normal dietary levels.",
    regulatory: "GRAS approved."
  },
  {
    id: "ing-321",
    name: "BHT (Butylated Hydroxytoluene)",
    aka: ["ins 321", "321", "e321", "butylated hydroxytoluene"],
    verdict: "danger",
    category: "Synthetic Antioxidant / Preservative",
    summary: "Synthetic chemical used to prevent oil rancidity in packaged foods.",
    whatItIs: "A lab-made antioxidant preservative commonly used in oils, cereals, and snack foods.",
    allergens: [],
    dietaryFlags: ["Endocrine Disruptor Risk", "Synthetic Preservative"],
    normalEffects: "Banned or restricted in food applications in several international jurisdictions.",
    excessEffects: "Linked in animal studies to liver stress, thyroid alterations, and metabolic toxicity.",
    regulatory: "Restricted in Europe and Japan; permitted with limitations in US/FDA guidelines."
  },
  {
    id: "ing-202",
    name: "Potassium Sorbate",
    aka: ["ins 202", "202", "e202", "sorbate"],
    verdict: "safe",
    category: "Preservative",
    summary: "Widely used antimicrobial agent that prevents mold and yeast growth.",
    whatItIs: "A potassium salt of sorbic acid that breaks down into water and CO2 in the body.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "Non-toxic; efficiently metabolized like natural fatty acids.",
    excessEffects: "Rare instances of localized allergic skin hypersensitivity.",
    regulatory: "Globally approved preservative."
  },
  {
    id: "ing-102",
    name: "Tartrazine",
    aka: ["ins 102", "102", "e102", "yellow 5", "fd&c yellow no. 5"],
    verdict: "danger",
    category: "Synthetic Food Color",
    summary: "Lemon yellow azo dye used to impart vibrant artificial color to foods.",
    whatItIs: "A coal-tar-derived synthetic dye frequently added to beverages, snacks, and sweets.",
    allergens: ["Azo Dye Sensitivity"],
    dietaryFlags: ["Hyperactivity Link", "Artificial Color"],
    normalEffects: "Requires warning labels in Europe due to behavioral links in children.",
    excessEffects: "Associated with hyperactivity in children, hives, asthma spikes, and migraines.",
    regulatory: "Banned or restricted in select Scandinavian countries; requires warning tags in the EU."
  },
  {
    id: "ing-150d",
    name: "Caramel Color (Class IV)",
    aka: ["ins 150d", "150d", "e150d", "caramel color", "caramel iv"],
    verdict: "caution",
    category: "Coloring Agent",
    summary: "Dark brown coloring agent manufactured with ammonia and sulfite compounds.",
    whatItIs: "A concentrated brown food dye produced by heating carbohydrates with chemical catalysts.",
    allergens: [],
    dietaryFlags: ["Ultra-Processed"],
    normalEffects: "Provides dark coloration to soft drinks, sauces, and baked goods.",
    excessEffects: "Class IV caramel colors contain trace amounts of 4-MEI, a compound flagged in high doses.",
    regulatory: "Approved with maximum intake thresholds in US and EU."
  },
  {
    id: "ing-hfcs",
    name: "High Fructose Corn Syrup",
    aka: ["hfcs", "isoglucose", "glucose-fructose syrup"],
    verdict: "danger",
    category: "Added Sweetener",
    summary: "Liquid sweetener made from cornstarch converted to fructose.",
    whatItIs: "A highly processed caloric sweetener linked directly to metabolic strain.",
    allergens: [],
    dietaryFlags: ["High Glycemic Index", "Ultra-Processed"],
    normalEffects: "Processed almost entirely in the liver; rapidly increases blood sugar.",
    excessEffects: "Strongly associated with non-alcoholic fatty liver disease, type 2 diabetes, and obesity.",
    regulatory: "Permitted, but heavily advised against by health organizations."
  },
  {
    id: "ing-wheat",
    name: "Enriched Wheat Flour",
    aka: ["wheat flour", "refined wheat flour", "maida", "fortified flour"],
    verdict: "safe",
    category: "Grain Base",
    summary: "Milled wheat flour fortified with essential synthetic B vitamins and iron.",
    whatItIs: "Standard refined cereal flour with bran and germ removed.",
    allergens: ["Gluten"],
    dietaryFlags: [],
    normalEffects: "Primary staple food carbohydrate base.",
    excessEffects: "High glycemic index relative to whole grains; unsafe for celiac patients.",
    regulatory: "Standard food staple."
  },
  {
    id: "ing-citric",
    name: "Citric Acid",
    aka: ["ins 330", "330", "e330"],
    verdict: "safe",
    category: "Acidulant / Flavoring",
    summary: "Natural acidifier that adds sour taste and acts as a natural antioxidant.",
    whatItIs: "An organic acid found naturally in citrus fruits, produced commercially via fermentation.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "Harmless organic acid involved in natural human metabolism.",
    excessEffects: "Excessive concentrated intake can erode tooth enamel over time.",
    regulatory: "GRAS approved."
  }
];

// Active State Storage
let currentAnalyzedIngredients = [];
let currentFilter = "all";

// ==========================================
// 2. PARSING & MATCHING ENGINE
// ==========================================

/**
 * Splits raw label input intelligently without destroying nested parenthetical data.
 */
function splitRawIngredients(rawInput) {
  if (!rawInput || typeof rawInput !== "string") return [];

  let cleaned = rawInput.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();

  const tokens = [];
  let currentToken = "";
  let insideParentheses = 0;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === "(" || char === "[") insideParentheses++;
    if (char === ")" || char === "]") insideParentheses = Math.max(0, insideParentheses - 1);

    if ((char === "," || char === ";") && insideParentheses === 0) {
      if (currentToken.trim()) tokens.push(currentToken.trim());
      currentToken = "";
    } else {
      currentToken += char;
    }
  }
  if (currentToken.trim()) tokens.push(currentToken.trim());

  return tokens;
}

/**
 * Normalizes text and matches against INGREDIENT_DB or builds a fallback object.
 */
function parseIngredientToken(rawToken) {
  if (!rawToken) return null;

  let original = rawToken.trim();
  let normalized = original
    .toLowerCase()
    .replace(/\d+%/g, "")               // Remove percentage numbers (e.g. 10%)
    .replace(/\[|\]/g, "")              // Remove square brackets
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.length < 2) return null;

  const codeMatch = normalized.match(/(?:ins|e)?\s*([1-9][0-9]{2,3}(?:[a-z]{1,3})?)\b/i);
  const extractedCode = codeMatch ? codeMatch[1].toLowerCase() : null;
  const baseCode = extractedCode ? extractedCode.replace(/[a-z]+$/i, "") : null;

  let cleanNameOnly = normalized.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();

  // PASS 1: Direct Match on DB Name or Exact Alias
  let found = INGREDIENT_DB.find((item) =>
    item.name.toLowerCase() === normalized ||
    item.name.toLowerCase() === cleanNameOnly ||
    item.aka.some((alias) => alias.toLowerCase() === normalized || alias.toLowerCase() === cleanNameOnly)
  );

  // PASS 2: Match by Extracted INS / E-Number Code
  if (!found && extractedCode) {
    found = INGREDIENT_DB.find((item) =>
      item.aka.some((alias) => {
        const lowerAlias = alias.toLowerCase();
        return (
          lowerAlias === extractedCode ||
          lowerAlias === `ins ${extractedCode}` ||
          lowerAlias === `e${extractedCode}` ||
          (baseCode && (lowerAlias === baseCode || lowerAlias === `ins ${baseCode}`))
        );
      })
    );
  }

  // PASS 3: Partial / Contains Substring Match
  if (!found) {
    found = INGREDIENT_DB.find((item) =>
      cleanNameOnly.length > 3 && item.name.toLowerCase().includes(cleanNameOnly)
    );
  }

  // Return Matched Record if Found
  if (found) {
    return {
      ...found,
      rawMatchedText: original
    };
  }

  // PASS 4: Smart Dynamic Fallback for Unrecognized Items
  const formattedName = cleanNameOnly
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: "gen-" + Math.random().toString(36).substring(2, 7),
    name: formattedName || original,
    rawMatchedText: original,
    verdict: "safe",
    category: "Standard Ingredient",
    summary: "Recognized as a standard food or processing ingredient.",
    whatItIs: "Common culinary component or conventional food input.",
    allergens: [],
    dietaryFlags: [],
    normalEffects: "No specific toxicological flags identified for general consumption.",
    excessEffects: "Consume as part of a balanced diet.",
    regulatory: "Permitted for commercial food preparation."
  };
}

// ==========================================
// 3. MAIN ANALYSIS & SCORING PIPELINE
// ==========================================

function analyzeIngredientText(rawInputText) {
  const rawTokens = splitRawIngredients(rawInputText);
  const parsedItems = [];
  const seenIds = new Set();

  rawTokens.forEach((token) => {
    const result = parseIngredientToken(token);
    if (result) {
      const uniqueKey = result.id.startsWith("gen-") ? result.name.toLowerCase() : result.id;
      if (!seenIds.has(uniqueKey)) {
        seenIds.add(uniqueKey);
        parsedItems.push(result);
      }
    }
  });

  currentAnalyzedIngredients = parsedItems;
  renderAnalysisDashboard(parsedItems);
}

// ==========================================
// 4. UI RENDERING & DASHBOARD ENGINE
// ==========================================

function renderAnalysisDashboard(items) {
  const container = document.getElementById("results-container");
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="scansafe-empty-state">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h3>No Valid Ingredients Detected</h3>
        <p>Please check your ingredient text and try pasting again.</p>
      </div>`;
    return;
  }

  // Check against active user restrictions (Section 6 feature)
  const userRestrictions = getUserRestrictions();

  let dangerCount = 0;
  let cautionCount = 0;
  let safeCount = 0;
  const detectedAllergens = new Set();
  const detectedFlags = new Set();
  const personalAlerts = [];

  items.forEach((item) => {
    // Determine personal conflict
    let personalConflict = false;
    if (userRestrictions.length > 0) {
      const itemAttributes = [...(item.allergens || []), ...(item.dietaryFlags || [])].map((s) => s.toLowerCase());
      userRestrictions.forEach((r) => {
        if (itemAttributes.some((attr) => attr.includes(r.toLowerCase()))) {
          personalConflict = true;
          personalAlerts.push(`${item.name} conflicts with your "${r}" restriction.`);
        }
      });
    }

    if (item.verdict === "danger" || personalConflict) dangerCount++;
    else if (item.verdict === "caution") cautionCount++;
    else safeCount++;

    if (item.allergens) item.allergens.forEach((a) => detectedAllergens.add(a));
    if (item.dietaryFlags) item.dietaryFlags.forEach((f) => detectedFlags.add(f));
  });

  let overallStatus = "SAFE";
  let overallClass = "status-safe";
  let summaryText = "This product contains mostly recognized safe ingredients with low toxicological concern.";

  if (dangerCount > 0) {
    overallStatus = "HIGH CONCERN";
    overallClass = "status-danger";
    summaryText = `Contains ${dangerCount} high-concern additive(s) or personal allergy triggers. Review flagged items below.`;
  } else if (cautionCount > 0) {
    overallStatus = "MODERATE CAUTION";
    overallClass = "status-caution";
    summaryText = `Contains ${cautionCount} ingredient(s) that cause blood sugar spikes or mild sensitivity in sensitive individuals.`;
  }

  let html = `
    <div class="scansafe-dashboard">
      <div class="scansafe-summary-card ${overallClass}">
        <div class="summary-header">
          <div>
            <span class="summary-badge">${overallStatus}</span>
            <h2>Product Safety Audit</h2>
          </div>
          <div class="summary-metrics">
            <span class="metric-tag danger"><strong>${dangerCount}</strong> High Risk</span>
            <span class="metric-tag caution"><strong>${cautionCount}</strong> Caution</span>
            <span class="metric-tag safe"><strong>${safeCount}</strong> Safe</span>
          </div>
        </div>
        <p class="summary-desc">${summaryText}</p>
        
        ${
          personalAlerts.length > 0
            ? `<div class="personal-alert-bar" style="background:#fff0f0; border-left:4px solid #d9534f; padding:8px 12px; margin-top:10px; border-radius:4px; font-size:0.9em; color:#a94442;">
                <i class="fa-solid fa-triangle-exclamation"></i> <strong>Personal Profile Warning:</strong> ${personalAlerts.join(" ")}
               </div>`
            : ""
        }

        ${
          detectedAllergens.size > 0
            ? `<div class="allergen-alert-bar" style="margin-top:8px;">
                 <i class="fa-solid fa-bell"></i> <strong>Detected Allergens/Sensitivities:</strong> 
                 ${Array.from(detectedAllergens).map((a) => `<span class="allergen-chip">${a}</span>`).join(" ")}
               </div>`
            : ""
        }
      </div>

      <div class="scansafe-filter-bar">
        <span>Filter Ingredients:</span>
        <button class="filter-btn active" onclick="filterScanSafeResults('all')">All (${items.length})</button>
        <button class="filter-btn" onclick="filterScanSafeResults('danger')">High Concern (${dangerCount})</button>
        <button class="filter-btn" onclick="filterScanSafeResults('caution')">Caution (${cautionCount})</button>
        <button class="filter-btn" onclick="filterScanSafeResults('allergens')">Allergens (${detectedAllergens.size})</button>
        <button class="export-btn" onclick="exportAuditReport()" style="margin-left:auto; cursor:pointer;"><i class="fa-solid fa-download"></i> Export JSON</button>
      </div>

      <div class="scansafe-grid" id="scansafe-card-grid">
  `;

  items.forEach((item) => {
    html += renderIngredientCard(item, userRestrictions);
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderIngredientCard(item, userRestrictions = []) {
  let isPersonalRisk = false;
  const combinedFlags = [...(item.allergens || []), ...(item.dietaryFlags || [])];
  
  if (userRestrictions.length > 0) {
    isPersonalRisk = userRestrictions.some((r) =>
      combinedFlags.some((f) => f.toLowerCase().includes(r.toLowerCase()))
    );
  }

  const effectiveVerdict = isPersonalRisk ? "danger" : item.verdict;
  const verdictClass = effectiveVerdict === "danger" ? "card-danger" : effectiveVerdict === "caution" ? "card-caution" : "card-safe";
  const icon = effectiveVerdict === "danger" ? "fa-circle-xmark" : effectiveVerdict === "caution" ? "fa-triangle-exclamation" : "fa-circle-check";

  return `
    <div class="scansafe-card ${verdictClass}" data-verdict="${effectiveVerdict}" data-allergens="${(item.allergens || []).length}">
      <div class="card-header">
        <div class="title-group">
          <i class="fa-solid ${icon} verdict-icon"></i>
          <div>
            <h3>${escapeHtml(item.name)} ${isPersonalRisk ? '<span style="color:#d9534f; font-size:0.75em;">(Personal Alert)</span>' : ""}</h3>
            <span class="category-subtitle">${escapeHtml(item.category || "Ingredient")}</span>
          </div>
        </div>
        <span class="verdict-pill">${effectiveVerdict.toUpperCase()}</span>
      </div>

      <div class="card-body">
        <p class="item-summary">${escapeHtml(item.summary)}</p>

        <div class="card-tags">
          ${(item.allergens || []).map((a) => `<span class="tag allergen"><i class="fa-solid fa-wheat-awn"></i> ${a}</span>`).join("")}
          ${(item.dietaryFlags || []).map((f) => `<span class="tag flag"><i class="fa-solid fa-shield-cat"></i> ${f}</span>`).join("")}
        </div>

        <details class="item-details">
          <summary>Detailed Health Analysis <i class="fa-solid fa-chevron-down"></i></summary>
          <div class="details-content">
            <p><strong>What it is:</strong> ${escapeHtml(item.whatItIs)}</p>
            <p><strong>Primary Effects:</strong> ${escapeHtml(item.normalEffects)}</p>
            <p><strong>Risks of High Intake:</strong> ${escapeHtml(item.excessEffects)}</p>
            <p><strong>Regulatory Status:</strong> ${escapeHtml(item.regulatory)}</p>
          </div>
        </details>
      </div>
    </div>
  `;
}

function filterScanSafeResults(category) {
  currentFilter = category;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("onclick").includes(`'${category}'`));
  });

  const cards = document.querySelectorAll(".scansafe-card");
  cards.forEach((card) => {
    const verdict = card.getAttribute("data-verdict");
    const allergenCount = parseInt(card.getAttribute("data-allergens") || "0", 10);

    if (category === "all") {
      card.style.display = "block";
    } else if (category === "allergens") {
      card.style.display = allergenCount > 0 ? "block" : "none";
    } else {
      card.style.display = verdict === category ? "block" : "none";
    }
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

function runScanSafeDemo() {
  const sampleList = "Enriched Wheat Flour, Water, High Fructose Corn Syrup, Palm Oil, Salt, Maltodextrin (INS 1400), Soy Lecithin (INS 322), Sodium Metabisulfite (INS 223), Ammonium Bicarbonate (INS 503ii), Sodium Bicarbonate (INS 500ii), Mono- and Diglycerides of Fatty Acids (INS 471), Sodium Stearoyl Lactylate (INS 481i), Artificial Vanilla Flavor, Caramel Color (INS 150d), BHT (INS 321), Potassium Sorbate (INS 202), Tartrazine (INS 102), Citric Acid (INS 330)";
  analyzeIngredientText(sampleList);
}

// ==========================================
// 5. EVENT LISTENERS & UI BINDINGS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("ingredient-input");
  const analyzeBtn = document.getElementById("analyze-btn");
  const clearBtn = document.getElementById("clear-btn");
  const cameraBtn = document.getElementById("camera-btn");
  const fileInput = document.getElementById("camera-upload");
  const loadingSpinner = document.getElementById("loading-spinner");

  // --- A. Text Search / Manual Input Trigger ---
  if (analyzeBtn && inputField) {
    analyzeBtn.addEventListener("click", () => {
      const text = inputField.value.trim();
      if (!text) {
        alert("Please paste or type an ingredient list first.");
        return;
      }
      analyzeIngredientText(text);
    });

    inputField.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        const text = inputField.value.trim();
        if (text) analyzeIngredientText(text);
      }
    });
  }

  // --- B. Clear Input Trigger ---
  if (clearBtn && inputField) {
    clearBtn.addEventListener("click", () => {
      inputField.value = "";
      const container = document.getElementById("results-container");
      if (container) container.innerHTML = "";
    });
  }

  // --- C. Camera / Image File Scanner (OCR) ---
  if (cameraBtn && fileInput) {
    cameraBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (loadingSpinner) loadingSpinner.style.display = "block";

      try {
        if (typeof Tesseract === "undefined") {
          throw new Error("Tesseract.js library not loaded. Make sure the CDN script is included in index.html.");
        }

        const result = await Tesseract.recognize(file, "eng", {
          logger: (m) => console.log("OCR Progress:", m)
        });

        const extractedText = result.data.text;

        if (inputField) {
          inputField.value = extractedText;
        }

        analyzeIngredientText(extractedText);
      } catch (error) {
        console.error("OCR Scan Error:", error);
        alert("Failed to read text from image. " + error.message);
      } finally {
        if (loadingSpinner) loadingSpinner.style.display = "none";
        fileInput.value = "";
      }
    });
  }
});

// ==========================================
// 6. ENHANCEMENTS: PERSONALIZED PROFILE & EXPORT
// ==========================================

/**
 * Fetches user dietary restrictions saved in LocalStorage.
 */
function getUserRestrictions() {
  try {
    const data = localStorage.getItem("scansafe_user_restrictions");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Saves personal allergen/dietary flags to customize audit scoring.
 * Call this function from your UI profile panel.
 * Example: saveUserRestrictions(["Soy", "Gluten", "High Glycemic Index"]);
 */
function saveUserRestrictions(restrictionsArray) {
  if (Array.isArray(restrictionsArray)) {
    localStorage.setItem("scansafe_user_restrictions", JSON.stringify(restrictionsArray));
    if (currentAnalyzedIngredients.length > 0) {
      renderAnalysisDashboard(currentAnalyzedIngredients);
    }
  }
}

/**
 * Exports the processed analysis as a JSON report file for local download.
 */
function exportAuditReport() {
  if (!currentAnalyzedIngredients || currentAnalyzedIngredients.length === 0) {
    alert("No analysis available to export.");
    return;
  }

  const reportData = {
    timestamp: new Date().toISOString(),
    totalIngredientsAnalyzed: currentAnalyzedIngredients.length,
    userRestrictionsApplied: getUserRestrictions(),
    ingredients: currentAnalyzedIngredients
  };

  const jsonBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(jsonBlob);
  const linkElement = document.createElement("a");

  linkElement.href = downloadUrl;
  linkElement.download = `ScanSafe_Audit_Report_${Date.now()}.json`;
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
  URL.revokeObjectURL(downloadUrl);
}
