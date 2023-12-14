import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import './styles/objectForm.css'



const IMAGE_SIZE = 50;

const ObjectForm = (props) => {
	const [x, setX] = useState(props.selectedObject ? props.selectedObject.x : 0);
	const [y, setY] = useState(props.selectedObject ? props.selectedObject.y : 0);
	const [rotation, setRotation] = useState(props.selectedObject ? props.selectedObject.rotation : 0);
	const [width, setWidth] = useState(props.selectedObject ? props.selectedObject.width : IMAGE_SIZE);
	const [height, setHeight] = useState(props.selectedObject ? props.selectedObject.height : IMAGE_SIZE);
	const [layer, setLayer] = useState(props.selectedObject ? props.selectedObject.layer : 1);
	
	const isObjectOnBoard = !!props.selectedObject?.id;
	
	useEffect(() => {
		setX(props.selectedObject ? props.selectedObject.x : 0);
		setY(props.selectedObject ? props.selectedObject.y : 0);
		setRotation(props.selectedObject ? props.selectedObject.rotation : 0);
		setWidth(props.selectedObject ? props.selectedObject.width : IMAGE_SIZE);
		setHeight(props.selectedObject ? props.selectedObject.height : IMAGE_SIZE);
		setLayer(props.selectedObject ? props.selectedObject.layer : 1);
	}, [props.selectedObject]);
	
	const handleSave = () => {
		props.onSave({
			x,
			y,
			rotation,
			width,
			height,
			layer,
		});
	};
	
	const handleDelete = () => {
		props.onDelete(props.selectedObject.id);
	}
		const handleClearBoard = () => {
			props.onClearBoard();
		};
		
		return (
			<div className="object-form">
				<h3>Edit Object</h3>
				<div>
					<label>X:</label>
					<Input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value, 10))} />
				</div>
				<div>
					<label>Y:</label>
					<Input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value, 10))} />
				</div>
				<div>
					<label>Rotation:</label>
					<Input type="number" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value, 10))} />
				</div>
				<div>
					<label>Width:</label>
					<Input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} />
				</div>
				<div>
					<label>Height:</label>
					<Input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
				</div>
				<div>
					<label>Layer:</label>
					<Input type="number" value={layer} onChange={(e) => setLayer(parseInt(e.target.value, 10))} />
				</div>
				<div className="buttons__container">
					<Button type="primary" onClick={handleSave}>
						Save
					</Button>
					<Button type="danger" onClick={handleClearBoard}>
						Clear Board
					</Button>
					<Button type="danger" onClick={handleDelete} disabled={!isObjectOnBoard}>
						Delete
					</Button>
				</div>
			</div>
		);
	};
	
	export default ObjectForm;
