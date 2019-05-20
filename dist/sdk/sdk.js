
import axios from 'axios';
import gql from "graphql-tag";

export class APICall {

    constructor(url){
        this.url = url;
    }

    send(data = {}) {
        
        return axios({ 
            method: "POST",
            url: this.url,
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => { 
            if (response.status >= 400) { // check for 4XX, 5XX, wtv
                return Promise.reject({
                    status: response.status,
                    message: response.statusText
                });
            }
            if (response.status >= 200 && response.status <= 202) {          
                return response.data.data;
            }
            return {};            
        })
        .catch((error)=>{            
            return Promise.reject({
                error: error                
            });                        
        });
    
    }
}

export default class SDK {
    
    constructor(options) {
        this.options = options;
        this.api = new APICall(
            options.apiUrl
        );
    }
    
    users = {

        get : (filters) => {
            return this.api.send({ 
                query: gql`
                    query users($filters: Filters) {
                        users (filters: $filters) {
                            _id
							username
							password
							isAdmin
							dateCreated
                        }
                    }`,
                variables: {
                    filters: filters
                }
            });
        },

        create : (username, password, isAdmin, dateCreated) => {
            return this.api.send({
                query: gql`
                        mutation createUser($input: UserInput) {
                            createUser(input: $input) {
                                _id
								username
								password
								isAdmin
								dateCreated
                            }
                        }`,
                variables: {
                    input: {
                        username: username, 
						password: password, 
						isAdmin: isAdmin, 
						dateCreated: dateCreated                        
                    } 
                }
            });
        },

        update : (_id, input) => {
            return this.api.send({
                query: gql`
                        mutation updateUser($id: String!, $input: UserInput!) {
                            updateUser(_id: $id, input: $input) {
                                _id
								username
								password
								isAdmin
								dateCreated
                            }
                        }`,
                variables: {
                    id: _id,
                    input: input
                }
            });
        },

        updateMany : (_ids, inputs) => {
            return this.api.send({
                query: gql`
                        mutation updateUsers($ids: [String!], $inputs: [UserInput!]) {
                            updateUsers(_ids: $ids, inputs: $inputs)
                        }`,
                variables: {
                    ids: _ids,
                    inputs: inputs
                }
            });
        },        

        remove : (_id) => {
            return this.api.send({
                query: gql`
                        mutation deleteUser($id: String!) {
                            deleteUser(_id: $id) {
                                _id
                            }
                        }`,
                variables: { 
                    id: _id
                }
            });
        },

        removeAll : (_id) => {
            return this.api.send({
                query: gql`
                        mutation {
                            deleteUsers
                        }`,
                variables: null
            });
        } 

    }

    cards = {

        get : (filters) => {
            return this.api.send({ 
                query: gql`
                    query cards($filters: Filters) {
                        cards (filters: $filters) {
                            _id
							userId
							category
							title
							text
							dateCreated
                        }
                    }`,
                variables: {
                    filters: filters
                }
            });
        },

        create : (userId, category, title, text, dateCreated) => {
            return this.api.send({
                query: gql`
                        mutation createCard($input: CardInput) {
                            createCard(input: $input) {
                                _id
								userId
								category
								title
								text
								dateCreated
                            }
                        }`,
                variables: {
                    input: {
                        userId: userId, 
						category: category, 
						title: title, 
						text: text, 
						dateCreated: dateCreated                        
                    } 
                }
            });
        },

        update : (_id, input) => {
            return this.api.send({
                query: gql`
                        mutation updateCard($id: String!, $input: CardInput!) {
                            updateCard(_id: $id, input: $input) {
                                _id
								userId
								category
								title
								text
								dateCreated
                            }
                        }`,
                variables: {
                    id: _id,
                    input: input
                }
            });
        },

        updateMany : (_ids, inputs) => {
            return this.api.send({
                query: gql`
                        mutation updateCards($ids: [String!], $inputs: [CardInput!]) {
                            updateCards(_ids: $ids, inputs: $inputs)
                        }`,
                variables: {
                    ids: _ids,
                    inputs: inputs
                }
            });
        },        

        remove : (_id) => {
            return this.api.send({
                query: gql`
                        mutation deleteCard($id: String!) {
                            deleteCard(_id: $id) {
                                _id
                            }
                        }`,
                variables: { 
                    id: _id
                }
            });
        },

        removeAll : (_id) => {
            return this.api.send({
                query: gql`
                        mutation {
                            deleteCards
                        }`,
                variables: null
            });
        } 

    }

    menuItems = {

        get : (filters) => {
            return this.api.send({ 
                query: gql`
                    query menuItems($filters: Filters) {
                        menuItems (filters: $filters) {
                            _id
							userId
							text
							isHeader
							hasDivider
							icon
							order
							dateCreated
                        }
                    }`,
                variables: {
                    filters: filters
                }
            });
        },

        create : (userId, text, isHeader, hasDivider, icon, order, dateCreated) => {
            return this.api.send({
                query: gql`
                        mutation createMenuItem($input: MenuItemInput) {
                            createMenuItem(input: $input) {
                                _id
								userId
								text
								isHeader
								hasDivider
								icon
								order
								dateCreated
                            }
                        }`,
                variables: {
                    input: {
                        userId: userId, 
						text: text, 
						isHeader: isHeader, 
						hasDivider: hasDivider, 
						icon: icon, 
						order: order, 
						dateCreated: dateCreated                        
                    } 
                }
            });
        },

        update : (_id, input) => {
            return this.api.send({
                query: gql`
                        mutation updateMenuItem($id: String!, $input: MenuItemInput!) {
                            updateMenuItem(_id: $id, input: $input) {
                                _id
								userId
								text
								isHeader
								hasDivider
								icon
								order
								dateCreated
                            }
                        }`,
                variables: {
                    id: _id,
                    input: input
                }
            });
        },

        updateMany : (_ids, inputs) => {
            return this.api.send({
                query: gql`
                        mutation updateMenuItems($ids: [String!], $inputs: [MenuItemInput!]) {
                            updateMenuItems(_ids: $ids, inputs: $inputs)
                        }`,
                variables: {
                    ids: _ids,
                    inputs: inputs
                }
            });
        },        

        remove : (_id) => {
            return this.api.send({
                query: gql`
                        mutation deleteMenuItem($id: String!) {
                            deleteMenuItem(_id: $id) {
                                _id
                            }
                        }`,
                variables: { 
                    id: _id
                }
            });
        },

        removeAll : (_id) => {
            return this.api.send({
                query: gql`
                        mutation {
                            deleteMenuItems
                        }`,
                variables: null
            });
        } 

    }

}
