import * as React from "react";
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";


function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{color: match ? "blue" : "black", textDecoration: "none", marginBottom: ".2rem"}}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {/* {match && " (active)"} */}
    </div>
  );
}

export default CustomLink
