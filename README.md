Number
---

## What is this?
Number is a 2D Game Engine built for the web - developed using JS Canvas w/ HTML5.

## Documentation & Demo
**Demo:** A demo can be found in the `demo/` directory - just open up `demo.html` and you're off to the races!

**Dependencies:**
The Number Game Engine relies on a minimal amount of jQuery, and if your site already includes it then you won't have to include this. All projects should reference jQuery before any of our `src/` files are mentioned. To prevent clutter on your server or local hard drive, we recommended you use Google's Minified CDN. `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>`

**Quickstart (CTRL+C, CTRL+V Markup into HTML):**
```
<!-- Number Game Engine -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="../dist/js/number.js"></script>
<!-- Number Game Engine -->
```

## Building
`gulp` is used to build.

```sh
npm install
./node_modules/gulp/bin/gulp.js scripts
./node_modules/gulp/bin/gulp.js styles
```

Output is in the `dist/` folder.

## CDN

**TODO**
- Possible Camera that can follow 2D objects in a 2D space with limited view.
