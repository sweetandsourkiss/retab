import { DEFAULT_TIME, MAX_RESULT } from "./constants/number.js";
import { insertNoHistoryInfo, insertGraph } from "./scripts/dom-manager.js";
import { filterValidPages } from "./scripts/page-manager.js";

chrome.history.search(
  { text: "", startTime: DEFAULT_TIME, maxResults: MAX_RESULT },
  (data) => {
    if (data.length === 0) {
      insertNoHistoryInfo();
    } else {
      const [validVisit, pages] = filterValidPages(data);
      if (validVisit === 0) {
        insertNoHistoryInfo();
      } else {
        for (const _page of pages) {
          insertGraph(_page, validVisit);
        }
      }
    }
  }
);
