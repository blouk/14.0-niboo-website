odoo.define('theme_niboo.3d_banner', function(require) {
  'use strict';

  const publicWidget = require('web.public.widget');


  publicWidget.registry.Banner3d = publicWidget.Widget.extend({
    selector: '.s_niboo_3d_banner',


    start: function() {

      var self = this;
      let container, stats;


      let camera, controls, scene, renderer;
      let mesh, texture;

      const worldWidth = 256,
        worldDepth = 256,
        worldHalfWidth = worldWidth / 2,
        worldHalfDepth = worldDepth / 2;
      const clock = new THREE.Clock();

      init_scene();
      animate();

      function init_scene() {
        container = self.$el[0];
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        scene = new THREE.Scene();
        const data = generateHeight(worldWidth, worldDepth);
        camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
        const geometry = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
        geometry.rotateX(-Math.PI / 2);
        const vertices = geometry.attributes.position.array;
        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
          vertices[j + 1] = data[i] * 10;
        }

        texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth));
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
          map: texture
        }));
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({
          alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        self.$el.empty();
        container.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function generateHeight(width, height) {

        const size = width * height,
          data = new Uint8Array(size),
          perlin = new ImprovedNoise(),
          z = Math.random() * 100;
        let quality = 1;
        for (let j = 0; j < 4; j++) {
          for (let i = 0; i < size; i++) {
            const x = i % width,
              y = ~~(i / width);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
          }
          quality *= 5;
        }
        return data;
      }

      function generateTexture(data, width, height) {
        let context, image, imageData, shade;
        const vector3 = new THREE.Vector3(0, 0, 0);
        const sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);
        image = context.getImageData(0, 0, canvas.width, canvas.height);
        imageData = image.data;
        for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
          vector3.x = data[j - 2] - data[j + 2];
          vector3.y = 2;
          vector3.z = data[j - width * 2] - data[j + width * 2];
          vector3.normalize();
          shade = vector3.dot(sun);
          imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
          imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
          imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);
        }
        context.putImageData(image, 0, 0);

        // Scaled 4x

        const canvasScaled = document.createElement('canvas');
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;

        context = canvasScaled.getContext('2d');
        context.scale(4, 4);
        context.drawImage(canvas, 0, 0);

        image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
        imageData = image.data;

        for (let i = 0, l = imageData.length; i < l; i += 4) {

          const v = ~~(Math.random() * 5);

          imageData[i] += v;
          imageData[i + 1] += v;
          imageData[i + 2] += v;

        }

        context.putImageData(image, 0, 0);
        return canvasScaled;

      }


      function animate() {
        requestAnimationFrame(animate);
        self.render(mesh, renderer, scene, camera);
      }


    },
    render: function(mesh, renderer, scene, camera) {
      let rotV = 0;

      switch (this.$el.parent().data('rotation')) {
        case 'fast':
          rotV = .01;
          break;
        case 'medium':
          rotV = .001;
          break;
        case 'slow':
          rotV = .0005;
          break;

      }

      mesh.rotation.y += rotV;
      renderer.render(scene, camera);
    },


  });

});
