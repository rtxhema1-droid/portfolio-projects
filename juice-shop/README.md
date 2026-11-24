# Fresh Juice Shop (3D demo, Arabic RTL)

A one-page website for a juice shop. The hero shows a 3D glass of juice (Three.js) with fruit orbiting it. Pick a juice and the liquid color, fruit and page theme change. Drag the glass to rotate it. Menu with sizes, an order list and a demo order form.

موقع محل عصاير بعرض ثلاثي الأبعاد: كوباية عصير بتلف وحواليها الفاكهة، واختيار نوع العصير بيغيّر اللون والفاكهة.

## Run it
ES modules need a local server (opening the file directly will not work):

    python3 -m http.server 8000
    # open http://localhost:8000

## Files
- `index.html`, `style.css`: page and styles
- `scene.js`: the 3D scene (glass, liquid, straw, fruit made from basic shapes)
- `juices.js`: menu data
- `app.js`: menu, theme switching, order list
- `vendor/three.module.min.js`: Three.js r160 (MIT, license in `vendor/three.LICENSE`)

## Notes
- If WebGL is not available, the page shows a flat fallback instead of the 3D glass.
- Respects "reduce motion".
- Names and prices are invented. The order form is a demo: nothing is sent anywhere.
