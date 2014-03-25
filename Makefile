build:
	@mkdir -p build
	@cleancss bookmark.css -o build/bookmark.css
	@uglifyjs index.js -m -o build/bookmark.js

publish: build
	@qboxrsctl put yuehu assets/bookmark.js build/bookmark.js
	@qboxrsctl put yuehu assets/bookmark.css build/bookmark.css
