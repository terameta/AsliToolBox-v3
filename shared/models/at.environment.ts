import { ConnectionPool } from 'mssql';
import { CookieJar } from 'request';
import { JSONDeepCopy } from '../../shared/utilities/utility.functions';

export interface ATEnvironment {
	id: number,
	name: string,
	type: number,
	server: string,
	port: string,
	verified: boolean,
	identitydomain: string,
	isSSOActive: string,
	credential: number,
	tags: { [key: number]: boolean },
	SID: string,
	ssotoken: string,
	cookie: string
}

export interface ATEnvironmentDetail extends ATEnvironment {
	database: string,
	table: string,
	mssql: {
		connection: ConnectionPool
	},
	smartview: {
		url: string,
		nexturl: string,
		planningurl: string,
		planningserver: string,
		applications: { name: string }[],
		cubes: string[],
		dimensions: any[],
		aliastables: any[],
		memberList: any[],
		ruleList: any[],
		procedure: { name: string, type: string, hasRTP: string, variables: any[] },
		jar: CookieJar,
		form: any
	},
	pbcs: {
		address: string,
		restInitiated: boolean,
		resturl: string,
		smartviewurl: string
	},
	query: string,
	procedure: string,
	username: string,
	password: string
}

export const getDefaultATEnvironment = () => ( <ATEnvironment>JSONDeepCopy( { tags: {} } ) );

export enum ATEnvironmentType {
	'HP' = 1,
	'MSSQL' = 2,
	'PBCS' = 3,
	'ORADB' = 4
}

export function atGetEnvironmentTypeDescription( typecode: number | string ) {
	switch ( typecode ) {
		case 1:
		case '1':
		case 'HP': {
			return 'Hyperion Planning On-Premises';
		}
		case 2:
		case '2':
		case 'MSSQL': {
			return 'Microsoft SQL Server';
		}
		case 3:
		case '3':
		case 'PBCS': {
			return 'Hyperion Planning PBCS';
		}
		case 4:
		case '4':
		case 'ORADB': {
			return 'Oracle Database Server';
		}
	}
}


export const atEnvironmentPrepareToSave = ( payload: ATEnvironmentDetail ): ATEnvironmentDetail => {
	delete payload.database;
	delete payload.table;
	delete payload.mssql;
	delete payload.smartview;
	delete payload.query;
	delete payload.procedure;
	delete payload.username;
	delete payload.password;
	return payload;
};
