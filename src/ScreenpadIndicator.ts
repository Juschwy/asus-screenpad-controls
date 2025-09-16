import GObject from "gi://GObject";
import {ScreenpadBrightnessToggle} from "./ScreenpadBrightnessToggle.js";
import {SystemIndicator} from "resource:///org/gnome/shell/ui/quickSettings.js";

export class ScreenpadIndicator extends SystemIndicator{

    static {
        GObject.registerClass(this)
    }

    constructor() {
        super()

        this.quickSettingsItems.push(new ScreenpadBrightnessToggle());
    }
}