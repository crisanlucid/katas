const removeKataComments = (line) => line.replace(/\/\/\/\/\s*/, '');
const isKataLine = (line) => line.trim().startsWith('////');
const findFirstKataLine = (lines) => {
  let kataLineIndex = -1;
  lines.some((line, idx) => {
    if (isKataLine(line)) {
      kataLineIndex = idx;
      return true;
    }
    return false;
  });
  return kataLineIndex;
};
const kataifyAtLineIndex = (lines, firstKataLineIndex) => {
  return kataifyFile([
    ...lines.slice(0, firstKataLineIndex),
    removeKataComments(lines[firstKataLineIndex]),
    ...lines.slice(firstKataLineIndex + 2),
  ].join('\n'));
};
export const kataifyFile = (content) => {
  const lines = content.split('\n');
  const firstKataLineIndex = findFirstKataLine(lines);
  if (firstKataLineIndex > -1) {
    return kataifyAtLineIndex(lines, firstKataLineIndex);
  }
  return content;
};

export const kataify = (kataifyableList, deps) => {
  const kataifyableToTask = (kataifyable) =>
    deps.readFile(kataifyable.sourceFileName)
      .then(kataifyFile)
      .then(content => deps.writeFile(kataifyable.destinationFilename, content))
    ;

  return Promise.all(kataifyableList.map(kataifyableToTask));
};
