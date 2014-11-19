'use strict';

var __CONFIG__ = {
    url: 'http://localhost:3000/combo',
    basePath: '/modules',
    combine: true,
    groups: {
        'chema': {
            basePath: '/modules/chema',
            modules: {
                'aui-chema-group-test1': {
                    path: 'aui-chema-group-test1',
                    deps: ['aui-base', 'aui-core']
                },

                'aui-chema-group-test2': {
                    deps: ['aui-plugin-base'],
                    path: 'aui-chema-group-test2.js'
                }
            }
        },

        'ambrin': {
            basePath: '/modules/ambrin',
            modules: {
                'aui-ambrin-group-test3': {
                    path: 'aui-ambrin-group-test3.js',
                    deps: ['aui-base', 'aui-core']
                },

                'aui-ambrin-group-test4': {
                    path: 'aui-ambrin-group-test4.js',
                    deps: ['aui-node']
                }
            }
        }
    },
    modules: {
        'aui-test': {
            condition: {
                trigger: 'aui-dialog',
                test: function() {
                    return false;
                }
            },
            deps: ['aui-base'],
            path: 'aui-test.js'
        },

        'aui-test2': {
            condition: {
                trigger: 'aui-plugin-base',
                test: function() {
                    return true;
                }
            },
            deps: ['aui-base'],
            path: 'aui-test2.js'
        },

        'aui-base': {
            deps: [],
            fullPath: 'http://localhost:8081/modules/aui-base.js'
        },

        'aui-core': {
            deps: [],
            path: 'aui-core.js'
        },

        'aui-plugin-base': {
            deps: [],
            path: 'aui-plugin-base.js'
        },

        'aui-node': {
            deps: ['aui-base', 'aui-core'],
            path: 'aui-node.js'
        },

        'aui-chema': {
            condition: {
                trigger: 'aui-nate',
                test: function() {
                    return true;
                }
            },
            deps: ['aui-autocomplete', 'aui-event', 'aui-node'],
            path: 'aui-chema.js'
        },

        'aui-dialog': {
            deps: ['aui-node', 'aui-plugin-base'],
            path: 'aui-dialog.js'
        },

        'aui-dom-node': {
            deps: ['aui-node'],
            path: 'aui-dom-node.js'
        },

        'aui-autocomplete': {
            deps: ['aui-node', 'aui-dialog'],
            path: 'aui-autocomplete.js'
        },

        'aui-event': {
            deps: ['aui-node', 'aui-plugin-base'],
            path: 'aui-event.js'
        },

        'aui-nate': {
            deps: ['aui-autocomplete', 'aui-event'],
            group: 'ambrin',
            path: 'aui-nate.js'
        }
    }
};


if (typeof module === 'object' && module) {
    module.exports = config;
}



// base

// 1. path

// 2. fullPath

// if (module has full path) {
//     unconditionally create individual request for it
// }


// if (combo is true) {
//     assume base is combo url and create combo url:
//     'http://localhost:8080/combo?aui-nate.js&/html/js/aui-event.js',
// }

// if (combo is false) {
//     make invididual requests for each file by combining base + module path

//     'http://localhost:8080/base/html/js/aui-nate.js',
//     'http://localhost:8080/base/html/js/aui-event.js'
// }