import { writeFileSync } from 'fs';

const fetch_nodes = async (subscriptions) => {
    let nodes = []
    if (typeof subscriptions === 'string') {
        subscriptions = [subscriptions];
    }
    for (let i = 0; i < subscriptions.length; i++) {
        nodes = nodes.concat((await fetch_data(subscriptions[i])).outbounds)
    }
    return nodes
}


const fetch_data = async (path) => {
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

// const config = JSON.parse(readFileSync('./config.json', 'utf8'))
const config = await fetch_data('./config.json')

let nodes = await fetch_nodes(config.subscriptions);
let sing_box_config = fetch_data(config.config_directory);
let outbounds = config.outbounds;

//extract tags
let tags = [];
nodes.forEach(function (node) {
    tags.push(node.tag);
});

//filter outbounds
outbounds.forEach(outbound => {
    if (outbound.regex) {
        let regex_1 = new RegExp(outbound.regex);
        outbound.outbounds = tags.filter(function (item) { return regex_1.test(item); });
        delete outbound.regex;
    }
});

//merge nodes
outbounds = outbounds.concat(nodes);

//merge outbounds
sing_box_config.outbounds = outbounds;

//sing_box_config.json
writeFileSync(config.output_directory, JSON.stringify(sing_box_config, null, 2), 'utf8');
