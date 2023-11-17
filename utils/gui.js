import GUI from 'lil-gui';

const gui = new GUI();

function addLightFolder(folderName, lightControl, light) {
  const folder = gui.addFolder(folderName);
  folder.add(lightControl, 'x').onChange((x) => (light.position.x = x));
  folder.add(lightControl, 'y').onChange((y) => (light.position.y = y));
  folder.add(lightControl, 'z').onChange((z) => (light.position.z = z));

  folder
    .add(lightControl, 'intensity')
    .onChange((intensity) => (light.intensity = intensity));

  folder.add(lightControl, 'decay').onChange((decay) => (light.decay = decay));

  folder
    .add(lightControl.color, 'r')
    .onChange((newRed) => (light.color.r = newRed));
  folder
    .add(lightControl.color, 'g')
    .onChange((newGreen) => (light.color.g = newGreen));
  folder
    .add(lightControl.color, 'b')
    .onChange((newBlue) => (light.color.b = newBlue));
}

export default function guiInit(
  cfg,
  scene,
  camera,
  pointLight,
  pointLight2,
  base
) {
  const cameraOpts = {
    x: cfg.camera.x,
    y: cfg.camera.y,
    z: cfg.camera.z,
    // lookAtX: cfg.camera.lookAtX,
    // lookAtY: cfg.camera.lookAtY,
    // lookAtZ: cfg.camera.lookAtZ,
    lookAtX: cfg.model.x,
    lookAtY: cfg.model.y,
    lookAtZ: cfg.model.z,
  };

  const light1 = {
    x: cfg.light1.x,
    y: cfg.light1.y,
    z: cfg.light1.z,
    intensity: cfg.light1.intensity,
    decay: cfg.light1.decay,
    color: {
      r: cfg.light1.r,
      g: cfg.light1.g,
      b: cfg.light1.b,
    },
  };

  const light2 = {
    visible: true,
    x: cfg.light2.x,
    y: cfg.light2.y,
    z: cfg.light2.z,
    intensity: cfg.light2.intensity,
    decay: cfg.light2.decay,
    color: {
      r: cfg.light2.r,
      g: cfg.light2.g,
      b: cfg.light2.b,
    },
  };

  const modelCfg = {
    x: cfg.model.x,
    y: cfg.model.y,
    z: cfg.model.z,
  };

  gui.close();
  gui.add({ func: () => console.log(scene) }, 'func');

	addLightFolder('Light1', light1, pointLight);
	addLightFolder('Light2', light2, pointLight2);

  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(cameraOpts, 'x').onChange((x) => (camera.position.x = x));
  cameraFolder.add(cameraOpts, 'y').onChange((y) => (camera.position.y = y));
  cameraFolder.add(cameraOpts, 'z').onChange((z) => (camera.position.z = z));
  cameraFolder
    .add(cameraOpts, 'lookAtX')
    .onChange((x) => (cameraOpts.lookAtX = x));
  cameraFolder
    .add(cameraOpts, 'lookAtY')
    .onChange((y) => (cameraOpts.lookAtY = y));
  cameraFolder
    .add(cameraOpts, 'lookAtZ')
    .onChange((z) => (cameraOpts.lookAtZ = z));

  const modelFolder = gui.addFolder('Model');
  modelFolder.close();
  modelFolder.add(modelCfg, 'x').onChange((x) => (base.position.x = x));
  modelFolder.add(modelCfg, 'y').onChange((y) => (base.position.y = y));
  modelFolder.add(modelCfg, 'z').onChange((z) => (base.position.z = z));
}
