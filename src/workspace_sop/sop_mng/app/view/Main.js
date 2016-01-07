Ext.define(
    'sop_mng.view.Main', {
        extend: 'Ext.container.Container',
        xtype: 'app-main',

        layout: {
            type: 'border'
        },

        items: [{
            region: 'north',
            xtype: 'container',

            layout: {
                type: 'hbox',
                align: 'middle'
            },
            height: 45,
            padding: 10,

            items: [{
                xtype: 'button',
                itemId: 'header-home-button',
                glyph: 0xf015,
                text: 'SOP Home', // 統合システムホーム
                href: '/',
                hrefTarget: '_self'
            }, {
                xtype: 'label',
                cls: 'header-main',
                html: 'Open Source SOP Platform (Account Manager)', // 標準作業手順書 ユーザー、グループ管理
                flex: 1
            }, {
                xtype: 'label',
                itemId: 'header-group-info',
                cls: 'header-group-info',
                glyph: 0xf007,
                text: ''
            }, {
                xtype: 'image',
                cls: 'fa-white',
                glyph: 0xf007
            }, {
                xtype: 'label',
                itemId: 'header-user-info',
                cls: 'header-user-info',
                glyph: 0xf007,
                text: ''
            }, {
                xtype: 'button',
                itemId: 'logout_btn',
                glyph: 0xf08b,
                text: 'Logout' // ログアウト
            }]
        }, {
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                xtype: 'user-grid',
                title: 'User List', // ユーザー一覧
                autoScroll: true
            }, {
                xtype: 'grp-grid',
                title: 'Group List', // グループ一覧
                autoScroll: true
            }]
        }, {
            region: 'south',
            xtype: 'container',

            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: '0 0 5px 0',
            items: [{
                xtype: 'label',
                cls: 'footer-main',
                itemId: 'footer',
                text: ''
            }]
        }]
    }
);
