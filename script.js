const form = document.querySelector("#audit-form");
const listingInput = document.querySelector("#listing-url");
const note = document.querySelector("#form-note");

const contactEmail = "replace-with-your-email@example.com";

function isEtsyListingUrl(value) {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "");
    return host === "etsy.com" && /\/listing\/\d+/.test(url.pathname);
  } catch {
    return false;
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const listingUrl = listingInput.value.trim();

  if (!isEtsyListingUrl(listingUrl)) {
    note.textContent = "Enter a public Etsy listing URL in the format https://www.etsy.com/listing/123456789/...";
    listingInput.focus();
    return;
  }

  if (contactEmail.includes("replace-with-your-email")) {
    note.textContent = "Add your contact email in script.js before publishing this intake form.";
    return;
  }

  const subject = encodeURIComponent("Listora free audit request");
  const body = encodeURIComponent(`Please audit this Etsy listing:\n\n${listingUrl}\n\nMy email:\n`);
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
