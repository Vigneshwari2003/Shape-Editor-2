let stage = new Konva.Stage({
  container: 'canvas-container',
  width: 1000,
  height: 700
});

let layer = new Konva.Layer();
stage.add(layer);

let viewer = OpenSeadragon({
  id: "openseadragon-container",
  showNavigator: true,
  showRotationControl: true,
  maxZoomPixelRatio: 10,
  tileSources: null, 
});

viewer.addHandler('zoom', function () {
  let zoom = viewer.viewport.getZoom();
  stage.scale({ x: zoom, y: zoom });
  layer.batchDraw();
});

viewer.addHandler('pan', function () {
  let center = viewer.viewport.getCenter();
  let stageWidth = stage.width();
  let stageHeight = stage.height();
  let pan = {
    x: center.x * stageWidth - stageWidth / 2, 
    y: center.y * stageHeight - stageHeight / 2
  };
  stage.position(pan);
  layer.batchDraw();
});

function addShape(type) {
  let shape;
  const commonProps = { stroke: 'black', strokeWidth: 2, draggable: true };
  switch (type) {
    case 'circle':
      shape = new Konva.Circle({ ...commonProps, x: 200, y: 200, radius: 50 }); break;
    case 'rectangle':
      shape = new Konva.Rect({ ...commonProps, x: 300, y: 200, width: 150, height: 100 }); break;
    case 'square':
      shape = new Konva.Rect({ ...commonProps, x: 500, y: 200, width: 100, height: 100 }); break;
    case 'triangle':
      shape = new Konva.RegularPolygon({ ...commonProps, x: 700, y: 200, sides: 3, radius: 60 }); break;
  }
  addTransformer(shape);
  layer.add(shape);
  layer.draw();
}

function removeAllShapes() {
  layer.destroyChildren();
  layer.draw();
}

function addTransformer(node) {
  let tr = new Konva.Transformer({ rotateEnabled: true, enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] });
  layer.add(node);
  layer.add(tr);
  tr.nodes([node]);
  layer.draw();
}
