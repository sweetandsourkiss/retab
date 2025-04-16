import {
  GRAPH,
  GRAPH_FLEX_COLUMN,
  GRAPH_HOSTNAME,
  GRAPH_RATIO,
  GRAPH_VISIT,
  TAG_ANCHOR,
  TAG_DIV,
} from "../constants/strings.js";

const graphContainer = document.getElementById("graph-container");
/** method for inserting no-histories info dom */
export const insertNoHistoryInfo = () => {
  const nothing = document.createElement(TAG_DIV);
  nothing.innerText = "There is no histories in your browser!";
  graphContainer.append(nothing);
};
/** method for inserting graph by page info */
export const insertGraph = (page, validVisit) => {
  const _graph = document.createElement(TAG_DIV);
  const _graphFlexColumn = document.createElement(TAG_DIV);
  const _graphHostname = document.createElement(TAG_ANCHOR);
  const _graphVisit = document.createElement(TAG_DIV);
  const _graphRatio = document.createElement(TAG_DIV);
  const _hostname = page.value;
  const _visit = page.count;
  const _ratioDegree = (Math.round((_visit / validVisit) * 100) / 100) * 360;
  const _cssString = `#123456 0deg ${_ratioDegree}deg, transparent ${_ratioDegree}deg 360deg`;

  _graph.classList.add(GRAPH);
  _graphFlexColumn.classList.add(GRAPH_FLEX_COLUMN);
  _graphHostname.classList.add(GRAPH_HOSTNAME);
  _graphVisit.classList.add(GRAPH_VISIT);
  _graphRatio.classList.add(GRAPH_RATIO);

  _graph.style.background = `conic-gradient(${_cssString})`;
  _graphHostname.href = "https://" + _hostname;
  _graphHostname.target = "_blank";
  _graphHostname.innerText = _hostname;
  _graphVisit.innerText = `${_visit} visits`;
  _graphRatio.innerText = Math.round((_visit / validVisit) * 100) + "%";

  _graphFlexColumn.append(_graphHostname);
  _graphFlexColumn.append(_graphVisit);
  _graphFlexColumn.append(_graphRatio);
  _graph.append(_graphFlexColumn);
  graphContainer.append(_graph);
};
