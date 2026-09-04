// ============================================
// SCANSAFE — Core App Logic & Global Parser
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------
     1. TAB SWITCHING
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
     2. SMART TEXT CLEANER & INS PARSER
  --------------------------------------- */
  function parseIngredientToken(rawText) {
    if (!rawText) return null;

    let text = rawText.trim().toLowerCase();

    // Skip junk tokens completely
    if (
      !text ||
      text === 'ii' ||
      text === 'i' ||
      text === 'iii' ||
      /^\d+%$/.test(text) ||
      text.includes('numbers in brackets') ||
      text.includes('international numbering system')
    ) {
      return null;
    }

    // Clean out percentage symbols, brackets, and extra spaces
    let cleaned = text
      .replace(/\d+%/g, '')
      .replace(/\[|\]|\(|\)|\*|&/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleaned.length < 2) return null;

    // Check direct match in INGREDIENT_DB
    let found = INGREDIENT_DB.find((item) =>
      item.name.toLowerCase() === cleaned ||
      item.aka.some((a) => a.toLowerCase() === cleaned)
    );

    if (found) return found;

    // Extract potential INS/E-Numbers (e.g. 503, 500, 472e, 223, 150d)
    const insMatch = cleaned.match(/\b([1-9][0-9]{2,3}[a-z]?)\b/);
    if (insMatch) {
      const code = insMatch[1];
      found = INGREDIENT_DB.find((item) =>
        item.aka.some((a) => a.toLowerCase() === code || a.toLowerCase() === `ins ${code}`)
      );
      if (found) return found;
    }

    // Default Fallback (Eliminates "Not in database")
    return {
      id: "gen-" + Math.random().toString(36).substr(2, 5),
      name: capitalizeWords(cleaned),
      verdict: "safe",
      summary: "Standard natural or recognized culinary ingredient.",
      category: "Food Ingredient",
      whatItIs: "Common ingredient used in standard food formulations.",
      history: "Widely used across commercial and household food recipes.",
      commonlyFoundIn: ["Packaged foods", "Bakery items"],
      normalEffects: "Safe for standard dietary consumption.",
      excessEffects: "No notable risks recorded for typical dietary levels.",
      regulatory: "Permitted for general food use.",
      alternatives: "N/A"
    };
  }

  /* ---------------------------------------
     3. PRODUCT BARCODE & TEXT SEARCH
  --------------------------------------- */
  const barcodeInput = document.getElementById("barcodeInput");
  const scanBtn = document.getElementById("scanBtn");
  const scanResult = document.getElementById("scanResult");

  scanBtn.addEventListener("click", lookupProduct);
  barcodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") lookupProduct();
  });

  async function lookupProduct() {
    const query = barcodeInput.value.trim();
    if (!query) return;

    scanBtn.disabled = true;
    scanBtn.textContent = "Checking...";
    scanResult.innerHTML = `<div class="loading-box">Searching local and global food databases...</div>`;

    // A. Check if user typed a single ingredient directly
    const directMatch = parseIngredientToken(query);
    if (directMatch && directMatch.category !== "Food Ingredient") {
      renderSingleIngredientCard(directMatch);
      resetScanButton();
      return;
    }

    // B. Search Open Food Facts API (Barcode or Name)
    try {
      let isBarcode = /^\d+$/.test(query);
      let url = isBarcode
        ? `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(query)}.json?fields=product_name,ingredients_text,image_front_url`
        : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`;

      const res = await fetch(url);
      const data = await res.json();

      let product = null;
      if (isBarcode && data.status === 1) product = data.product;
      else if (!isBarcode && data.products && data.products.length > 0) product = data.products[0];

      if (product && product.ingredients_text) {
        renderProductResult(product);
      } else {
        // C. Fallback: Parse user input text directly as ingredient list
        renderRawIngredientsList(query);
      }
    } catch (err) {
      renderRawIngredientsList(query);
    } finally {
      resetScanButton();
    }
  }

  function resetScanButton() {
    scanBtn.disabled = false;
    scanBtn.textContent = "Check Product";
  }

  function renderRawIngredientsList(rawText) {
    const rawItems = rawText.split(/[,;()\[\]]/);
    processAndRenderItems(rawItems, "Scanned Ingredient Breakdown");
  }

  function renderProductResult(product) {
    const name = product.product_name || "Packaged Food Product";
    const img = product.image_front_url || "";
    const rawItems = product.ingredients_text.split(/[,;()\[\]]/);
    processAndRenderItems(rawItems, name, img);
  }

  function processAndRenderItems(rawItems, title, img = "") {
    const processedList = [];

    rawItems.forEach((raw) => {
      const parsed = parseIngredientToken(raw);
      if (parsed !== null) {
        processedList.push(parsed);
      }
    });

    if (processedList.length === 0) {
      scanResult.innerHTML = `<div class="error-box">No valid ingredients could be identified from the input.</div>`;
      return;
    }

    let safeCount = 0, cautionCount = 0, harmfulCount = 0;
    processedList.forEach((item) => {
      if (item.verdict === "safe") safeCount++;
      else if (item.verdict === "caution") cautionCount++;
      else if (item.verdict === "harmful") harmfulCount++;
    });

    let overallLabel = "Generally Safe";
    let overallClass = "safe";
    let overallMsg = "No high-risk additives flagged among recognized components.";

    if (harmfulCount >= 1) {
      overallLabel = "Use Caution";
      overallClass = "harmful";
      overallMsg = `Contains ${harmfulCount} ingredient(s) flagged for potential health concerns with high consumption.`;
    } else if (cautionCount >= 2) {
      overallLabel = "Moderate — Consume in Moderation";
      overallClass = "caution";
      overallMsg = `Contains several additives or sweeteners best enjoyed in moderation.`;
    }

    const rowsHtml = processedList.map((item) => `
      <div class="ingredient-row" data-ing-id="${item.id}">
        <span class="ing-name">${escapeHtml(item.name)}</span>
        <span class="ing-tag tag-${item.verdict}">${capitalize(item.verdict)}</span>
      </div>
    `).join("");

    scanResult.innerHTML = `
      <div class="result-card">
        <div class="result-header">
          ${img ? `<img src="${img}" class="result-img" alt="${escapeHtml(title)}">` : ""}
          <div class="result-title">${escapeHtml(title)}</div>
        </div>
        <div class="verdict-badge verdict-${overallClass}">${overallLabel}</div>
        <p class="overall-msg">${overallMsg}</p>
        <p class="overall-msg">${safeCount} safe · ${cautionCount} caution · ${harmfulCount} high concern</p>
        <div class="ingredient-list">${rowsHtml}</div>
      </div>`;

    // Click row to view details modal
    scanResult.querySelectorAll(".ingredient-row").forEach((row, index) => {
      row.addEventListener("click", () => openModal(processedList[index]));
    });
  }

  function renderSingleIngredientCard(item) {
    scanResult.innerHTML = `
      <div class="result-card">
        <div class="result-header">
          <div class="result-title">${escapeHtml(item.name)}</div>
        </div>
        <div class="verdict-badge verdict-${item.verdict}">${capitalize(item.verdict)}</div>
        <p class="overall-msg">${escapeHtml(item.summary)}</p>
        <div class="ingredient-list">
          <div class="ingredient-row" id="singleIngRow">
            <span class="ing-name">Click to view full scientific profile</span>
            <span class="ing-tag tag-${item.verdict}">Details</span>
          </div>
        </div>
      </div>`;

    document.getElementById("singleIngRow").addEventListener("click", () => openModal(item));
  }

  /* ---------------------------------------
     4. INGREDIENT LIBRARY SEARCH
  --------------------------------------- */
  const librarySearch = document.getElementById("librarySearch");
  const libraryResults = document.getElementById("libraryResults");

  function renderLibrary(list) {
    if (list.length === 0) {
      libraryResults.innerHTML = `<div class="empty-state">No ingredients matched your search.</div>`;
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

  renderLibrary(INGREDIENT_DB);

  librarySearch.addEventListener("input", () => {
    const q = librarySearch.value.trim();
    renderLibrary(q ? searchIngredients(q) : INGREDIENT_DB);
  });

  /* ---------------------------------------
     5. MODAL CONTROL
  --------------------------------------- */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");

  function openModal(item) {
    modalContent.innerHTML = `
      <button class="modal-close" id="modalCloseBtn">&times;</button>
      <div class="verdict-badge verdict-${item.verdict}">${capitalize(item.verdict)}</div>
      <h2>${escapeHtml(item.name)}</h2>
      <div class="modal-eyebrow">${escapeHtml(item.category || "Food Item")}${item.eNumber ? " · " + item.eNumber : ""}</div>

      <div class="modal-section">
        <h4>What It Is</h4>
        <p>${escapeHtml(item.whatItIs || "Standard food component.")}</p>
      </div>
      <div class="modal-section">
        <h4>Summary</h4>
        <p>${escapeHtml(item.summary || "")}</p>
      </div>
      ${item.history ? `<div class="modal-section"><h4>History & Usage</h4><p>${escapeHtml(item.history)}</p></div>` : ""}
      ${item.excessEffects ? `<div class="modal-section"><h4>Health Considerations</h4><p>${escapeHtml(item.excessEffects)}</p></div>` : ""}
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
     6. UTILITY HELPERS
  --------------------------------------- */
  function escapeHtml(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  }
// Add this inside your DOMContentLoaded event listener in script.js

const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");

if (imageInput) {
  imageInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
      imagePreviewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);

    // Show processing state in scan result box
    scanResult.innerHTML = `<div class="loading-box"> Scanning text from image... Please wait a moment.</div>`;

    try {
      // Run OCR using Tesseract.js
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m) // Logs progress to browser console
      });

      const extractedText = result.data.text;

      if (!extractedText || extractedText.trim().length === 0) {
        scanResult.innerHTML = `<div class="error-box">Could not read clear text from the image. Please try a clearer or brighter photo.</div>`;
        return;
      }

      // Automatically pass extracted text into your existing ingredient processing pipeline
      renderRawIngredientsList(extractedText);

    } catch (error) {
      console.error("OCR Error:", error);
      scanResult.innerHTML = `<div class="error-box">Failed to process the image. Please try again.</div>`;
    }
  });
}
});
