import React, { Component } from 'react';
import { DragSource } from "react-dnd";
const Types = {
  ITEM: "group"
};
const itemSource = {
  beginDrag(props) {
    const item = { id: props.id }
    return item
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
class DragGroup extends Component {
  render() {
    const { isDragging, connectDragSource, txt } = this.props;
    return connectDragSource(
    <div className='toys'>
    {!isDragging && <p>{txt}</p>}
  </div>
    )
  }
}
export default DragSource(Types.ITEM, itemSource, collect)(DragGroup);
