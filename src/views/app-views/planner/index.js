import React, {useEffect, useState} from 'react';
import {Button, Col, Image, Row} from 'antd';
import ObjectForm from './ObjectForm';
import './styles/planner.css';

const GRID_SIZE = 10;
const IMAGE_SIZE = 50;

const Planner = () => {
	const objects = [
		{
			id: 11,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 111,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 1112,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 11122,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 111223,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 111223444,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 11122344444555,
			type: 'table',
			image: '/img/planner/6th.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 2,
			type: 'chair',
			image: '/img/planner/partition.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 25,
			type: 'decor',
			image: '/img/planner/partition.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 30,
			type: 'greenery',
			image: '/img/planner/partition.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 22,
			type: 'chair',
			image: '/img/planner/partition.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 23,
			type: 'chair',
			image: '/img/planner/partition.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
		{
			id: 3,
			type: 'partition',
			image: '/img/planner/chair.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
	];
	
	const [boardObjects, setBoardObjects] = useState([]);
	const [selectedSection, setSelectedSection] = useState('table');
	const [selectedObject, setSelectedObject] = useState(null);
	const [addedObject, setAddedObject] = useState(null);
	
	const clearBoard = () => {
		setBoardObjects([]);
		setSelectedObject(null);
		setAddedObject(null);
	};
	
	useEffect(() => {
		if (addedObject) {
			setBoardObjects((prevObjects) => [...prevObjects, addedObject]);
			setAddedObject(null);
		}
	}, [addedObject]);
	
	const updateBoardObjects = (updatedObjects) => {
		setBoardObjects(updatedObjects);
	};
	
	const moveObject = (index, deltaX, deltaY) => {
		setBoardObjects((prevObjects) => {
			const updatedObjects = [...prevObjects];
			updatedObjects[index].x = deltaX;
			updatedObjects[index].y = deltaY;
			return updatedObjects;
		});
	};
	
	const resizeObject = (index, width, height) => {
		setBoardObjects((prevObjects) => {
			const updatedObjects = [...prevObjects];
			updatedObjects[index].width = width;
			updatedObjects[index].height = height;
			return updatedObjects;
		});
	};
	
	const changeLayer = (index, newLayer) => {
		setBoardObjects((prevObjects) => {
			const updatedObjects = [...prevObjects];
			updatedObjects[index].layer = newLayer;
			return updatedObjects;
		});
	};
	
	const dragStartHandler = (e, object, index) => {
		const { offsetX, offsetY } = e.nativeEvent;
		e.dataTransfer.setData(
			'object',
			JSON.stringify({
				...object,
				offsetX,
				offsetY,
				index
			})
		);
	};
	
	const dropHandler = (e) => {
		e.preventDefault();
		const droppedObject = JSON.parse(e.dataTransfer.getData('object'));
		const { pageX, pageY } = e;
		
		const boardRect = e.target.getBoundingClientRect();
		const offsetX = pageX - boardRect.left;
		const offsetY = pageY - boardRect.top;
		
		const deltaX = Math.min(
			Math.max(Math.floor((offsetX - droppedObject.offsetX) / GRID_SIZE) * GRID_SIZE, 0),
			boardRect.width - GRID_SIZE
		);
		const deltaY = Math.min(
			Math.max(Math.floor((offsetY - droppedObject.offsetY) / GRID_SIZE) * GRID_SIZE, 0),
			boardRect.height - GRID_SIZE
		);
		
		if (droppedObject.index !== undefined) {
			const updatedObjects = boardObjects.map((obj, index) =>
				index === droppedObject.index
					? {
						...obj,
						x: deltaX,
						y: deltaY,
					}
					: obj
			);
			
			moveObject(droppedObject.index, deltaX, deltaY);
			resizeObject(droppedObject.index, IMAGE_SIZE, IMAGE_SIZE);
			changeLayer(droppedObject.index, 1);
			
			updateBoardObjects(updatedObjects);
		} else {
			const newId = Math.max(...boardObjects.map((obj) => obj.id), 0) + 1;
			setBoardObjects((prevObjects) => [
				...prevObjects,
				{
					...droppedObject,
					id: newId,
					x: deltaX,
					y: deltaY,
					rotation: 0,
					width: IMAGE_SIZE,
					height: IMAGE_SIZE,
					layer: 1,
				},
			]);
		}
	};
	
	const deleteObject = (objectId) => {
		setBoardObjects((prevObjects) =>
			prevObjects.filter((obj) => obj.id !== objectId)
		);
		setSelectedObject(null);
	};
	
	const dragEndHandler = (e) => {
		e.target.style.background = 'none';
	};
	
	const dragOverHandler = (e) => {
		e.preventDefault();
		if (e.target.className === 'board') {
			e.target.style.background = 'lightgray';
		}
	};
	
	const dragLeaveHandler = (e) => {
		e.target.style.background = 'none';
	};
	
	const rotateObject = (index) => {
		setBoardObjects((prevObjects) => {
			const updatedObjects = [...prevObjects];
			updatedObjects[index].rotation = (updatedObjects[index].rotation + 90) % 360;
			return updatedObjects;
		});
	};
	
	const filterObjectsByType = (type) => {
		return objects.filter((object) => object.type === type);
	};
	
	const selectObject = (object) => {
		setSelectedObject(object);
	};
	
	const saveObjectChanges = (updatedData) => {
		if (selectedObject) {
			const updatedObjects = boardObjects.map((obj) =>
				obj.id === selectedObject.id ? { ...obj, ...updatedData } : obj
			);
			
			setBoardObjects(updatedObjects);
			setSelectedObject({ ...selectedObject, ...updatedData });
		} else if (addedObject) {
			setBoardObjects((prevObjects) => {
				return prevObjects.map((obj) =>
					obj.id === addedObject.id ? addedObject : obj
				);
			});
			setAddedObject(null);
		}
	};
	
	return (
		<div className="planner-container">
			<Row gutter={GRID_SIZE}>
				<Col span={6}>
					<div className="section-buttons">
						<Button onClick={() => setSelectedSection('table')}>Tables</Button>
						<Button onClick={() => setSelectedSection('chair')}>Chairs</Button>
						<Button onClick={() => setSelectedSection('partition')}>Partitions</Button>
						<Button onClick={() => setSelectedSection('decor')}>Decor</Button>
						<Button onClick={() => setSelectedSection('greenery')}>Chairs</Button>
					</div>
					<div className="object-list__wrapper">
						<div className="object-list">
							{filterObjectsByType(selectedSection).map((object) => (
								<div
									key={object.id}
									onDragStart={(e) => dragStartHandler(e, object)}
									draggable
									className="object-item"
								>
									<Image
										src={object.image}
										alt={object.type}
										draggable={false}
									/>
								</div>
							))}
						</div>
						<ObjectForm
							selectedObject={selectedObject}
							onSave={saveObjectChanges}
							onDelete={deleteObject}
							onClearBoard={clearBoard}
						/>
					</div>
				</Col>
				<Col span={18}>
					<div className="board-container">
						<div
							className="board"
							onDragOver={(e) => dragOverHandler(e)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDrop={(e) => dropHandler(e)}
							onClick={() => setSelectedObject(null)}
						>
							{boardObjects.map((object, index) => (
								<div
									key={object.id}
									style={{
										position: 'absolute',
										left: object.x,
										top: object.y,
										width: object.width,
										height: object.height,
										boxSizing: 'border-box',
										transform: `rotate(${object.rotation}deg)`,
										zIndex: object.layer,
									}}
									onClick={(e) => {
										e.stopPropagation();
										selectObject(object);
									}}
									onDoubleClick={(e) => {
										e.stopPropagation();
										rotateObject(index);
									}}
									onDragStart={(e) => dragStartHandler(e, object, index)}
									onDragEnd={(e) => dragEndHandler(e)}
									draggable
									className="board-object"
								>
									<Image
										preview={false}
										src={object.image}
										alt={object.type}
										style={{ width: object.width, height: object.height, userSelect: 'none' }}
										draggable={true}
									/>
								</div>
							))}
						</div>
						{selectedObject && (
							<div
								className="selected-object-settings"
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									padding: '10px',
									background: '#fff',
									border: '1px solid #ccc',
								}}
							>
								{/* Additional settings for the selected object */}
							</div>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Planner;
