import React, { useEffect, useState } from 'react';
import { Button, Image, Input, Row, Col } from 'antd';

const GRID_SIZE = 10;
const IMAGE_SIZE = 100;

const ObjectForm = ({ selectedObject, onSave, onDelete }) => {
	const [formData, setFormData] = useState(selectedObject || {});
	
	useEffect(() => {
		setFormData(selectedObject || {});
	}, [selectedObject]);
	
	const handleInputChange = (key, value) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};
	
	const handleSave = () => {
		onSave(formData);
	};
	
	const handleDelete = () => {
		onDelete(selectedObject.id);
	};
	
	return (
		<div>
			<h3>Edit Object</h3>
			<div>
				<label>X:</label>
				<Input
					type="number"
					value={formData.x}
					onChange={(e) => handleInputChange('x', e.target.value)}
				/>
			</div>
			<div>
				<label>Y:</label>
				<Input
					type="number"
					value={formData.y}
					onChange={(e) => handleInputChange('y', e.target.value)}
				/>
			</div>
			<div>
				<label>Rotation:</label>
				<Input
					type="number"
					value={formData.rotation}
					onChange={(e) => handleInputChange('rotation', e.target.value)}
				/>
			</div>
			<div>
				<label>Width:</label>
				<Input
					type="number"
					value={formData.width}
					onChange={(e) => handleInputChange('width', e.target.value)}
				/>
			</div>
			<div>
				<label>Height:</label>
				<Input
					type="number"
					value={formData.height}
					onChange={(e) => handleInputChange('height', e.target.value)}
				/>
			</div>
			<div>
				<label>Layer:</label>
				<Input
					type="number"
					value={formData.layer}
					onChange={(e) => handleInputChange('layer', e.target.value)}
				/>
			</div>
			<Button type="primary" onClick={handleSave}>
				Save
			</Button>
			<Button type="danger" onClick={handleDelete}>
				Delete
			</Button>
		</div>
	);
};

const Planner = () => {
	const [objects, setObjects] = useState([
		{
			id: 1,
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
			id: 3,
			type: 'partition',
			image: '/img/planner/chair.png',
			width: IMAGE_SIZE,
			height: IMAGE_SIZE,
			rotation: 0,
			layer: 1,
		},
	]);
	
	const [boardObjects, setBoardObjects] = useState([]);
	const [selectedSection, setSelectedSection] = useState('table');
	const [selectedObject, setSelectedObject] = useState(null);
	
	const updateBoardObjects = (updatedObjects) => {
		setBoardObjects(updatedObjects);
		setObjects((prevObjects) =>
			prevObjects.map((obj) =>
				updatedObjects.find((uObj) => uObj.id === obj.id) || obj
			)
		);
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
			JSON.stringify({ ...object, offsetX, offsetY, index })
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
			Math.max(
				Math.floor((offsetX - droppedObject.offsetX) / GRID_SIZE) * GRID_SIZE,
				0
			),
			boardRect.width - GRID_SIZE
		);
		const deltaY = Math.min(
			Math.max(
				Math.floor((offsetY - droppedObject.offsetY) / GRID_SIZE) * GRID_SIZE,
				0
			),
			boardRect.height - GRID_SIZE
		);
		
		if (droppedObject.index !== undefined) {
			moveObject(droppedObject.index, deltaX, deltaY);
			resizeObject(droppedObject.index, IMAGE_SIZE, IMAGE_SIZE);
			changeLayer(droppedObject.index, 1);
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
		setObjects((prevObjects) =>
			prevObjects.map((obj) =>
				obj.id === selectedObject.id ? { ...obj, ...updatedData } : obj
			)
		);
		
		if (boardObjects.some((obj) => obj.id === selectedObject.id)) {
			setBoardObjects((prevObjects) =>
				prevObjects.map((obj) =>
					obj.id === selectedObject.id ? { ...obj, ...updatedData } : obj
				)
			);
		}
		
		setSelectedObject({ ...selectedObject, ...updatedData });
	};
	
	const deleteObject = (objectId) => {
		setBoardObjects((prevObjects) =>
			prevObjects.filter((obj) => obj.id !== objectId)
		);
		setObjects((prevObjects) =>
			prevObjects.filter((obj) => obj.id !== objectId)
		);
		setSelectedObject(null);
	};
	
	return (
		<div style={{ overflow: 'hidden' }}>
			<Row gutter={GRID_SIZE}>
				<Col span={6} style={{ padding: '8px' }}>
					<div className="section-buttons" style={{ marginBottom: '8px' }}>
						<Button onClick={() => setSelectedSection('table')}>Tables</Button>
						<Button onClick={() => setSelectedSection('chair')}>Chairs</Button>
						<Button onClick={() => setSelectedSection('partition')}>Partitions</Button>
					</div>
					<div
						className="object-list"
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}
					>
						{filterObjectsByType(selectedSection).map((object) => (
							<div
								key={object.id}
								onDragStart={(e) => dragStartHandler(e, object)}
								draggable
								className="object-item"
								style={{ marginBottom: '8px' }}
							>
								<Image
									src={object.image}
									alt={object.type}
									style={{
										width: IMAGE_SIZE,
										height: IMAGE_SIZE,
										userSelect: 'none',
										cursor: 'grab',
									}}
									draggable={false}
								/>
							</div>
						))}
						<ObjectForm
							selectedObject={selectedObject}
							onSave={saveObjectChanges}
							onDelete={deleteObject}
						/>
					</div>
				</Col>
				<Col span={18}>
					<div
						className="board-container"
						style={{
							overflow: 'hidden',
							position: 'relative',
							maxWidth: '100%',
							height: '400px', // Уменьшаем высоту контейнера
							border: '1px solid #ccc',
						}}
					>
						<div
							className="board"
							onDragOver={(e) => dragOverHandler(e)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDrop={(e) => dropHandler(e)}
							onClick={() => setSelectedObject(null)}
							style={{
								background:
									'repeating-linear-gradient(0 10px, transparent 10px, lightgray 10px), repeating-linear-gradient(90deg 10px, transparent 10px, lightgray 10px)',
								width: '100%',
								height: '100%',
								position: 'absolute',
								top: '0',
								left: '0',
							}}
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
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									padding: '10px',
									background: '#fff',
									border: '1px solid #ccc',
								}}
							>
								{/* Дополнительные настройки для выбранного объекта */}
							</div>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Planner;
