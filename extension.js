/* exported Indicator */

import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {QuickMenuToggle, SystemIndicator} from 'resource:///org/gnome/shell/ui/quickSettings.js';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {Slider} from 'resource:///org/gnome/shell/ui/slider.js';

import {setBrightness, getActualBrightness} from "./ScreenpadConnector.js"

const SliderItem = GObject.registerClass({
    Properties: {
        'value': GObject.ParamSpec.int(
            'value', null, null,
            GObject.ParamFlags.READWRITE,
            0, 100, 0),
    },
}, class SliderItem extends PopupMenu.PopupBaseMenuItem {
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

    vfunc_key_press_event(event) {
        const key = event.get_key_symbol();
        if (key === Clutter.KEY_Left || key === Clutter.KEY_Right)
            return this._slider.vfunc_key_press_event(event);
        else
            return super.vfunc_key_press_event(event);
    }
});

const KeyboardBrightnessToggle = GObject.registerClass(
class KeyboardBrightnessToggle extends QuickMenuToggle {
    _init() {
        super._init({
            title: _('Screenpad+'),
            iconName: 'window-new-symbolic',
        });

        this.connect('clicked', () => {
            setBrightness(this.checked ? 0 : 100)
            this.checked = !this.checked
        });

        this._sliderItem = new SliderItem();
        this.menu.box.add_child(this._sliderItem);
        const sliderAccessible = this._sliderItem._slider.get_accessible();
        sliderAccessible.set_parent(this.menu.box.get_accessible());
        this._sliderItem.set_accessible(sliderAccessible);

        this._sliderItemChangedId = this._sliderItem.connect('notify::value', () => {
            if (this._sliderItem.visible){
                setBrightness(this._sliderItem.value)
            }
            this.checked = this._sliderItem.value > 0
        });
        
        this._sync()
    }

    _sync() {
        console.log("test")
        const brightnessString = getActualBrightness()
        let brightness
        try{
          brightness = Number(brightnessString)
        }
        catch(error){
          this.visible = false
          console.error(error)
        }

        this.checked = brightness > 0;

        this._sliderItem.block_signal_handler(this._sliderItemChangedId);

        this._sliderItem.set({
            visible: true,
            value: brightness,
        });

        this._sliderItem.unblock_signal_handler(this._sliderItemChangedId);
    }
});

export const Indicator = GObject.registerClass(
class Indicator extends SystemIndicator {
    _init() {
        super._init();

        this.quickSettingsItems.push(new KeyboardBrightnessToggle());
    }
});

export default class QuickSettingsExampleExtension extends Extension {
    enable() {
        console.log("enable")
        this._indicator = new Indicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);
    }

    disable() {
        this._indicator.quickSettingsItems.forEach(item => item.destroy());
        this._indicator.destroy();
    }
}
