import React, { Component } from 'react';
import { Button, Card, message, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import UserView from './UserView';
import Loading from 'components/shared-components/Loading/index.js';
import UserService from 'services/UserService';
import { Link } from 'react-router-dom';

class UserList extends Component {
	state = {
		users: [],
		userProfileVisible: false,
		selectedUser: null,
		loading: true,
	};
	
	componentDidMount() {
		this.fetchUsers();
	}
	
	async fetchUsers() {
		try {
			const users = await UserService.getUsers();
			this.setState({
				users,
				loading: false,
			});
		} catch (error) {
			console.error('Error fetching users:', error);
			this.setState({ loading: false });
		}
	}
	
	deleteUser = (userId) => {
		this.setState({
			users: this.state.users.filter((item) => item.id !== userId),
		});
		message.success({
			content: `User ${userId} deleted`,
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
		const { users, userProfileVisible, selectedUser, loading } = this.state;
		
		if (loading) {
			return <Loading />;
		}
		
		const columns = Object.keys(users.length > 0 ? users[0] : {}).map((key) => {
			if (key === 'address') {
				return {
					title: 'Address',
					dataIndex: 'address',
					key: 'address',
					render: (address) => address?.city,
				};
			} else if (key === 'company') {
				return {
					title: 'Company',
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
			title: 'Actions',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Tooltip title="View">
						<Button
							type="primary"
							className="mr-2"
							icon={<EyeOutlined />}
							onClick={() => {
								this.showUserProfile(elm);
							}}
							size="small"
						/>
					</Tooltip>
					<Link to={`/app/main/clients/edit/${elm.id}`}>
						<Button
							type="primary"
							className="mr-2"
							icon={<EditOutlined />}
							size="small"
						>
							Edit
						</Button>
					</Link>
					<Tooltip title="Delete">
						<Button
							danger
							icon={<DeleteOutlined />}
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
			<Card bodyStyle={{ padding: '0px' }}>
				<Table columns={columns} dataSource={users} rowKey="id" />
				<UserView data={selectedUser} visible={userProfileVisible} close={this.closeUserProfile} />
			</Card>
		);
	}
}

export default UserList;
