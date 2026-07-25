// Headless Chromium inherits the desktop session by default and then aborts
// (GLib-GIO thread-pool assertion / SIGABRT) when a normal Chromium is already
// running. Dropping the session variables and forcing the headless Ozone backend
// keeps the render pipeline working whether or not anyone is logged in.
export const HEADLESS_ARGS = ['--ozone-platform=headless'];

export const HEADLESS_ENV = (() => {
  const env = { ...process.env };
  for (const key of ['WAYLAND_DISPLAY', 'DISPLAY', 'DBUS_SESSION_BUS_ADDRESS', 'XDG_SESSION_TYPE']) delete env[key];
  return env;
})();
