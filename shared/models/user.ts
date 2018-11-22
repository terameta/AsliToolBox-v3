export interface User {
	id: number,
	username: string,
	password: string,
	role: string,
	type: string,
	ldapserver: number,
	email: string,
	name: string,
	surname: string,
	clearance: any
}

export enum UserType {
	Local = 'local',
	Directory = 'directory'
}

export enum UserRole {
	Admin = 'admin',
	User = 'user',
	Guest = 'guest'
}
