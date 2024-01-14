
  
  declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  // Add this to your existing declarations.d.ts file or create a new one
declare module '*.svg?react' {
  import React = require('react');
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
