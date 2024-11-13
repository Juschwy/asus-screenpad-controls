import Gio from 'gi://Gio';
import GLib from 'gi://GLib'

const screenpadBrightnessCtl = "brightnessctl --device asus_screenpad"
const decoder = new TextDecoder('utf-8');

function _runBrightnessctlCommand(command){
  const [ok, stdout_raw, stderr_raw, exit_code] = GLib.spawn_command_line_sync(`${screenpadBrightnessCtl} ${command}`)
  if (ok){
    return decoder.decode(stdout_raw)
  }
  else{
    throw new Error(decoder.decode(stderr_raw))
  }
}

export function getActualBrightness(){
  return _runBrightnessctlCommand(`get`)
}

// brightness from 0 to 100
export function setBrightness(brightness){
  return _runBrightnessctlCommand(`set ${brightness}%`)
}
