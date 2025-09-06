import * as Main from '@girs/gnome-shell/ui/main';
import {ScreenpadIndicator} from "./ScreenpadIndicator.js";
import {Extension} from "@girs/gnome-shell/extensions/extension";

export default class ScreenpadControlsExtension extends Extension {
    private _screenpadIndicator: ScreenpadIndicator | undefined;


    enable() {
        console.log("enable asus-screenpad-controls")

        this._screenpadIndicator = new ScreenpadIndicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._screenpadIndicator);
    }

    disable() {
        console.log("disable asus-screenpad-controls")

        if (this._screenpadIndicator) {
            this._screenpadIndicator.quickSettingsItems.forEach(item => item.destroy());
            this._screenpadIndicator.destroy();
        }

        delete this._screenpadIndicator
    }
}