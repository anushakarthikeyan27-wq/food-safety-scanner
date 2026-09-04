// ============================================
// SCANSAFE — App Logic
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------
     TAB SWITCHING
  --------------------------------------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("is-active"));
      tabPanels.forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("is-active");
    });
  });

  /* ---------------------------------------
     BARCODE SCAN + PRODUCT LOOKUP
  --------------------------------------- */
  const barcodeInput = document.getElementById("barcodeInput");
  const scanBtn = document.getElementById("scanBtn");
  const scanResult = document.getElementById("scanResult");

  scanBtn.addEventListener("click", lookupProduct);
  barcodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") lookupProduct();
  });

  async function lookupProduct() {
    const barcode = barcodeInput.value.trim();
    if (!barcode) return;

    scanBtn.disabled = true;
    scanBtn.textContent = "Checking...";
    scanResult.innerHTML = `<div class="loading-box">Looking up product data...</div>`;

    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json?fields=product_name,ingredients_text,image_front_url,nutriscore_grade`);
      const data = await res.json();

      if (data.status !== 1 || !data.product) {
        scanResult.innerHTML = `<div class="error-box">No product found for that barcode. Try a different one, or check the ingredient library instead for general ingredient info.</div>`;
        return;
      }

      renderProductResult(data.product);
    } catch (err) {
      scanResult.innerHTML = `<div class="error-box">Something went wrong reaching the product database. Please check your connection and try again.</div>`;
    } finally {
      scanBtn.disabled = false;
      scanBtn.textContent = "Check Product";
    }
  }

  function renderProductResult(product) {
    const name = product.product_name || "Unnamed product";
    const img = product.image_front_url || "";
    const ingredientsText = product.ingredients_text || "";

    if (!ingredientsText) {
      scanResult.innerHTML = `
        <div class="result-card">
          <div class="result-header">
            ${img ? `<img src="${img}" class="result-img" alt="${escapeHtml(name)}">` : ""}
            <div class="result-title">${escapeHtml(name)}</div>
          </div>
          <div class="error-box">This product doesn't have ingredient text listed in the database yet, so we can't generate a breakdown.</div>
        </div>`;
      return;
    }

    // Split raw ingredients text into individual items
    const rawItems = ingredientsText
      .split(/[,()]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1);

    let safeCount = 0, cautionCount = 0, harmfulCount = 0, unknownCount = 0;
    const rows = rawItems.map((raw) => {
      const match = matchIngredientText(raw);
      if (!match) {
        unknownCount++;
        return { raw, match: null };
      }
      if (match.verdict === "safe") safeCount++;
      else if (match.verdict === "caution") cautionCount++;
      else if (match.verdict === "harmful") harmfulCount++;
      return { raw, match };
    });

    // Overall verdict logic
    let overallLabel, overallClass, overallMsg;
    if (harmfulCount >= 1) {
      overallLabel = "Use Caution";
      overallClass = "harmful";
      overallMsg = `This product contains ${harmfulCount} ingredient${harmfulCount > 1 ? "s" : ""} flagged as harmful with regular consumption. Consider it an occasional treat rather than a daily staple.`;
    } else if (cautionCount >= 3) {
      overallLabel = "Moderate — Consume in Moderation";
      overallClass = "caution";
      overallMsg = `This product contains several additives that are generally approved but best not consumed in large amounts daily.`;
    } else if (cautionCount >= 1) {
      overallLabel = "Fairly Safe";
      overallClass = "caution";
      overallMsg = `This product looks reasonably safe, with one or two ingredients worth being mindful of.`;
    } else {
      overallLabel = "Generally Safe";
      overallClass = "safe";
      overallMsg = `No major additive concerns were identified among the ingredients we recognized.`;
    }

    const rowsHtml = rows.map((r) => {
      if (!r.match) {
        return `
          <div class="ingredient-row">
            <span class="ing-name">${escapeHtml(r.raw)}</span>
            <span class="ing-tag tag-unknown">Not in database</span>
          </div>`;
      }
      return `
        <div class="ingredient-row" data-ing-id="${r.match.id}">
          <span class="ing-name">${escapeHtml(r.match.name)}</span>
          <span class="ing-tag tag-${r.match.verdict}">${capitalize(r.match.verdict)}</span>
        </div>`;
    }).join("");

    scanResult.innerHTML = `
      <div class="result-card">
        <div class="result-header">
          ${img ? `<img src="${img}" class="result-img" alt="${escapeHtml(name)}">` : ""}
          <div class="result-title">${escapeHtml(name)}</div>
        </div>
        <div class="verdict-badge verdict-${overallClass}">${overallLabel}</div>
        <p class="overall-msg">${overallMsg}</p>
        <p class="overall-msg">${safeCount} safe · ${cautionCount} caution · ${harmfulCount} harmful · ${unknownCount} unrecognized, out of ${rows.length} identified ingredients.</p>
        <div class="ingredient-list">${rowsHtml}</div>
      </div>`;

    // Wire up click-to-expand on recognized ingredient rows
    scanResult.querySelectorAll(".ingredient-row[data-ing-id]").forEach((row) => {
      row.addEventListener("click", () => {
        const item = INGREDIENT_DB.find((i) => i.id === row.dataset.ingId);
        if (item) openModal(item);
      });
    });
  }

  /* ---------------------------------------
     INGREDIENT LIBRARY SEARCH
  --------------------------------------- */
  const librarySearch = document.getElementById("librarySearch");
  const libraryResults = document.getElementById("libraryResults");

  function renderLibrary(list) {
    if (list.length === 0) {
      libraryResults.innerHTML = `<div class="empty-state">No ingredients matched your search. Try a different name or E-number.</div>`;
      return;
    }
    libraryResults.innerHTML = list.map((item) => `
      <div class="ing-card" data-ing-id="${item.id}">
        <div class="ing-card-top">
          <span class="ing-card-name">${escapeHtml(item.name)}</span>
          <span class="ing-tag tag-${item.verdict}">${capitalize(item.verdict)}</span>
        </div>
        <div class="ing-card-cat">${escapeHtml(item.category)}${item.eNumber ? " · " + item.eNumber : ""}</div>
        <p class="ing-card-summary">${escapeHtml(item.summary)}</p>
      </div>
    `).join("");

    libraryResults.querySelectorAll(".ing-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = INGREDIENT_DB.find((i) => i.id === card.dataset.ingId);
        if (item) openModal(item);
      });
    });
  }

  // Show full list by default
  renderLibrary(INGREDIENT_DB);

  librarySearch.addEventListener("input", () => {
    const q = librarySearch.value.trim();
    renderLibrary(q ? searchIngredients(q) : INGREDIENT_DB);
  });

  /* ---------------------------------------
     INGREDIENT DETAIL MODAL
  --------------------------------------- */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");

  function openModal(item) {
    modalContent.innerHTML = `
      <button class="modal-close" id="modalCloseBtn">&times;</button>
      <div class="verdict-badge verdict-${item.verdict}">${capitalize(item.verdict)}</div>
      <h2>${escapeHtml(item.name)}</h2>
      <div class="modal-eyebrow">${escapeHtml(item.category)}${item.eNumber ? " · " + item.eNumber : ""}</div>

      <div class="modal-section">
        <h4>What It Is</h4>
        <p>${escapeHtml(item.whatItIs)}</p>
      </div>
      <div class="modal-section">
        <h4>History</h4>
        <p>${escapeHtml(item.history)}</p>
      </div>
      <div class="modal-section">
        <h4>Commonly Found In</h4>
        <div class="modal-tags">${item.commonlyFoundIn.map((f) => `<span>${escapeHtml(f)}</span>`).join("")}</div>
      </div>
      <div class="modal-section">
        <h4>At Normal Levels</h4>
        <p>${escapeHtml(item.normalEffects)}</p>
      </div>
      <div class="modal-section">
        <h4>In Excess</h4>
        <p>${escapeHtml(item.excessEffects)}</p>
      </div>
      <div class="modal-section">
        <h4>Regulatory Status</h4>
        <p>${escapeHtml(item.regulatory)}</p>
      </div>
      <div class="modal-section">
        <h4>Natural Alternatives</h4>
        <p>${escapeHtml(item.alternatives)}</p>
      </div>
    `;
    modalOverlay.classList.add("is-open");
    document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  }

  function closeModal() {
    modalOverlay.classList.remove("is-open");
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------------------------------------
     UTILITIES
  --------------------------------------- */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});
// ==========================================
// ADD THIS TO THE BOTTOM OF YOUR MAIN JS FILE
// ==========================================

async function checkAnyIngredient(inputName) {
  const query = inputName.toLowerCase().trim();

  // 1. Check your ingredients-data.js file first
  if (typeof ingredientsData !== 'undefined') {
    // If ingredientsData is an Object
    if (ingredientsData[query]) {
      return ingredientsData[query];
    }
    // If ingredientsData is an Array
    if (Array.isArray(ingredientsData)) {
      const match = ingredientsData.find(item => 
        (item.name && item.name.toLowerCase() === query) || 
        (item.code && item.code.toLowerCase() === query)
      );
      if (match) return match;
    }
  }

  // 2. Fallback: Search the free Open Food Facts Global API
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      const product = data.products[0];
      const additives = product.additives_tags || [];
      
      return {
        name: product.product_name || inputName,
        safety: additives.length > 0 ? "Caution (Additives Detected)" : "Safe / Natural",
        details: `Found in Global Registry. Ingredients: ${product.ingredients_text || "Listed on product package"}. Detected additives: ${additives.join(', ') || 'None'}`
      };
    }
  } catch (error) {
    console.error("API Search Error:", error);
  }

  // 3. Fallback if not found anywhere
  return {
    name: inputName,
    safety: "Unknown",
    details: "Ingredient not found in local or global safety databases. Exercise standard caution."
  };
}

// Example usage inside your existing button click handler:
// async function onSearchButtonClicked() {
//   const userInput = document.getElementById("your-input-id").value;
//   const result = await checkAnyIngredient(userInput);
//   
//   // Update your UI with result.name, result.safety, and result.details
//   console.log(result);
// }
// ADD THIS NEW HELPER FUNCTION TO SCRIPT.JS

function parseComplexIngredient(rawText) {
  let cleaned = rawText.toLowerCase().trim();

  // 1. Skip junk tokens completely
  if (
    !cleaned || 
    cleaned === 'ii' || 
    cleaned === 'i' || 
    /^\d+%$/.test(cleaned) || 
    cleaned.includes('numbers in brackets')
  ) {
    return null; // Return null to ignore this item completely
  }

  // 2. Clean up percentages and special characters
  cleaned = cleaned
    .replace(/\d+%/g, '')
    .replace(/\[|\]|\(|\)|\*|&/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 3. Extract standalone INS/E-numbers (e.g., "503", "472e", "150d", "223", "500")
  const numberMatch = cleaned.match(/\b([1-9][0-9]{2,3}[a-z]?)\b/);
  
  return {
    cleanedText: cleaned,
    insCode: numberMatch ? numberMatch[1] : null
  };
}
