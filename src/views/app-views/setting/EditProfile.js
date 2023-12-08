import React, {Component} from 'react';
import {Button, Form, Input, message} from 'antd';
import UserService from 'services/UserService';
import {withRouter} from 'react-router-dom';

class EditProfile extends Component {
	state = {
		avatarUrl: '',
		name: '',
		email: '',
		userName: '',
		dateOfBirth: null,
		phoneNumber: '',
		website: '',
		address: '',
		city: '',
		postcode: '',
	};
	
	formRef = React.createRef();
	
	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	
	async componentDidMount() {
		const {match} = this.props;
		const userId = match.params.userId;
		try {
			const user = await UserService.getUserById(userId);
			this.setState(
				{
					name: user.name || '',
					email: user.email || '',
					userName: user.username || '',
					phoneNumber: user.phone || '',
					website: user.website || '',
					address: user.address.city || '',
					avatarUrl: user.avatarUrl || '',
				},
				() => {
					// Set the initial values for the form after updating the state
					this.formRef.current.setFieldsValue({
						name: this.state.name,
						email: this.state.email,
						userName: this.state.userName,
						phoneNumber: this.state.phoneNumber,
						website: this.state.website,
						address: this.state.address,
					});
				}
			);
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	}
	
	onFinish = (values) => {
		const key = 'updatable';
		message.loading({
			content: 'Updating...',
			key,
		});
		setTimeout(() => {
			this.setState({
				name: values.name || '',
				email: values.email || '',
				userName: values.userName || '',
				phoneNumber: values.phoneNumber || '',
				website: values.website || '',
				address: values.address || '',
			});
			message.success({
				content: 'Done!',
				key,
				duration: 1,
			});
			
			const {history} = this.props;
			history.push('/app/main/clients/list');
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
				duration: 1000,
			});
			return;
		}
		if (info.file.status === 'done') {
			this.getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({
					avatarUrl: imageUrl,
				})
			);
			message.success({
				content: 'Uploaded!',
				key,
				duration: 1.5,
			});
		}
	};
	
	onRemoveAvatar = () => {
		this.setState({
			avatarUrl: '',
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
		} = this.state;
		
		return (
			<div className="mt-4">
				<Form
					name="basicInformation"
					layout="vertical"
					initialValues={{
						name,
						email,
						userName,
						dateOfBirth,
						phoneNumber,
						website,
						address,
						city,
						postcode,
					}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					ref={this.formRef}
				>
					<Form.Item label="Name" name="name">
						<Input/>
					</Form.Item>
					<Form.Item label="Email" name="email">
						<Input/>
					</Form.Item>
					<Form.Item label="Username" name="userName">
						<Input/>
					</Form.Item>
					<Form.Item label="Phone Number" name="phoneNumber">
						<Input/>
					</Form.Item>
					<Form.Item label="Website" name="website">
						<Input/>
					</Form.Item>
					<Form.Item label="Address" name="address">
						<Input/>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form>
			</div>
		);
	}
}

export default withRouter(EditProfile);
