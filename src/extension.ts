import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {ScreenpadIndicator} from "./ScreenpadIndicator.js";
import {Extension} from "resource:///org/gnome/shell/extensions/extension.js";
import {Button} from "resource:///org/gnome/shell/ui/panelMenu.js";

export default class ScreenpadControlsExtension extends Extension {
    private _screenpadIndicator: ScreenpadIndicator | undefined;


    enable() {
        console.log("enable asus-screenpad-controls")

        this._screenpadIndicator = new ScreenpadIndicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._screenpadIndicator as unknown as Button);
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