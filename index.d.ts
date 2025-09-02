export interface ConfigOptions {
    path?: string;
    override?: boolean;
}

export function config(options?: ConfigOptions): void;
