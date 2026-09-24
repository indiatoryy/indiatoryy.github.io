(function () {
  var canvas = document.getElementById('intro-network');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var nodes = [];
  var mouse = { x: null, y: null, active: false };
  var animationId = null;

  function nodeCount() {
    return window.innerWidth < 700 ? 36 : 70;
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    buildNodes();
  }

  function buildNodes() {
    var count = nodeCount();
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45
      });
    }
  }

  function stepNode(node) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var linkDistance = canvas.width < 700 ? 110 : 140;
    var points = nodes.slice();
    if (mouse.active) points.push({ x: mouse.x, y: mouse.y, isMouse: true });

    var i;
    var j;
    for (i = 0; i < points.length; i++) {
      for (j = i + 1; j < points.length; j++) {
        var dx = points[i].x - points[j].x;
        var dy = points[i].y - points[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > linkDistance) continue;

        var opacity = 1 - dist / linkDistance;
        ctx.strokeStyle = points[i].isMouse || points[j].isMouse
          ? 'rgba(255, 255, 255,' + (opacity * 0.7) + ')'
          : 'rgba(255, 255, 255,' + (opacity * 0.28) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }

    for (i = 0; i < nodes.length; i++) {
      stepNode(nodes[i]);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (mouse.active) {
      ctx.fillStyle = 'rgba(70, 0, 128, 0.9)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    animationId = window.requestAnimationFrame(draw);
  }

  function onMouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.active = true;
  }

  function onMouseLeave() {
    mouse.active = false;
  }

  resize();
  draw();

  window.addEventListener('resize', resize);
  canvas.parentElement.addEventListener('mousemove', onMouseMove);
  canvas.parentElement.addEventListener('mouseleave', onMouseLeave);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      window.cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!animationId) {
      draw();
    }
  });
})();
