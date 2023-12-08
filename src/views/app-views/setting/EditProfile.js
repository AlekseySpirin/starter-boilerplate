import React, {Component} from 'react';
import {Avatar, Button, Form, message, Upload} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import UserService from 'services/UserService';

class EditProfile extends Component {
	state = {
		avatarUrl: '/img/avatars/thumb-6.jpg',
		name: 'Charlie Howard',
		email: 'charlie.howard@themenate.com',
		userName: 'Charlie',
		dateOfBirth: null,
		phoneNumber: '+44 (1532) 135 7921',
		website: '',
		address: '',
		city: '',
		postcode: ''
	};
	
	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	
	componentDidMount() {
		const {match} = this.props;
		const userId = match.params.userId;
		UserService.getUserById(userId)
			.then((user) => {
				this.setState({
					name: user.name,
					email: user.email,
					userName: user.username,
					dateOfBirth: user.dateOfBirth,
					phoneNumber: user.phoneNumber,
					website: user.website,
					address: user.address,
					city: user.city,
					postcode: user.postcode,
					avatarUrl: user.avatarUrl,
				});
			})
			.catch((error) => {
				console.error('Ошибка при получении данных пользователя:', error);
			});
	}
	
	onFinish = (values) => {
		const key = 'updatable';
		message.loading({
			content: 'Updating...',
			key
		});
		setTimeout(() => {
			this.setState({
				name: values.name,
				email: values.email,
				userName: values.userName,
				dateOfBirth: values.dateOfBirth,
				phoneNumber: values.phoneNumber,
				website: values.website,
				address: values.address,
				city: values.city,
				postcode: values.postcode,
			});
			message.success({
				content: 'Done!',
				key,
				duration: 2
			});
		}, 1000);
	};
	
	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	onUploadAvatar = (info) => {
		const key = 'updatable';
		if (info.file.status === 'uploading') {
			message.loading({
				content: 'Uploading...',
				key,
				duration: 1000
			});
			return;
		}
		if (info.file.status === 'done') {
			this.getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					avatarUrl: imageUrl,
				}),
			);
			message.success({
				content: 'Uploaded!',
				key,
				duration: 1.5
			});
		}
	};
	
	onRemoveAvatar = () => {
		this.setState({
			avatarUrl: ''
		});
	};
	
	render() {
		const {
			name,
			email,
			userName,
			dateOfBirth,
			phoneNumber,
			website,
			address,
			city,
			postcode,
			avatarUrl
		} = this.state;
		
		return (
			<>
				<Flex alignItems="center" mobileFlex={false}
				      className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined/>}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={this.onUploadAvatar} showUploadList={false}
						        action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2"
						        onClick={this.onRemoveAvatar}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={{
							'name': name,
							'email': email,
							'userName': userName,
							'dateOfBirth': dateOfBirth,
							'phoneNumber': phoneNumber,
							'website': website,
							'address': address,
							'city': city,
							'postcode': postcode
						}}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						{/* (ваш код формы) */}
					</Form>
				</div>
			</>
		);
	}
}

export default EditProfile;
