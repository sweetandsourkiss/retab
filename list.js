const root = document.getElementById("root");
chrome.history.search({ text: "" }, (data) => {
  const number = document.createElement("div");
  number.innerText = `Length: ${data.length}`;
  root.append(number);
  data.forEach((page) => {
    const element = document.createElement("div");
    element.innerText = page.url;
    // console.log("방문한 url:", page.url);
    root.append(element);
  });
});

console.log(root);
