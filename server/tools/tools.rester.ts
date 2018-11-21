import { Request, Response, Router } from 'express';

import { MainTools } from './tools.main';

export class Rester {
	constructor( public tools: MainTools ) { }

	public respond = ( theFunction: Function, payload: any, req: Request, res: Response ) => {
		theFunction( payload ).then( function ( result: any ) {
			// console.log( result );
			res.send( result );
		} ).catch( function ( issue: Error ) {
			console.log( issue.name );
			console.log( issue.message );
			console.log( issue );
			res.status( 500 ).json( { status: 'fail', message: issue } );
		} );
	}

	public restify( router: Router, tool: any ) {
		router.get( '/', ( req: Request, res: Response ) => {
			this.respond( tool.getAll, null, req, res );
		} );

		router.get( '/:id', ( req: Request, res: Response ) => {
			this.respond( tool.getOne, req.params.id, req, res );
		} );

		router.post( '/', ( req: Request, res: Response ) => {
			this.respond( tool.create, req.body, req, res );
		} );

		router.put( '/', ( req: Request, res: Response ) => {
			this.respond( tool.update, req.body, req, res );
		} );

		router.delete( '/:id', ( req: Request, res: Response ) => {
			this.respond( tool.delete, req.params.id, req, res );
		} );
	}
}
