// Debug SVG circle errors
export function debugSVGCircles() {
  // Override createElement to catch circle creation
  const originalCreateElement = document.createElementNS;
  document.createElementNS = function(ns: string, tagName: string) {
    const element = originalCreateElement.call(this, ns, tagName);
    
    if (tagName === 'circle') {
      // Override setAttribute to catch when cy is set
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name: string, value: string) {
        if (name === 'cy' && (value === 'undefined' || value === 'null' || !value)) {
          console.error('FOUND IT! Circle cy being set to:', value);
          console.trace('Stack trace:');
        }
        originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };

  // Also check React's property setting
  if (window.React) {
    console.log('Monitoring React for circle elements...');
  }
}