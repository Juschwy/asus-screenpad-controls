import GObject from "gi://GObject";
import {gettext as _} from "@girs/gnome-shell/extensions/extension";
import {PopupBaseMenuItem} from "@girs/gnome-shell/ui/popupMenu";
import {Slider} from "@girs/gnome-shell/ui/slider";
import Clutter from 'gi://Clutter';

export class ScreenpadSliderItem extends PopupBaseMenuItem {
    private readonly _sliderChangedId: number;
    readonly _slider: Slider;

    static {
        GObject.registerClass({
            Properties: {
                'value': GObject.ParamSpec.int(
                    'value', "value", "value",
                    GObject.ParamFlags.READWRITE,
                    0, 100, 0),
            },
        }, this)
    }

    constructor() {
        super({
            activate: false,
            style_class: 'keyboard-brightness-item',
        });

        this._slider = new Slider(0);

        this._sliderChangedId = this._slider.connect('notify::value',
            () => this.notify('value'));
        this._slider.accessible_name = _('Screenpad+ Brightness');

        this.add_child(this._slider);
    }

    get value() {
        return this._slider.value * 100;
    }

    set value(value) {
        if (this.value === value)
            return;

        this._slider.block_signal_handler(this._sliderChangedId);
        this._slider.value = value / 100;
        this._slider.unblock_signal_handler(this._sliderChangedId);

        this.notify('value');
    }

    vfunc_key_press_event(event: Clutter.Event) {
        const key = event.get_key_symbol();
        if (key === Clutter.KEY_Left || key === Clutter.KEY_Right)
            return this._slider.vfunc_key_press_event(event);
        else
            return super.vfunc_key_press_event(event);
    }
}