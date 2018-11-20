import { MysqlConfig } from '../../shared/models/systemconfig';
import { Connection, } from 'mysql';
import * as ZongJi from 'zongji';
import { BehaviorSubject, Subject } from 'rxjs';

export class RealtimeDB {
	private includeSchemaAssigner: any = {};
	private backendDB: any;
	public changes$: BehaviorSubject<string>;
	public errors$: Subject<Error>;

	constructor( private dbConfig: MysqlConfig, serverid: number ) {

		this.includeSchemaAssigner[dbConfig.db] = true;

		this.backendSetup( serverid );
		this.changes$ = new BehaviorSubject( '' );
		this.errors$ = new Subject();
	}

	private backendSetup = ( serverid: number ) => {

		this.backendDB = new ZongJi( {
			host: this.dbConfig.host,
			port: this.dbConfig.port,
			user: this.dbConfig.user,
			password: this.dbConfig.pass,
			database: this.dbConfig.db
		} );

		this.backendDB.on( 'binlog', ( event: any ) => {
			if ( event.getEventName() !== 'tablemap' ) {
				// console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' );
				// console.log( process.pid, 'isCroner:', process.env.isCroner, 'Event Name:', event.getEventName() );
				// console.log( process.pid, 'isCroner:', process.env.isCroner, 'Table ID:', event.tableId );
				// console.log( process.pid, 'isCroner:', process.env.isCroner, event.getEventName(), 'on', event.tableMap[event.tableId].tableName );
				this.changes$.next( event.tableMap[event.tableId].tableName );
			}
		} );

		this.backendDB.on( 'acquire', ( conn: any ) => {
			console.log( 'Connection acquired', conn.threadId );
		} );

		this.backendDB.on( 'release', ( conn: any ) => {
			console.log( 'Connection released', conn.threadId );
		} );

		this.backendDB.on( 'error', ( error: any ) => {
			console.error( 'There is a ZongJi error' );
			console.error( error );
			this.backendDB.stop();
			this.errors$.next( error );
		} );

		this.backendStart( serverid );

		process.on( 'SIGINT', () => {
			console.log( 'Realtime DB received SIGINT' );
			this.backendDB.stop();
		} );

	}

	private backendStart = ( serverid: number ) => {
		this.backendDB.start( {
			includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows'],
			startAtEnd: true,
			includeSchema: this.includeSchemaAssigner,
			serverId: serverid
		} );
	}
}
