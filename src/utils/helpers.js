
export function injectStyle (element, property, value) {
  if (typeof value !== `string`) {
    value = value.toString();
  }

  element.style[property] = value;
}

export function injectStyleWithVendor (element, property, value) {
  injectStyle(element, `Webkit${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `Moz${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `ms${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `O${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `${property.charAt(0).toLowerCase()}${property.substr(1)}`, value);
}
