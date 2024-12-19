// 일주일
// const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
// const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
// 한 달
// const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 7 * 4;
// 일 년
// const millisecondsPerYear = 1000 * 60 * 60 * 24 * 7 * 365;

const content = document.getElementById("content");

const insertNothing = () => {
  const nothing = document.createElement("div");
  nothing.innerText = "There is no histories in your browser!";
  content.append(nothing);
};

chrome.history.search({ text: "", startTime: 1, maxResults: 100000000 }, (data) => {
  if (data.length === 0) {
    insertNothing();
  } else {
    const arrangedData = data
      .map((page) => {
        const url = new URL(page.url);
        return url.hostname.replace("www.", "");
      })
      .reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});

    let validSize = 0;

    const finalData = Object.entries(arrangedData)
      .filter((value) => {
        return value[1] >= 10;
      })
      .map(([value, count]) => {
        validSize += count;
        return { value, count };
      })
      .sort((a, b) => b.count - a.count);

    if (validSize === 0) {
      insertNothing();
    } else {
      finalData.map((page) => {
        const graph = document.createElement("div");
        const container = document.createElement("div");
        const hostname = document.createElement("a");
        const count = document.createElement("div");
        const ratio = document.createElement("div");

        graph.classList.add("graph");
        container.classList.add("container");
        hostname.classList.add("hostname");
        hostname.href = "https://" + page.value;
        hostname.target = "_blank";
        count.classList.add("count");
        ratio.classList.add("ratio");

        hostname.innerText = page.value;
        count.innerText = `${page.count} visits`;
        ratio.innerText = Math.round((page.count / validSize) * 100) + "%";
        const ratioDegree = (Math.round((page.count / validSize) * 100) / 100) * 360;
        const cssString = `#123456 0deg ${ratioDegree}deg, transparent ${ratioDegree}deg 360deg`;
        graph.style.background = `conic-gradient(${cssString})`;

        container.append(hostname);
        container.append(count);
        container.append(ratio);
        graph.append(container);
        content.append(graph);
      });
    }
  }
});
