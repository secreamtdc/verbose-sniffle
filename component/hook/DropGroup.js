import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const Types = {
  ITEM: "group"
};

const option = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const box = props.box;
    return props.handleDrop(item, box);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const Box = (props) => {
    const { connectDropTarget, item, box } = props;
    return connectDropTarget(<div className="box">{item}</div>);
}

export default DropTarget(Types.ITEM, option, collect)(Box);
