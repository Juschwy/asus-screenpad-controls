NAME=asus-screenpad-controls
DOMAIN=juschwy.ch

.PHONY: all pack install clean

all: dist/extension.js

node_modules: package.json
	npm install

dist/extension.js: node_modules
	tsc

$(NAME).zip: dist/extension.js
	@cp metadata.json dist/
	@cp src/stylesheet.css dist/
	@(cd dist && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	@touch ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@rm -rf ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@mv dist ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@rm -rf dist
	@rm -rf $(NAME).zip

clean:
	@rm -rf dist node_modules $(NAME).zip