export function setCfg(cfg) {
  // if (window.innerWidth <= 320) {
  //   console.log(cfg[320].res);
  //   return cfg[320];
  // } else
  if (window.innerWidth <= 420) {
    console.log(cfg[375].res);
    return cfg[375];
    // } else if (window.innerWidth <= 420) {
    //   console.log(cfg[420].res);
    //   return cfg[420];
  } else if (window.innerWidth <= 1023) {
    console.log(cfg[786].res);
    return cfg[786];
  } else if (window.innerWidth <= 1280) {
    console.log(cfg[1100].res);
    return cfg[1100];
  } else if (window.innerWidth <= 1680) {
    console.log(cfg[1440].res);
    return cfg[1440];
  } else {
    console.log(cfg[1920].res);
    return cfg[1920];
  }
};
