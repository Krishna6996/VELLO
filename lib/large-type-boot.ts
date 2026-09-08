export const LARGE_TYPE_KEY = "vello-large-type";
export const LARGE_TYPE_CLASS = "large-type";

/**
 * Inline script for <head>: applies the saved preference before first paint so
 * the page never flashes at the small size. Server-safe; no React here.
 */
export const largeTypeBootScript = `(function(){try{if(localStorage.getItem("${LARGE_TYPE_KEY}")==="1")document.documentElement.classList.add("${LARGE_TYPE_CLASS}")}catch(e){}})();`;
