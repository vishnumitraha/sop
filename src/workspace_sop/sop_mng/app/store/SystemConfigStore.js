/**
 * System Config Store データ一覧用
 */
Ext.define(
    'sop_mng.store.SystemConfigStore', {
        extend: 'Ext.data.Store',
        storeId: 'SystemConfigStore',

        model: 'sop_mng.model.SystemConfig',
        proxy: {
            type: 'ajax',
            url: './src/json_system_config.php',
            reader: {
                type: 'json',
                root: 'root'
            },
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    sop.common.Utilities.showSessionExpiredError();
                }
            }
        },

        autoLoad: false
    }
);
