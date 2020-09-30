interface Config {
    prefix?: string;
    url?: string;
    data?: any;
    method?: string;
    splicing?: boolean;
    timeout?: number;
    type?: string;
    header?: object | any;
}
declare class Ajax {
    private _xhr;
    constructor();
    abort(): void;
    private splicing;
    private config;
    image(config: Config): void;
    request(config: Config): Promise<any>;
}
export default Ajax;
