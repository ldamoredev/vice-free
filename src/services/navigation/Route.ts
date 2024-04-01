export class Route {
    constructor(
        readonly path: string,
        readonly params: Record<string, any> = {}
    ) {}
}
