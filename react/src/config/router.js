import React from 'react';
import { Route, IndexRoute } from 'react-router';



const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ Login } />
	</Route>
);

export default routes;