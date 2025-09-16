import GObject from "gi://GObject";
import {gettext as _} from "resource:///org/gnome/shell/extensions/extension.js";
import {getActualBrightness, setBrightness} from "./ScreenpadConnector.js";
import {ScreenpadSliderItem} from "./ScreenpadSliderItem.js";
import {QuickMenuToggle} from "resource:///org/gnome/shell/ui/quickSettings.js";


export class ScreenpadBrightnessToggle extends QuickMenuToggle {
    private readonly _sliderItem: ScreenpadSliderItem
    private readonly _sliderItemChangedId: number;

    static {
        GObject.registerClass(this)
    }

    constructor() {
        super({
            title: _('Screenpad+'),
            iconName: 'window-new-symbolic',
        });

        this.connect('clicked', () => {
            console.log("Turning off not implemented yet")
        });

        this._sliderItem = new ScreenpadSliderItem();
        this.menu.box.add_child(this._sliderItem);
        const sliderAccessible = this._sliderItem._slider.get_accessible();
        sliderAccessible.set_parent(this.menu.box.get_accessible());
        this._sliderItem.set_accessible(sliderAccessible);

        this._sliderItemChangedId = this._sliderItem.connect('notify::value', () => {
            if (this._sliderItem.visible) {
                setBrightness(this._sliderItem.value)
            }
        });

        this._sync()
    }

    _sync() {
        console.log("syncing")
        const brightnessString = getActualBrightness()

        let brightness: number | undefined;
        try {
            brightness = Number(brightnessString)
        } catch (error) {
            this.visible = false
            console.error(error)
        }

        this._sliderItem.block_signal_handler(this._sliderItemChangedId);

        this._sliderItem.set({
            visible: true,
            value: brightness,
        });

        this._sliderItem.unblock_signal_handler(this._sliderItemChangedId);
    }
}