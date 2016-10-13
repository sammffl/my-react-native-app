'use strict'

import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';

import config from './config.json';

let request = {};
request.get = (url, params) => {
    console.log('get fetch');
    if (params) {
        url += '?' + queryString.stringify(params);
    }
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .then((response) => Mock.mock(response))
};

request.post = (url, body) => {
    let options = _.extend(config.header, {
        body: JSON.stringify(body)
    });
    return fetch(url)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
};


export default request;
