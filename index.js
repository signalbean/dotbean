import fs from 'fs';
import path from 'path';

/**
 * Loads environment variables from a .env file.
 * @param {object} options - Options for the loader.
 * @param {string} options.path - The path to the .env file. Defaults to '.env'.
 * @param {boolean} options.override - Whether to override existing process.env variables.
 */
export function config(options = {}) {
    try {
        const filePath = options.path ? path.resolve(options.path) : path.resolve(process.cwd(), '.env');
        
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

        const lines = fileContent.split('\n');
        const envVars = {};

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.length === 0 || trimmedLine.startsWith('#')) {
                continue;
            }

            const equalsIndex = trimmedLine.indexOf('=');
            if (equalsIndex > 0) {
                const key = trimmedLine.substring(0, equalsIndex).trim();
                let value = trimmedLine.substring(equalsIndex + 1).trim();

                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                    if (value.includes('\\"')) {
                        value = value.replace(/\\"/g, '"');
                    }
                }
                
                envVars[key] = value;
            }
        }

        for (const key in envVars) {
            let value = envVars[key];
            
            if (value.includes('$')) {
                value = value.replace(/\${?([a-zA-Z0-9_]+)}?/g, (match, varName) => {
                    return envVars[varName] || process.env[varName] || match;
                });
            }

            if (options.override || !process.env.hasOwnProperty(key)) {
                process.env[key] = value;
            }
        }

    } catch (error) {
        if (options.path) {
            console.error(`dotbean: Error loading .env file from ${options.path}`, error);
        } else if (error.code !== 'ENOENT') {
            console.error(`dotbean: Error loading .env file`, error);
        }
    }
}
