# ASUS Screenpad+ Controls

A simple button and slider in the quick settings to control ASUS Screenpad+ with brightnessctl

> **IMPORTANT**: brightnessctl is required to control the Screenpad+

## Installation

```shell
make install
```

## Testing

### By hand

```shell
make install
dbus-run-session -- gnome-shell --nested --wayland
```