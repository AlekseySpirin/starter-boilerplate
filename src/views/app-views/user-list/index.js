import React, {Component} from 'react';
import {Button, Card, message, Table, Tooltip} from 'antd';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import axios from 'axios';
import UserView from './UserView';
import Loading from 'components/shared-components/Loading/index.js';

export class UserList extends Component {
	state = {
		users: [],
		userProfileVisible: false,
		selectedUser: null,
		loading: true, // Add loading state
	};
	
	componentDidMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				this.setState({
					users: response.data,
					loading: false
				});
			})
			.catch((error) => {
				console.error('Ошибка при получении пользователей:', error);
				this.setState({loading: false});
			});
	}
	
	deleteUser = (userId) => {
		this.setState({
			users: this.state.users.filter((item) => item.id !== userId),
		});
		message.success({
			content: `Пользователь ${userId} удален`,
			duration: 2,
		});
	};
	
	showUserProfile = (userInfo) => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo,
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null,
		});
	};
	
	render() {
		const {
			users,
			userProfileVisible,
			selectedUser,
			loading
		} = this.state;
		
		// Display Loading component while fetching users
		if (loading) {
			return <Loading/>;
		}
		
		const columns = Object.keys(users.length > 0 ? users[0] : {}).map((key) => {
			if (key === 'address') {
				return {
					title: 'Адрес',
					dataIndex: 'address',
					key: 'address',
					render: (address) => address?.city,
				};
			} else if (key === 'company') {
				return {
					title: 'Компания',
					dataIndex: 'company',
					key: 'company',
					render: (company) => company?.name,
				};
			} else if (key !== 'id') {
				return {
					title: key.charAt(0).toUpperCase() + key.slice(1),
					dataIndex: key,
					key,
					sorter: (a, b) => a[key] - b[key],
				};
			}
			return null;
		}).filter((column) => column !== null);
		
		columns.push({
			title: 'Действия',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Tooltip title="Просмотр">
						<Button
							type="primary"
							className="mr-2"
							icon={<EyeOutlined/>}
							onClick={() => {
								this.showUserProfile(elm);
							}}
							size="small"
						/>
					</Tooltip>
					<Tooltip title="Удаление">
						<Button
							danger
							icon={<DeleteOutlined/>}
							onClick={() => {
								this.deleteUser(elm.id);
							}}
							size="small"
						/>
					</Tooltip>
				</div>
			),
		});
		
		return (
			<Card bodyStyle={{padding: '0px'}}>
				<Table columns={columns} dataSource={users} rowKey="id"/>
				<UserView data={selectedUser} visible={userProfileVisible}
				          close={this.closeUserProfile}/>
			</Card>
		);
	}
}

export default UserList;
