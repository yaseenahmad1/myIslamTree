// import React from "react";

const TreeStatus = ({ totalProgress, size = "small"}) => { // need a size prop to pass so it can refelct in my navigatio
  // Cap progress so it doesn’t go beyond your last image
  const progressLevel = Math.min(totalProgress, 10); 

  // Black tree if 0, gold trees 1-10
  const treeImage =
    progressLevel === 0
      ? "/blackstatus.svg"
      : `/goldstatus${progressLevel}.svg`;

  // Determine CSS class based on where the tree is displayed
  const treeClass = size === "big" ? "big-tree" : "tree-logo";

  return (
    <div className="tree-status">
      <img
        src={treeImage}
        alt={`Tree status level ${progressLevel}`}
        className={treeClass}
      />
    </div>
  );
};

export default TreeStatus;

