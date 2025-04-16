export const filterValidPages = (data) => {
  /** sum of valid visit(upper 10 visits) */
  let validVisit = 0;
  /** remove hostnames' "www." */
  const arrangedPages = data
    .map((page) => {
      const url = new URL(page.url);
      return url.hostname.replace("www.", "");
    })
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  /** filter upper 10 visits, sort by visits */
  const filteredPages = Object.entries(arrangedPages)
    .filter((value) => {
      return value[1] >= 10;
    })
    .map(([value, count]) => {
      validVisit += count;
      return { value, count };
    })
    .sort((a, b) => b.count - a.count);
  return [validVisit, filteredPages];
};
