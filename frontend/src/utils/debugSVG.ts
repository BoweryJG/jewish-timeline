// Debug SVG circle errors
export function debugSVGCircles() {
  // Override createElement to catch circle creation
  const originalCreateElement = document.createElementNS.bind(document);
  
  // @ts-ignore - We're intentionally overriding the method for debugging
  document.createElementNS = function(namespaceURI: string, qualifiedName: string): Element {
    const element = originalCreateElement(namespaceURI, qualifiedName);
    
    if (qualifiedName === 'circle') {
      // Override setAttribute to catch when cy is set
      const originalSetAttribute = element.setAttribute.bind(element);
      element.setAttribute = function(name: string, value: string) {
        if (name === 'cy' && (value === 'undefined' || value === 'null' || !value)) {
          console.error('FOUND IT! Circle cy being set to:', value);
          console.trace('Stack trace:');
        }
        originalSetAttribute(name, value);
      };
    }
    
    return element;
  };

  // Also check React's property setting
  if ((window as any).React) {
    console.log('Monitoring React for circle elements...');
  }
}