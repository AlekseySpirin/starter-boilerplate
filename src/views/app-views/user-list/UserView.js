import React, { Component } from 'react';
import { Avatar, Divider, Drawer } from 'antd';
import { MobileOutlined, MailOutlined, CompassOutlined } from '@ant-design/icons';

export class UserView extends Component {
	render() {
		const { data, visible, close } = this.props;
		const { address = {}, company = {} } = data || {};
		
		return (
			<Drawer width={300} placement="right" onClose={close} closable={false} visible={visible}>
				<div className="text-center mt-3">
					<Avatar size={80} src={data?.img} />
					<h3 className="mt-2 mb-0">{data?.name}</h3>
					<span className="text-muted">Username: {data?.username}</span>
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Account Details</h6>
					<p>
						<span className="ml-3 text-dark">Company: {company.name}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Contacts</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.phone}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email}</span>
					</p>
					<p>
						<CompassOutlined />
						<span className="ml-3 text-dark">{`${address?.city}, Geolocation ${address?.geo?.lat}, ${address?.geo?.lng}, Zip Code ${address.zipcode}`}</span>
					</p>
				</div>
			</Drawer>
		);
	}
}

export default UserView;
