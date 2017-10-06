export class User {
    id: string;
    name: string;
    username: string;

    constructor(params: {
        id?: string,
        name: string,
        username: string,
    }) {
        this.id = params.id;
        this.name = params.name;
        this.username = params.username;
    }
}
