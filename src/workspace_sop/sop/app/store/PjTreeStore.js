/**
 * PJ - SOP のツリー用Store
 */
Ext.define(
    'sop.store.PjTreeStore', {
        extend: 'Ext.data.TreeStore',
        storeId: 'PjTreeStore',

        proxy: {
            type: 'ajax',
            url: './src/json_pj.php',
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    sop.common.Utilities.showSessionExpiredError();
                }
            }
        },

        root: {
            text: 'All Projects', // 全てのプロジェクト
            id: 'all'
        },

        autoLoad: false
    }
);
