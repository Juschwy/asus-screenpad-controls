import GObject from "gi://GObject";
import {ScreenpadBrightnessToggle} from "./ScreenpadBrightnessToggle.js";
import {SystemIndicator} from "@girs/gnome-shell/ui/quickSettings";

export class ScreenpadIndicator extends SystemIndicator {

    static {
        GObject.registerClass(this)
    }

    constructor() {
        super()

        this.quickSettingsItems.push(new ScreenpadBrightnessToggle());
    }
}