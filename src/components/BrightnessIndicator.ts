import GObject from "gi://GObject";
import {BrightnessToggle} from "./BrightnessToggle.js";
import {SystemIndicator} from "resource:///org/gnome/shell/ui/quickSettings.js";

export class BrightnessIndicator extends SystemIndicator{

    static {
        GObject.registerClass(this)
    }

    constructor() {
        super()

        this.quickSettingsItems.push(new BrightnessToggle());
    }
}