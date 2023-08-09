import { useDrag } from 'react-dnd'
const style = {
  position: 'absolute',
  border: '1px dashed gray',
  // width:100,
  backgroundColor: 'transparent',
  padding: '0.5rem 1rem',
  cursor: 'move',
}
export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      {children}
    </div>
  )
}
