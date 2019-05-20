import { models } from '../models';

var fs = require('fs');

const template = `
import axios from 'axios';
import gql from "graphql-tag";

{0}

export default class SDK {
    
    constructor(options) {
        this.options = options;
        this.api = new APICall(
            options.apiUrl
        );
    }
    {1}
}
`;

const objectTemplate = `
    {0} = {

        get : (filters) => {
            return this.api.send({ 
                query: gql\`
                    query {0}($filters: Filters) {
                        {0} (filters: $filters) {
                            {1}
                        }
                    }\`,
                variables: {
                    filters: filters
                }
            });
        },

        create : ({2}) => {
            return this.api.send({
                query: gql\`
                        mutation create{3}($input: {3}Input) {
                            create{3}(input: $input) {
                                {5}
                            }
                        }\`,
                variables: {
                    input: {
                        {4}                        
                    } 
                }
            });
        },

        update : (_id, input) => {
            return this.api.send({
                query: gql\`
                        mutation update{3}($id: String!, $input: {3}Input!) {
                            update{3}(_id: $id, input: $input) {
                                {5}
                            }
                        }\`,
                variables: {
                    id: _id,
                    input: input
                }
            });
        },

        updateMany : (_ids, inputs) => {
            return this.api.send({
                query: gql\`
                        mutation update{3}s($ids: [String!], $inputs: [{3}Input!]) {
                            update{3}s(_ids: $ids, inputs: $inputs)
                        }\`,
                variables: {
                    ids: _ids,
                    inputs: inputs
                }
            });
        },        

        remove : (_id) => {
            return this.api.send({
                query: gql\`
                        mutation delete{3}($id: String!) {
                            delete{3}(_id: $id) {
                                _id
                            }
                        }\`,
                variables: { 
                    id: _id
                }
            });
        },

        removeAll : (_id) => {
            return this.api.send({
                query: gql\`
                        mutation {
                            delete{3}s
                        }\`,
                variables: null
            });
        } 

    }
`;

export class SDKCreator {

    create(){        
        var c1 = fs.readFileSync('src/sdk/APICall.js');

        var c2 = '';
        var c3 = '';
        var c4 = [];
        var c5 = [];

        var fields = Object.keys(models);
        for (var i = 0; i < fields.length; i++) {            
            
            c3 = ['_id'];
            c4 = [];
            c5 = [];

            models[fields[i]].schema.eachPath(function(path) {
                if (path !== '_id' && path !== '__v')
                    c3.push(path);
                
                if (path !== '_id' && path !== '__v')
                    c4.push(path);

                if (path !== '_id' && path !== '__v')
                    c5.push(path + ": " + path);                    
            });

            c2 += objectTemplate
                .replace(new RegExp(this.escapeRegExp('{0}'), 'g'), (fields[i].charAt(0).toLowerCase() + fields[i].slice(1)) + "s")
                .replace(new RegExp(this.escapeRegExp('{1}'), 'g'), c3.join('\r\n\t\t\t\t\t\t\t'))
                .replace(new RegExp(this.escapeRegExp('{2}'), 'g'), c4.join(', '))
                .replace(new RegExp(this.escapeRegExp('{3}'), 'g'), fields[i])
                .replace(new RegExp(this.escapeRegExp('{4}'), 'g'), c5.join(', \r\n\t\t\t\t\t\t'))
                .replace(new RegExp(this.escapeRegExp('{5}'), 'g'), c3.join('\r\n\t\t\t\t\t\t\t\t'));

        }
        
        var sdk = template
                    .replace(new RegExp(this.escapeRegExp('{0}'), 'g'), c1)
                    .replace(new RegExp(this.escapeRegExp('{1}'), 'g'), c2);
    
        fs.writeFile("dist/sdk/sdk.js", sdk, function (err) {
          if (err) throw err;
          console.log('SDK created!');
        });
    }

    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

}