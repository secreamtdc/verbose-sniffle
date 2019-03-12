import React from "react";
import { DragSource } from "react-dnd";
const Types = {
  ITEM: "group"
};
const itemSource = {
  beginDrag(props) {
    const item = { id: props.id };
    return item;
  }
};
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
const DragGroup = (props) => {
    const { isDragging, connectDragSource, txt } = props;
    return connectDragSource(
      <div className="toys">{!isDragging && <p>{txt}</p>}</div>
    );
}
export default DragSource(Types.ITEM, itemSource, collect)(DragGroup);
