// https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser

export function getBrowserVersion() {
  let temp;
  let match =
    navigator.userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+(\D\d+)?)/i
    ) || [];
  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+(\D\d+)?)/g.exec(navigator.userAgent) || [];
    return 'IE ' + (temp[1] || '');
  }
  if (match[1] === 'Chrome') {
    temp = navigator.userAgent.match(/\b(OPR|Edge)\/(\d+(\D\d+)?)/);
    if (temp !== null) return temp.slice(1).join(' ').replace('OPR', 'Opera');
  }
  match = match[2]
    ? [match[1], match[2]]
    : [navigator?.appName, navigator?.appVersion, '-?'];
  if ((temp = navigator.userAgent.match(/version\/(\d+(\D\d+)?)/i)) !== null)
    match.splice(1, 1, temp[1]);
  return match.join(' ');
};

export function isAndroid() {
  return /Android/i.test(navigator.userAgent);
};
