import { JSONDeepCopy } from 'shared/utilities/utility.functions';

export const FEATURE = '[SHARED]';

export interface SharedState {
	interests: Interest[],
	selectedTags: any,
	autoShowNotifications: boolean,
	autoShowNotificationsOnlyError: boolean,
	currentFeature: string,
	currentID: number,
	currentURL: string
}

const baseSharedState: SharedState = {
	interests: [],
	selectedTags: {},
	autoShowNotifications: false,
	autoShowNotificationsOnlyError: false,
	currentFeature: null,
	currentID: null,
	currentURL: null
};

export const initialSharedState = (): SharedState => {
	return {
		...JSONDeepCopy( baseSharedState ),
		...{
			autoShowNotifications: !!JSON.parse( localStorage.getItem( 'autoShowNotifications' ) ),
			autoShowNotificationsOnlyError: !!JSON.parse( localStorage.getItem( 'autoShowNotificationsOnlyError' ) )
		}
	};
};

export type Interest = 'environments' | 'streams' | 'maps' | 'matrices' | 'schedules' | 'processes' | 'asyncbr' | 'settings' | 'secrets' | 'credentials' | 'tags' | 'taggroups' | 'users';
