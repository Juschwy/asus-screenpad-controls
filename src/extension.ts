import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {BrightnessIndicator} from "./components/BrightnessIndicator.js";
import {Extension} from "resource:///org/gnome/shell/extensions/extension.js";
import {Button} from "resource:///org/gnome/shell/ui/panelMenu.js";

export default class ScreenpadControlsExtension extends Extension {
    private _screenpadIndicator: BrightnessIndicator | undefined;


    enable() {
        console.log("enable asus-screenpad-controls")

        this._screenpadIndicator = new BrightnessIndicator();
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