import { createContext } from 'react';
import Home from '../Home';
import PureComponentExp from '../components/PureComponentExp';
import Memo from '../components/Memo';
import UseMemoHooks from '../components/UseMemoHooks';
import ContextTest from '../components/ContextTest'
import CountComponent from '../components/CountComponent';
import CallbackCompnent from '../components/CallbackCompnent';
import InputWithRef from '../components/InputWithRef';
import ForwardRefComponent from '../components/ForwardRefComponent';
import DataFetchingExample from '../components/DataFetchingExample'

// react insect catching game
import InsectCatchingGame from '../components/insectCatchingGame/index';

// movie
import OMDBMovie from '../components/OMDBMovie/index';
import MoviePage from '../components/OMDBMovie/MoviePage';
import Timer from '../components/Timer/Timer';

// auto complete
import AutoComplete from '../components/AutoComplete/index';

// reducx implementation
import Todo from '../components/ReduxImplementation/Todo';

// use effect test
import UseEffectTest from '../components/UseEffectTest';
import UseSafeSetState from '../components/UseSafeSetState';
import UsePrevious from '../components/UsePrevious';
import UseToggle from '../components/UseToggle';
import UseMemoCompare from '../components/UseMemoCompare';

import UseLayoutEffectTest from '../components/UseLayoutEffectTest';


// use interseciton observer
import IntersectionObserver from '../components/IntersectionObserver';

const routeConfig = [
	{
		path: '/use-memo-compare',
		component: 'UseMemoCompare',
		name: 'use memo compare'
	},
	{
		path: '/use-toggle',
		component: 'UseToggle',
		name: 'use toggle'
	},
	{
		path: '/use-previous',
		component: 'UsePrevious',
		name: 'use previous'
	},
	{
		path: '/use-intersection-observer',
		component: 'IntersectionObserver',
		name: 'use intersectoin observer'
	},
	{
		path: '/use-layout-effect-test',
		component: 'UseLayoutEffectTest',
		name: 'use effect vs use layout effect'
	},
	{
		path: '/use-safe-set-state',
		component: 'UseSafeSetState',
		name: 'use safe set state'
	},
	{
		path: '/use-effect-test',
		component: 'UseEffectTest',
		name: 'combine clear effect and effect together'
	},
	{
		path: '/todo-testing',
		component: 'Todo',
		name: 'implement redux'
	},
	{
		path: '/auto-complete',
		component: 'AutoComplete',
		name: 'auto complete input'
	},
	{
		path: '/timer',
		component: 'Timer',
		name: 'timer component'
	},
	{
		path: '/movies/:params',
		component: 'MoviePage',
		name: 'singe movie page'
	},
	{
		path: '/omdb-movie',
		component: 'OMDBMovie',
		name: 'omdb movie'
	},
	{
		path: '/insect-catching',
		component: 'InsectCatchingGame',
		name: 'insect catching game'
	},
	{
		path: '/data-fetching',
		component: 'DataFetchingExample',
		name: 'data fetching component'
	},
	{
		path: '/forward-ref',
		component: 'ForwardRefComponent',
		name: 'forward ref'
	},
	{
		path: '/create-ref',
		component: 'InputWithRef',
		name: 'create ref'
	},
	{
		path: '/use-callback',
		component: 'CallbackCompnent',
		name: 'use callback'
	},
	{
		path: '/use-reducer',
		component: 'CountComponent',
		name: 'use reducer page'
	},
	{
		path: '/context-text',
		component: 'ContextTest',
		name: 'Context test page'
	},
	{
		path: '/pure-component',
		component: 'PureComponentExp',
		name: 'Pure comonent'
	},
	{
		path: '/memo',
		component: 'Memo',
		name: 'React Memo'
	},
	{
		path: '/useMmeo',
		component: 'UseMemoHooks',
		name: 'use Memo Hooks'
	},
	{
		path: '/',
		component: 'Home',
		name: 'Home page'
	}
];

export const routesMap = {
	UseMemoCompare,
	IntersectionObserver,
	Home,
	PureComponentExp,
	Memo,
	UseMemoHooks,
	ContextTest,
	CountComponent,
	CallbackCompnent,
	InputWithRef,
	ForwardRefComponent,
	DataFetchingExample,
	InsectCatchingGame,
	OMDBMovie,
	MoviePage,
	Timer,
	AutoComplete,
	Todo,
	UseEffectTest,
	UseSafeSetState,
	UseLayoutEffectTest,
	UsePrevious,
	UseToggle
}

export const RoutesContext = createContext(routeConfig);

export default routeConfig;
