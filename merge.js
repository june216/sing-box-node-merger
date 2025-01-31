import { writeFileSync } from 'fs';
import { fetch_nodes, fetch_data } from './data-fetch.js';

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
