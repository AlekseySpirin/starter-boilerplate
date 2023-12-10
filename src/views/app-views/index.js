import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const Planner = lazy(() => import(`./planner`));
const UserList = lazy(() => import(`./user-list`));
const EditProfile = lazy(() => import(`./setting/EditProfile.js`));
const Home = lazy(() => import(`./home`));

export const AppViews = () => {
	return (
		<Suspense fallback={<Loading cover="content" />}>
			<Switch>
				<Route path={`${APP_PREFIX_PATH}/main/clients/list`} component={UserList} />
				<Route path={`${APP_PREFIX_PATH}/main/planner`} component={Planner} />
				<Route path={`${APP_PREFIX_PATH}/main/clients/edit/:userId`} component={EditProfile} />
				<Route path={`${APP_PREFIX_PATH}/home`} component={Home} />
				<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
			</Switch>
		</Suspense>
	);
};

export default React.memo(AppViews);
