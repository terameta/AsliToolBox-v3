import { TagState, FEATURE, initialState } from './tags.state';
import { ReducingAction } from 'src/app/shared/reducingaction.model';

export function tagReducer( state: TagState = initialState(), action: ReducingAction ) {
	return action.feature === FEATURE && typeof action.reducer === 'function' ? action.reducer( state ) : state;
}
