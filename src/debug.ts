const debugElement = document.querySelector('#debug')!;
export function dbg(...args: any) {
  debugElement.classList.add('visible');
  debugElement.innerHTML = `${args}`;
}
export function sdbg(...args: any) {
  dbg(JSON.stringify(args));
}
