import GLib from "@girs/glib-2.0";

// TODO: improve with this things https://github.com/admtrv/ScreenPadian/blob/main/main.cpp#L10

const screenpadBrightnessCtl = "brightnessctl --device asus_screenpad"
const decoder = new TextDecoder('utf-8');

function _runBrightnessctlCommand(command: string) {
    const [ok, stdout_raw, stderr_raw, exit_code] = GLib.spawn_command_line_sync(`${screenpadBrightnessCtl} ${command}`)
    if (ok && stdout_raw) {
        return decoder.decode(stdout_raw)
    } else {
        if (!stderr_raw) throw new Error("Failed with no error message")
        throw new Error(decoder.decode(stderr_raw))
    }
}

export function getActualBrightness() {
    return _runBrightnessctlCommand(`get`)
}

// brightness from 0 to 100
export function setBrightness(brightness: number) {
    return _runBrightnessctlCommand(`set ${brightness}%`)
}
