import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export const AppViews = () => {
	return (
		<Suspense fallback={<Loading cover="content" />}>
			<Switch>
				<Route path={`${APP_PREFIX_PATH}/main/clients/list`} component={lazy(() => import(`./user-list`))} />
				<Route path={`${APP_PREFIX_PATH}/main/clients/edit/:userId`} component={lazy(() => import(`./setting/EditProfile.js`))} />
				<Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
				<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
			</Switch>
		</Suspense>
	);
};

export default React.memo(AppViews);
