import { combineReducers } from 'redux'
import {
	INVALIDATE_DATA,
	REQUEST_DATA,
	RECEIVE_DATA,
	UPDATE_START_Z,
	UPDATE_END_Z,
	UPDATE_PROJECT,
	UPDATE_STACK,
	UPDATE_MATCH_COLLECTION,
	UPDATE_TILE_DATA,
	UPDATE_PME_VARIABLES
} from '../actions'

const dataInitialState = {
	isFetching: false,
	didInvalidate: false,
	data: {}
}

const userInputInitialState = {
	selectedProject: null,
	selectedStack: null,
	selectedMatchCollection: null,
	startZ: null,
	endZ: null
}

const PMEVariablesInitialState = {
   minWeight: null,
   maxWeight: null,
   mouseoverMetadata: null,
   selectedMetadata: null,
   isShiftDown: false,
   isCtrlDown: false,
   isMetaDown: false,
	 rendered: false
}

function UserInput(state = userInputInitialState, action){
	switch (action.type) {
    case UPDATE_START_Z:
      return Object.assign({}, state, {
	        startZ: action.zValue
	    })
		case UPDATE_END_Z:
			return Object.assign({}, state, {
	        endZ: action.zValue
	    })
		case UPDATE_PROJECT:
			return Object.assign({}, state, {
					selectedProject: action.project
			})
		case UPDATE_STACK:
			return Object.assign({}, state, {
					selectedStack: action.stack
			})
		case UPDATE_MATCH_COLLECTION:
			return Object.assign({}, state, {
					selectedMatchCollection: action.matchCollection
			})
    default:
      return state
  }
}

function getData(state = dataInitialState, action){
	switch (action.type) {
		case INVALIDATE_DATA:
			return Object.assign({}, state, {
					didInvalidate: true
				})
		case REQUEST_DATA:
			 return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case RECEIVE_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				data: action.data
			})
		default:
			return state
	}
}

function APIData(state = {}, action){
  switch (action.type) {
    case INVALIDATE_DATA:
		case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
				 [action.dataType] : getData(state[action.dataType], action)
      })
    default:
      return state
  }
}

function tileData(state = {}, action){
	switch (action.type) {
		case UPDATE_TILE_DATA:
			return action.tileData
		default:
			return state
	}
}

function PMEVariables(state = PMEVariablesInitialState, action){
	switch (action.type) {
		case UPDATE_PME_VARIABLES:
			return Object.assign({}, state, action.PMEVariables)
		default:
			return state
	}
}

const pmeApp = combineReducers({
	UserInput,
	APIData,
	tileData,
	PMEVariables
})

export default pmeApp
