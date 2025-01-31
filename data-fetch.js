import fs from 'fs/promises';

export const fetch_nodes = async (subscriptions) => {
    let nodes = []
    if (typeof subscriptions === 'string') {
        subscriptions = [subscriptions];
    }
    for (let i = 0; i < subscriptions.length; i++) {
        nodes = nodes.concat((await fetch_data(subscriptions[i])).outbounds)
    }
    return nodes
}


export const fetch_data = async (path) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        // remote
        const response = await fetch(path);
        return await response.json();
    } else {
        // local
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }
}