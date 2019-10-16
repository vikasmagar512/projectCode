import React, { useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes.js'
const style = {
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
}

// eslint-disable-next-line react/display-name
const DndCard = React.forwardRef(
	(
		{
			text,
			id,
			isDragging,
			connectDragSource,
			connectDropTarget,
			openDetailsModal,
			openEditModal,
			TableItemComp,
			matches
		},
		ref
	) => {
		const elementRef = useRef(null)
		connectDragSource(elementRef)
		connectDropTarget(elementRef)
		const opacity = isDragging ? 0 : 1
		useImperativeHandle(ref, () => ({
			getNode: () => elementRef.current
		}))
		return (
			<div ref={elementRef} style={Object.assign({}, style, { opacity })}>
				<TableItemComp
					key={`policy-table-item-${text.id}-${text.name}`}
					data={text}
					index={id}
					onEdit={() => openEditModal(text)}
					onDetails={() => openDetailsModal(text)}
					responsive={matches}
				/>
			</div>
		)
	}
)

export default DropTarget(
	ItemTypes.CARD,
	{
		hover(props, monitor, component) {
			if (!component) {
				return null
			}
			// node = HTML Div element from imperative API
			const node = component.getNode()
			if (!node) {
				return null
			}
			const dragIndex = monitor.getItem().index
			const hoverIndex = props.index
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}
			// Determine rectangle on screen
			const hoverBoundingRect = node.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			// Time to actually perform the action
			props.moveCard(dragIndex, hoverIndex)
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex
		}
	},
	connect => ({
		connectDropTarget: connect.dropTarget()
	})
)(
	DragSource(
		ItemTypes.CARD,
		{
			beginDrag: props => ({
				id: props.id,
				index: props.index
			}),
			endDrag(props, monitor) {
				if (!monitor.didDrop()) {
					return
				}

				// When dropped on a compatible target, do something
				const item = monitor.getItem()
				props.onReorder(item.id, item.index)
			}
		},
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging()
		})
	)(DndCard)
)

DndCard.propTypes = {
	text: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
	matches: PropTypes.bool.isRequired,
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	openDetailsModal: PropTypes.func.isRequired,
	openEditModal: PropTypes.func.isRequired,
	onReorder: PropTypes.func.isRequired,
	TableItemComp: PropTypes.string.isRequired
}
