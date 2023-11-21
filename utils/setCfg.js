export function setCfg(cfg) {
  const breakpoints = [
    { width: 420, res: cfg[375] },
    { width: 1023, res: cfg[786] },
    { width: 1280, res: cfg[1100] },
    { width: 1680, res: cfg[1440] },
    { width: Infinity, res: cfg[1920] },
  ];

  const { res, width } = breakpoints.find((breakpoint) => {
    return window.innerWidth <= breakpoint.width;
  });

  console.log(width);
  return res;
}
