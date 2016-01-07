/**
 * コントローラー
 */
Ext.define(
    'sop.controller.Main', {
        extend: 'Ext.app.Controller',
        requires: [
            'Ext.util.Cookies',
            'sop.helper.TplForm'
        ],

        refs: [{
                ref: 'LoginForm',
                selector: '#login_form'
            },

            {
                ref: 'PjTree',
                selector: 'pj-tree'
            }, {
                ref: 'TplGrid',
                selector: 'tpl-grid'
            },

            {
                ref: 'TplAprvGrid',
                selector: 'tpl-aprv-grid'
            },

            {
                ref: 'PjForm',
                selector: '#pj_form'
            }, {
                ref: 'SopForm',
                selector: '#sop_form'
            }, {
                ref: 'TplForm',
                selector: '#tpl_form'
            }, {
                ref: 'TplUpldForm',
                selector: '#tpl_upld_form'
            }, {
                ref: 'TplAprvForm',
                selector: '#tpl_aprv_form'
            }, {
                ref: 'TplDetailEditForm',
                selector: '#tpl_detail_edit_form'
            }, {
                ref: 'TplRtnForm',
                selector: '#tpl_rtn_form'
            }, {
                ref: 'TplPrevPanel',
                selector: 'tpl-prev-window > tabpanel'
            }, {
                ref: 'TplEditPanel',
                selector: 'tpl-edit-window > tabpanel'
            }
        ],

        statics: {
            deselectProjectTree: function() {
                Ext.ComponentQuery.query('pj-tree')[0].getSelectionModel().deselectAll();
            }
        },

        formHelper: null,

        init: function() {
            this.on('updpj', this.updPj);
            this.on('delpj', this.delPj);
            this.on('dwnldpjsmpl', this.dwnldPjSmpl);

            this.on('updsop', this.updSop);
            this.on('delsop', this.delSop);

            this.on('upldtpl', this.upldTpl);
            this.on('prevtpl', this.prevTpl);
            this.on('edittpl', this.editTpl);
            this.on('aprvtpl', this.aprvTpl);
            this.on('rtntpl', this.rtnTpl);
            this.on('transitaprvtpl', this.transitAprvTpl);
            this.on('deltpl', this.delTpl);
            this.on('editdetailtpl', this.editDetailTpl);

            this.on('updform', this.updForm);

            this.control({
                '#user_id_field': {
                    specialkey: this.onTextfieldSpecialKey
                },
                '#password_field': {
                    specialkey: this.onTextfieldSpecialKey
                },
                '#login_btn': {
                    click: this.onClickLoginBtn
                },
                '#logout_btn': {
                    click: this.onClickLogoutBtn
                },

                'pj-tree': {
                    beforeitemexpand: this.onBeforeItemExpandPjTree,
                    itemclick: this.onItemClickPjTree
                },

                '#node_refresh_menu': {
                    click: this.onClickNodeRefreshMenu
                },
                '#node_add_menu': {
                    click: this.onClickNodeAddMenu
                },
                '#node_upd_menu': {
                    click: this.onClickNodeUpdMenu
                },
                '#node_del_menu': {
                    click: this.onClickNodeDelMenu
                },
                '#tpl_upld_menu': {
                    click: this.onClickTplUpldMenu
                },

                '#schema_type_radiogroup': {
                    change: this.onChangeSchematypeRadiogroup
                },

                '#tpl_dtl_menu': {
                    click: this.onClickTplDtlMenu
                },
                '#tpl_dtl_edit_menu': {
                    click: this.onClickTplDtlEditMenu
                },
                '#tpl_prev_menu': {
                    click: this.onClickTplPrevMenu
                },
                '#tpl_edit_menu': {
                    click: this.onClickTplEditMenu
                },
                '#tpl_transit_aprv_menu': {
                    click: this.onClickTplTransitAprvMenu
                },
                '#tpl_aprv_menu': {
                    click: this.onClickTplAprvMenu
                },
                '#tpl_rtn_menu': {
                    click: this.onClickTplRtnMenu
                },
                '#tpl_del_menu': {
                    click: this.onClickTplDelMenu
                },

                '#pj_submit_btn': {
                    click: this.onClickPjSubmitBtn
                },
                '#pj_cancel_btn': {
                    click: this.onClickPjCancelBtn
                },
                '#pj_smpl_dwnld_btn': {
                    click: this.onClickPjSmplDwnldBtn
                },

                '#sop_submit_btn': {
                    click: this.onClickSopSubmitBtn
                },
                '#sop_cancel_btn': {
                    click: this.onClickSopCancelBtn
                },

                '#tpl_upld_submit_btn': {
                    click: this.onClickTplUpldSubmitBtn
                },
                '#tpl_upld_cancel_btn': {
                    click: this.onClickTplUpldCancelBtn
                },
                '#tpl_cancel_btn': {
                    click: this.onClickTplCancelBtn
                },
                '#tpl_aprv_submit_btn': {
                    click: this.onClickTplAprvSubmitBtn
                },
                '#tpl_aprv_cancel_btn': {
                    click: this.onClickTplAprvCancelBtn
                },
                '#tpl_rtn_submit_btn': {
                    click: this.onClickTplRtnSubmitBtn
                },
                '#tpl_rtn_cancel_btn': {
                    click: this.onClickTplRtnCancelBtn
                },
                '#tpl_src_dwnld_btn': {
                    click: this.onClickTplSrcDwnldBtn
                },
                '#tpl_dwnld_btn': {
                    click: this.onClickTplDwnldBtn
                },
                '#tpl_close_btn': {
                    click: this.onClickTplCloseBtn
                },
                '#tpl_edit_cancel_btn': {
                    click: this.onClickTplEditCancelBtn
                },
                '#tpl_send_btn': {
                    click: this.onClickTplSendBtn
                },

                '#tpl_add_textarea_btn': {
                    click: this.onClickTplAddTextareaBtn
                },
                '#tpl_add_checkbox_btn': {
                    click: this.onClickTplAddCheckboxBtn
                },
                '#tpl_add_pulldown_btn': {
                    click: this.onClickTplAddPulldownBtn
                },
                '#tpl_add_radio_btn': {
                    click: this.onClickTplAddRadioBtn
                },

                '#tpl_detail_edit_btn': {
                    click: this.onClickTplEditSubmitBtn
                },
                '#tpl_detail_cancel_btn': {
                    click: this.onClickTplDetailEditCancelBtn
                }
            });
        },

        onLaunch: function() {
            Ext.ComponentQuery.query('app-main')[0].hide();
            this.getLoginForm().alignTo(document.body, 'c-c');
            this.getLoginForm().getForm().owner.up('panel').hide();

            Ext.getStore('PjTreeStore').on({
                load: 'onLoadPjTreeStore',
                scope: this
            });

            var that = this;
            Ext.getStore('SystemConfigStore').load(function(records, operation, success) {
                var system_version = records[0].get('system_version');
                sop.common.SystemVersion.check(system_version);
                that.getLoginForm().query('#system_version_field')[0].update('<div style="text-align:right; padding-bottom: 1em; font-size: 80%; color: gray">System Version ' + system_version + '</div>'); // <div style="text-align:right; padding-bottom: 1em; font-size: 80%; color: gray">システムバージョン

                var header_home_button_url = records[0].get('header_home_button_url');
                if (header_home_button_url) {
                    Ext.Array.each(Ext.ComponentQuery.query('#header-home-button'),
                        function(component) {
                            component.setHref(header_home_button_url);
                        });
                } else {
                    Ext.Array.each(Ext.ComponentQuery.query('#header-home-button'),
                        function(component) {
                            component.hide();
                        });
                }

                that.checkSession();
            });

            this.formHelper =
                Ext.create('sop.helper.TplForm', this.getTplEditPanel());
        },

        onLoadPjTreeStore: function(treestore, node, recs, successful, eopts) {
            treestore.getRootNode().expand();
        },


        // -------------------------
        // Submit on Enter
        // -------------------------
        onTextfieldSpecialKey: function(field, e, opt) {
            var submitBtn = field.up('[name="submit_form"]').down('button[name="submit_btn"]');
            if (e.getKey() == e.ENTER && submitBtn.disabled == false) {
                submitBtn.fireEvent('click', submitBtn, e, opt);
            }
        },

        checkSession: function() {
            Ext.Ajax.request({
                url: './src/login_.php',
                timeout: 5000,
                scope: this,
                callback: function(options, success, response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if (json.success == true) {
                        this.onLoginSucceed(this.getLoginForm().getForm(), json);
                        return;
                    }

                    if (json.sso_msg) {
                        Ext.Msg.alert('Failure', json.sso_msg);
                    }

                    this.resetLoginForm();
                    this.getLoginForm().getForm().owner.up('panel').show();
                }
            });
        },

        resetLoginForm: function() {
            this.getLoginForm().getForm().reset();

            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
            if (systemConfig.get('use_sso')) {
                // シングル・サインオン用にログインフォームを変更する。

                this.getLoginForm().remove('user_id_field', true);
                this.getLoginForm().remove('password_field', true);
                this.getLoginForm().query('#sso_field')[0].show();
            }
        },

        // ---------------------------------
        // ログイン画面
        // ---------------------------------
        // --- ログインボタン押下
        onClickLoginBtn: function(btn, e, eopts) {
            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
            if (systemConfig.get('use_sso')) {
                window.location.href = '/sop/sso/signin?' + Ext.urlEncode({
                    session_site_key: systemConfig.get('session_site_key'),
                    pathname: window.location.pathname
                });
            } else {
                this.getLoginForm().getForm().submit({
                    url: './src/login_.php',
                    scope: this,
                    success: function(form, action) {
                        this.onLoginSucceed(form, action.result);
                    },
                    failure: function(form, action) {
                        form.reset();
                        if (action.hasOwnProperty('result')) {
                            sop.common.Utilities.showFailureResponse(action.result);
                        } else {
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + action.failureType);  // '予期しないエラーが発生しました:'
                        }
                    }
                });
            }
        },

        onLoginSucceed: function(form, params) {
            // ログインパネルを非表示に
            Ext.ComponentQuery.query('#app-login-panel')[0].hide();
            Ext.ComponentQuery.query('app-main')[0].show();

            // 一旦すべてのタブパネルを削除
            var tab_panel = Ext.ComponentQuery.query('tabpanel')[0];

            // ログイン情報表示
            Ext.ComponentQuery.query('#header-group-info')[0].setText(params.grp_name, false);
            Ext.ComponentQuery.query('#header-user-info')[0].setText(params.user_id, false);
            var footer = Ext.getStore('SystemConfigStore').getAt(0).get('footer');
            Ext.ComponentQuery.query('#footer')[0].setText(footer, false);

            // 登録一覧
            if (params.role_upld == true) {
                Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
                Ext.getStore('PjTreeStore').load();

                var upld_panel_config = {};
                upld_panel_config.title = 'All Projects'; // 全てのプロジェクト
                upld_panel_config.layout = {
                    type: 'border',
                    padding: 5
                };
                upld_panel_config.items = [{
                    region: 'west',
                    xtype: 'pj-tree',
                    title: 'Project' // プロジェクト
                }, {
                    region: 'center',
                    xtype: 'tpl-grid',
                    title: 'Template List' // テンプレート一覧
                }];

                var upld_panel = Ext.create('Ext.panel.Panel', upld_panel_config);

                Ext.getStore('TplStore').getProxy().setExtraParam('node_type', 'all');
                Ext.getStore('TplStore').getProxy().setExtraParam('node_id', 'all');
                Ext.getStore('TplStore').load();

                tab_panel.add(upld_panel);
            }

            // 承認待ち一覧
            if (params.role_aprv == true) {
                var aprv_panel = Ext.create('sop.view.TplAprvGrid', {
                    title: 'Approval Request List' // 承認待ち一覧
                });
                Ext.getStore('TplAprvStore').load();

                tab_panel.add(aprv_panel);
            }

            tab_panel.setActiveTab(0);
        },

        // --- ログアウトボタン押下
        onClickLogoutBtn: function(btn, e, eopts) {
            var that = this;
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to log out?', submit); // ログアウトを行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: './src/logout_.php',
                        success: function(res, eopts) {
                            Ext.Msg.hide();

                            var tab_panel = Ext.ComponentQuery.query('tabpanel')[0];
                            tab_panel.removeAll();

                            Ext.ComponentQuery.query('app-main')[0].hide();
                            that.resetLoginForm();
                            Ext.ComponentQuery.query('#app-login-panel')[0].show();
                            that.getLoginForm().getForm().owner.up('panel').show();

                            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
                            if (systemConfig.get('use_sso') && !systemConfig.get('debug_pseudo_sso')) {
                                location.href = systemConfig.get('oauth2_logout_uri');
                            }
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + res.statusText); // 予期しないエラーが発生しました
                        }
                    });
                }
            }
        },

        // ---------------------------------
        // メイン画面
        // ---------------------------------
        // --- PjTree ----------------------
        // ノード expand 前
        onBeforeItemExpandPjTree: function(node, eopts) {
            var node_type = '';
            if (node.data.leaf == false) {
                if (node.data.id == 'all') {
                    node_type = 'all';
                }
                if (node.data.id != 'all') {
                    node_type = 'pj';
                }
            } else {
                node_type = 'sop';
            }
            Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', node_type);
        },

        // ノードリフレッシュ
        onClickNodeRefreshMenu: function(node, eopts) {
            Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
            Ext.getStore('PjTreeStore').load();
        },

        // ノードクリック
        onItemClickPjTree: function(node, rec, item, idx, e, eopts) {
            var node_type = '';
            if (rec.data.leaf == false) {
                if (rec.data.id == 'all') {
                    node_type = 'all';
                }
                if (rec.data.id != 'all') {
                    node_type = 'pj';
                }
            } else {
                node_type = 'sop';
            }
            Ext.getStore('TplStore').getProxy().setExtraParam('node_type', node_type);
            Ext.getStore('TplStore').getProxy().setExtraParam('node_id', rec.data.id);
            Ext.getStore('TplStore').load();
        },

        // ノード追加
        onClickNodeAddMenu: function(menuitem, e, eopts) {
            var node = this.getPjTree().getSelectionModel().getSelection()[0];
            if (node.data.leaf == false) {
                if (node.data.id == 'all') {
                    // リセットしないと、連続して登録する場合にallowBlankのエラーメッセージが表示されてしまう。
                    this.getPjForm().getForm().reset();
                    this.getPjForm().up('window').setTitle('Project Registration'); // プロジェクト 登録
                    this.getPjForm().query('#pj_smpl_dwnld_btn')[0].hide();
                    this.getPjForm().query('#pj_id')[0].setValue('');
                    this.getPjForm().query('#pj_name')[0].setValue('');
                    this.getPjForm().up('window').show();
                } else {
                    // リセットしないと、連続して登録する場合にallowBlankのエラーメッセージが表示されてしまう。
                    this.getSopForm().getForm().reset();
                    this.getSopForm().up('window').setTitle('SOP Registration'); // 標準作業手順書 登録
                    this.getSopForm().query('#pj_id')[0].setValue(node.data.id);
                    this.getSopForm().query('#sop_id')[0].setValue('');
                    this.getSopForm().query('#sop_name')[0].setValue('');
                    this.getSopForm().query('#checker_required_flag')[0].setValue(1);
                    this.getSopForm().up('window').show();
                }
            }
        },

        // ノード編集
        onClickNodeUpdMenu: function(menuitem, e, eopts) {
            var node = this.getPjTree().getSelectionModel().getSelection()[0];
            if (node.data.leaf == false) {
                this.getPjForm().up('window').setTitle('Project Edit'); // プロジェクト 編集
                this.getPjForm().query('#pj_smpl_dwnld_btn')[0].show();
                this.getPjForm().query('#pj_id')[0].setValue(node.data.id);
                this.getPjForm().query('#pj_name')[0].setValue(Ext.util.Format.htmlDecode(node.data.text));
                this.getPjForm().up('window').show();
            } else {
                this.getSopForm().up('window').setTitle('SOP Edit'); // 標準作業手順書 編集
                this.getSopForm().query('#sop_id')[0].setValue(node.data.id);
                this.getSopForm().query('#sop_name')[0].setValue(Ext.util.Format.htmlDecode(node.data.text));
                this.getSopForm().query('#checker_required_flag')[0].setValue(node.raw.checker_required_flag);
                this.getSopForm().up('window').show();
            }
        },

        // ノード削除
        onClickNodeDelMenu: function(menuitem, e, eopts) {
            var node = this.getPjTree().getSelectionModel().getSelection()[0];
            if (node.data.leaf == false) {
                this.fireEvent('delpj', {
                    pj_id: node.data.id
                });
            } else {
                this.fireEvent('delsop', {
                    pj_id: node.parentNode.data.id,
                    sop_id: node.data.id
                });
            }
        },

        // テンプレートアップロード
        onClickTplUpldMenu: function(menuitem, e, eopts) {
            var node = this.getPjTree().getSelectionModel().getSelection()[0];
            this.getTplUpldForm().getForm().reset();
            this.getTplUpldForm().up('window').setTitle('Template Upload'); // テンプレート アップロード'
            this.getTplUpldForm().query('#pj_id')[0].setValue(node.parentNode.data.id);
            this.getTplUpldForm().query('#sop_id')[0].setValue(node.data.id);
            this.getTplUpldForm().up('window').show();
        },

        // --- PjWindow --------------------
        onClickPjSubmitBtn: function(btn, e, eopts) {
            var pj_id = this.getPjForm().query('#pj_id')[0].getValue();
            this.fireEvent('updpj', {
                pj_id: pj_id
            });
        },

        onClickPjCancelBtn: function(btn, e, eopts) {
            this.getPjForm().getForm().reset();
            this.getPjForm().up('window').hide();
        },

        onClickPjSmplDwnldBtn: function(btn, e, eopts) {
            var pj_id = this.getPjForm().query('#pj_id')[0].getValue();
            this.fireEvent('dwnldpjsmpl', {
                pj_id: pj_id
            });
        },

        // --- SopWindow -------------------
        onClickSopSubmitBtn: function(btn, e, eopts) {
            var sop_id = this.getSopForm().query('#sop_id')[0].getValue();
            this.fireEvent('updsop', {
                sop_id: sop_id
            });
        },

        onClickSopCancelBtn: function(btn, e, eopts) {
            this.getSopForm().getForm().reset();
            this.getSopForm().up('window').hide();
        },

        // --- TplUpldWindow -------------------
        onChangeSchematypeRadiogroup: function(rg, newval, oldval, eopts) {
            if (newval.schema_type == '1') {
                this.getTplUpldForm().query('#word_file')[0].show();
            }
            if (newval.schema_type == '2') {
                this.getTplUpldForm().query('#word_file')[0].hide();
            }
        },

        onClickTplUpldSubmitBtn: function(btn, e, eopts) {
            this.fireEvent('upldtpl', {});
        },

        onClickTplUpldCancelBtn: function(btn, e, eopts) {
            this.getTplUpldForm().getForm().reset();
            this.getTplUpldForm().up('window').hide();
        },


        // --- テンプレート編集 --------
        onClickTplEditSubmitBtn: function(btn, e, eopts) {
            this.fireEvent('editdetailtpl', {});
        },

        onClickTplDetailEditCancelBtn: function(btn, e, eopts) {
            this.getTplDetailEditForm().getForm().reset();
            this.getTplDetailEditForm().up('window').hide();
        },

        // --- TplGrid, TplAprvGrid --------
        onClickTplDtlMenu: function(menuitem, e, eopts) {
            var row = this.getTplGrid().getSelectionModel().getSelection()[0];

            for (var i in this.getTplForm().items.items) {
                var item = this.getTplForm().items.items[i];

                var value = row.data[item.itemId];
                if (item.itemId.indexOf('_date') != -1) {
                    value = Ext.Date.dateFormat(value, 'Y/m/d H:i:s');
                }
                if (item.itemId == 'latest_flg') {
                    value = (value == 1) ? 'YES' : 'NO';
                }
                if (item.itemId == 'aprv_flg') {
                    value = sop.common.SopTemplate.aprvFlgToString(value);
                }

                item.setValue(value);
            }
            this.getTplForm().up('window').show();
        },

        // --- 詳細編集 --------
        onClickTplDtlEditMenu: function(menuitem, e, eopts) {
            var row = this.getTplGrid().getSelectionModel().getSelection()[0];

            for (var i in this.getTplDetailEditForm().items.items) {
                var item = this.getTplDetailEditForm().items.items[i];

                var value = row.data[item.itemId];
                item.setValue(Ext.util.Format.htmlDecode(value));
            }
            this.getTplDetailEditForm().up('window').show();
        },

        // プレビュー
        onClickTplPrevMenu: function(menuitem, e, eopts) {
            var row = null;
            if (Ext.ComponentQuery.query('app-main tabpanel')[0].getActiveTab().getXType() == 'tpl-aprv-grid') { // アクティブなタブの grid row を取得
                row = this.getTplAprvGrid().getSelectionModel().getSelection()[0];
            } else {
                row = this.getTplGrid().getSelectionModel().getSelection()[0];
            }
            this.fireEvent('prevtpl', {
                tpl_id: row.data.tpl_id
            });
        },

        // 入力フォーム追加
        onClickTplEditMenu: function(menuitem, e, eopts) {
            var row = null;
            if (Ext.ComponentQuery.query('app-main tabpanel')[0].getActiveTab().getXType() == 'tpl-aprv-grid') {
                row = this.getTplAprvGrid().getSelectionModel().getSelection()[0];
            } else {
                row = this.getTplGrid().getSelectionModel().getSelection()[0];
            }
            this.fireEvent('edittpl', {
                tpl_id: row.data.tpl_id
            });
        },

        // 承認可能状態に変更
        onClickTplTransitAprvMenu: function(menuitem, e, eopts) {
            var row = this.getTplGrid().getSelectionModel().getSelection()[0];
            this.fireEvent('transitaprvtpl', {
                pj_id: row.data.pj_id,
                sop_id: row.data.sop_id,
                tpl_id: row.data.tpl_id,
                new_aprv_flg: row.data.aprv_flg == 4 ? 0 : 4
            });
        },

        // 削除
        onClickTplDelMenu: function(menuitem, e, eopts) {
            var row = this.getTplGrid().getSelectionModel().getSelection()[0];
            this.fireEvent('deltpl', {
                pj_id: row.data.pj_id,
                sop_id: row.data.sop_id,
                tpl_id: row.data.tpl_id
            });
        },

        // 承認
        onClickTplAprvMenu: function(menuitem, e, eopts) {
            this.getTplAprvForm().getForm().reset();

            var row = this.getTplAprvGrid().getSelectionModel().getSelection()[0];
            this.getTplAprvForm().query('#pj_id')[0].setValue(row.data.pj_id);
            this.getTplAprvForm().query('#sop_id')[0].setValue(row.data.sop_id);
            this.getTplAprvForm().query('#tpl_id')[0].setValue(row.data.tpl_id);
            this.getTplAprvForm().up('window').show();
        },

        // 差戻し
        onClickTplRtnMenu: function(menuitem, e, eopts) {
            this.getTplRtnForm().getForm().reset();

            var row = this.getTplAprvGrid().getSelectionModel().getSelection()[0];
            this.getTplRtnForm().query('#pj_id')[0].setValue(row.data.pj_id);
            this.getTplRtnForm().query('#sop_id')[0].setValue(row.data.sop_id);
            this.getTplRtnForm().query('#tpl_id')[0].setValue(row.data.tpl_id);
            this.getTplRtnForm().up('window').show();
        },

        // --- TplWindow -------------------
        onClickTplCancelBtn: function(btn, e, eopts) {
            this.getTplForm().getForm().reset();
            this.getTplForm().up('window').hide();
        },

        // --- TplAprvWindow -------------------
        onClickTplAprvSubmitBtn: function(btn, e, eopts) {
            this.fireEvent('aprvtpl', {});
        },

        onClickTplAprvCancelBtn: function(btn, e, eopts) {
            this.getTplAprvForm().getForm().reset();
            this.getTplAprvForm().up('window').hide();
        },

        // --- TplRtnWindow -------------------
        onClickTplRtnSubmitBtn: function(btn, e, eopts) {
            this.fireEvent('rtntpl', {});
        },

        onClickTplRtnCancelBtn: function(btn, e, eopts) {
            this.getTplRtnForm().getForm().reset();
            this.getTplRtnForm().up('window').hide();
        },

        // --- TplPrevWindow ---------------
        onClickTplSrcDwnldBtn: function(btn, e, eopts) {
            var tpl_id = this.getTplPrevPanel().activeTab.down('#hidden_tpl_id').getValue();
            window.open('./src/tpl_dwnld.php?btn=src&tpl_id=' + tpl_id, 'width=10,height=10');
        },

        onClickTplDwnldBtn: function(btn, e, eopts) {
            var schema_id = this.getTplPrevPanel().activeTab.down('#hidden_schema_id').getValue();
            window.open('./src/tpl_dwnld.php?btn=normal&schema_id=' + schema_id, 'width=10,height=10');
        },

        onClickTplCloseBtn: function(btn, e, eopts) {
            this.getTplPrevPanel().removeAll();
            this.getTplPrevPanel().up('window').hide();
        },

        // --- TplEditWindow ---------------
        onClickTplEditCancelBtn: function(btn, e, eopts) {
            this.formHelper.clearContainers();
            this.getTplEditPanel().removeAll();
            this.getTplEditPanel().up('window').hide();
        },

        onClickTplSendBtn: function(btn, e, eopts) {
            var tpl_edit_panel = this.getTplEditPanel();
            var elements = tpl_edit_panel.elements;

            var img = tpl_edit_panel.el.down('img');
            var img_width = img.getWidth();
            var original_img_width = parseInt(img.getAttribute('data-original-width'));
            var scale_ratio = original_img_width / img_width;

            var form_list = [];
            for (var i in elements) {
                var el = elements[i];
                var form = {
                    x: parseInt(scale_ratio * el.x),
                    y: parseInt(scale_ratio * (el.y + el.scrollTop)),
                    width: parseInt(scale_ratio * el.getWidth()),
                    height: parseInt(scale_ratio * el.getHeight()),
                    element_type: el.type,
                    default_value: el.defaultValue
                };
                if (el.saved_form_id != null && el.saved_form_id != undefined) {
                    form.form_id = el.saved_form_id;
                }
                form_list.push(form);
            }

            var row = this.getTplGrid().getSelectionModel().getSelection()[0];
            this.formHelper.clearContainers();
            this.fireEvent('updform', {
                pj_id: row.data.pj_id,
                sop_id: row.data.sop_id,
                tpl_id: row.data.tpl_id,
                form_list: form_list
            });
        },

        onClickTplAddTextareaBtn: function(btn, e, eopts) {
            this.formHelper.makeTextbox();
        },

        onClickTplAddCheckboxBtn: function(btn, e, eopts) {
            this.formHelper.makeCheckbox();
        },

        onClickTplAddPulldownBtn: function(btn, e, eopts) {
            this.formHelper.makePulldown();
        },

        onClickTplAddRadioBtn: function(btn, e, eopts) {
            this.formHelper.makeRadio();
        },

        adjustInjectedInputPosition: function(img) {
            // エクセルの場合は画像が存在しない
            if (!img) {
                return;
            }

            var f = function() {
                var img_width = img.getWidth();
                var original_img_width = parseInt(img.getAttribute('data-original-width'));
                var scale_ratio = img_width / original_img_width;

                // 位置
                Ext.Array.each(Ext.query('.injected-input'), function(node) {
                    var original_top = parseInt(node.getAttribute('data-original-top'));
                    var original_left = parseInt(node.getAttribute('data-original-left'));
                    node.style.display = 'block';
                    node.style.top = parseInt(original_top * scale_ratio) + 'px';
                    node.style.left = parseInt(original_left * scale_ratio) + 'px';
                });

                // サイズ
                Ext.Array.each(Ext.query('.injected-input-resizable'), function(node) {
                    var original_width = parseInt(node.getAttribute('data-original-width'));
                    var original_height = parseInt(node.getAttribute('data-original-height'));
                    node.style.width = parseInt(original_width * scale_ratio) + 'px';
                    node.style.height = parseInt(original_height * scale_ratio) + 'px';
                });
            };

            f();
            img.on('load', f);
        },

        // ---------------------------------
        // 共通処理
        // ---------------------------------
        // --- Pj 登録 更新
        updPj: function(args) {
            var waitmsg = '';
            if (args.pj_id == '') {
                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to regist?', submit); // 登録を行います。よろしいですか？
                waitmsg = 'Now Registrating...'; // 登録中です...
            } else {
                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to update?', submit); // 更新を行います。よろしいですか？
                waitmsg = 'Now Updating...'; // 更新中です...
            }

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#pj_form')[0].getForm().submit({
                        url: './src/pj_upd.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                sop.controller.Main.deselectProjectTree();
                                Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
                                Ext.getStore('PjTreeStore').load();
                                Ext.getStore('TplStore').load();
                            }

                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input in required item: ' + action.failureType); // 必須項目に入力してください: '
                            }
                        }
                    });
                }
            }
        },

        // --- Pj 削除
        delPj: function(args) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete?', submit); // 削除を行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Msg.wait('Now Deleting...', 'Please Wait...'); // 削除中です...
                    Ext.Ajax.request({
                        url: './src/pj_del.php',
                        params: {
                            pj_id: args.pj_id
                        },
                        success: function(res, eopts) {
                            Ext.Msg.hide();

                            var response = Ext.decode(res.responseText);
                            if (response.success == true) {
                                Ext.Msg.alert('Success', response.msg);
                            } else {
                                sop.common.Utilities.showFailureResponse(response);
                            }

                            // 登録一覧
                            if (response.role_upld == true) {
                                sop.controller.Main.deselectProjectTree();
                                Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
                                Ext.getStore('PjTreeStore').load();
                                Ext.getStore('TplStore').load();
                            }

                            // 承認待ち一覧
                            if (response.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred:' + res.statusText); // 予期しないエラーが発生しました:
                        }
                    });
                }
            }
        },

        dwnldPjSmpl: function(args) {
            window.open('./src/pj_smpl_dwnld.php?pj_id=' + args.pj_id, 'width=10,height=10');
        },

        // --- Sop 登録 更新
        updSop: function(args) {
            var waitmsg = '';
            if (args.sop_id == '') {
                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to regist?', submit); // 登録を行います。よろしいですか？
                waitmsg = 'Now Registrating...'; // 登録中です...
            } else {
                Ext.MessageBox.confirm('Confirm', 'Are you sure you want to update?', submit); // 更新を行います。よろしいですか？
                waitmsg = 'Now Updating...'; // 更新中です...
            }

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#sop_form')[0].getForm().submit({
                        url: './src/sop_upd.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                sop.controller.Main.deselectProjectTree();
                                Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
                                Ext.getStore('PjTreeStore').load();
                                Ext.getStore('TplStore').load();
                            }

                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input required item: ' + action.failureType); // 必須項目に入力してください:
                            }
                        }
                    });
                }
            }
        },

        // --- Sop 削除
        delSop: function(args) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete?', submit); // 削除を行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Msg.wait('Now Deleting...', 'Please Wait...'); // 削除中です...
                    Ext.Ajax.request({
                        url: './src/sop_del.php',
                        params: {
                            pj_id: args.pj_id,
                            sop_id: args.sop_id
                        },
                        success: function(res, eopts) {
                            Ext.Msg.hide();
                            var response = Ext.decode(res.responseText);
                            if (response.success == true) {
                                Ext.Msg.alert('Success', response.msg);
                            } else {
                                sop.common.Utilities.showFailureResponse(response);
                            }

                            // 登録一覧
                            if (response.role_upld == true) {
                                sop.controller.Main.deselectProjectTree();
                                Ext.getStore('PjTreeStore').getProxy().setExtraParam('node_type', 'all');
                                Ext.getStore('PjTreeStore').load();
                                Ext.getStore('TplStore').load();
                            }

                            // 承認待ち一覧
                            if (response.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred:' + res.statusText); // 予期しないエラーが発生しました:
                        }
                    });
                }
            }
        },

        // --- Tpl アップロード
        upldTpl: function(args) {
            //sopimage形式の場合のみ、ワードファイルを必須にする
            var schemaTypeRadiogroup = Ext.ComponentQuery.query('#schema_type_radiogroup')[0].getValue();
            if (schemaTypeRadiogroup.schema_type == 1) {
                Ext.ComponentQuery.query('#word_file')[0].allowBlank = false;
            } else {
                Ext.ComponentQuery.query('#word_file')[0].allowBlank = true;
            }

            var waitmsg = '';
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to upload?', submit); // アップロードを行います。よろしいですか？
            waitmsg = 'Now uploading...'; // アップロード中です...

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#tpl_upld_form')[0].getForm().submit({
                        url: './src/tpl_upld.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input in required item: '); // 必須項目に入力してください
                            }
                        }
                    });
                }
            }
        },

        // --- Tpl
        editDetailTpl: function(args) {
            var waitmsg = '';
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to edit?', submit); // 編集を行います。よろしいですか？
            waitmsg = 'Now Editing...'; // 編集中です...

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#tpl_detail_edit_form')[0].getForm().submit({
                        url: './src/tpl_edit.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input in required item: '); // 必須項目に入力してください'
                            }
                        }
                    });
                }
            }
        },

        // --- Tpl プレビュー
        prevTpl: function(args) {
            var that = this;
            var tpl_prev_panel = this.getTplPrevPanel();
            Ext.ComponentQuery.query('#tpl_src_dwnld_btn')[0].hide();
            tpl_prev_panel.up('window').show();

            Ext.Msg.wait('Now getting preview contents...', 'Please Wait...'); // プレビュー内容を取得中です...
            Ext.Ajax.request({
                url: './src/tpl_prev.php',
                params: {
                    tpl_id: args.tpl_id
                },
                success: function(res, eopts) {
                    Ext.Msg.hide();

                    var response = Ext.decode(res.responseText);
                    if (response.success == true) {
                        for (var i = 0; i < response.schema_list.length; i++) {
                            var schema = response.schema_list[i];
                            var panel = null;
                            if (schema.schema_type == 1) // src
                            {
                                panel = Ext.create(
                                    'Ext.panel.Panel', {
                                        title: 'sopimage format', // sopimage形式
                                        autoScroll: true,
                                        bodyPadding: 10,
                                        html: schema.config,
                                        items: [{
                                            xtype: 'hiddenfield',
                                            itemId: 'hidden_tpl_id',
                                            value: schema.tpl_id
                                        }, {
                                            xtype: 'hiddenfield',
                                            itemId: 'hidden_schema_id',
                                            value: schema.schema_id
                                        }]
                                    }
                                );
                                Ext.ComponentQuery.query('#tpl_src_dwnld_btn')[0].show();
                            }
                            if (schema.schema_type == 2) // tbl
                            {
                                panel = Ext.create('Ext.panel.Panel', Ext.decode(schema.config));
                                panel.setTitle('Excel形式');
                                panel.setAutoScroll(true);
                                panel.setBodyStyle('padding', '10px');
                                panel.add({
                                    xtype: 'hiddenfield',
                                    itemId: 'hidden_tpl_id',
                                    value: schema.tpl_id
                                });
                                panel.add({
                                    xtype: 'hiddenfield',
                                    itemId: 'hidden_schema_id',
                                    value: schema.schema_id
                                });
                            }
                            if (panel != null) {
                                tpl_prev_panel.add(panel);
                            }
                        }

                        // 注入されたフォームの位置調整
                        var img = tpl_prev_panel.el.down('img');
                        if (img) {
                            that.adjustInjectedInputPosition(img);
                        }

                        tpl_prev_panel.doLayout();
                        tpl_prev_panel.setActiveTab(0);

                    } else {
                        sop.common.Utilities.showFailureResponse(response);
                    }
                },
                failure: function(res, eopts) {
                    Ext.Msg.hide();
                    Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + res.statusText); // 予期しないエラーが発生しました:
                }
            });
        },

        // --- Tpl フォーム追加
        editTpl: function(args) {
            var tpl_edit_panel = this.getTplEditPanel();
            var tpl_edit_window = tpl_edit_panel.up('window');
            tpl_edit_panel.elements = {};
            tpl_edit_window.show();
            sop.common.Session.refreshSessionWhileComponentIsVisible(tpl_edit_window);

            var that = this;

            Ext.Msg.wait('Now getting preview contents...', 'Please Wait...'); // プレビュー内容を取得中です...
            Ext.Ajax.request({
                url: './src/tpl_prev.php',
                params: {
                    tpl_id: args.tpl_id
                },
                success: function(res, eopts) {
                    var response = Ext.decode(res.responseText);
                    if (response.success == true) {
                        for (var i = 0; i < response.schema_list.length; i++) {
                            var schema = response.schema_list[i];
                            var panel = null;
                            if (schema.schema_type == 1) // src
                            {
                                panel = Ext.create(
                                    'Ext.panel.Panel', {
                                        title: 'sopimage', // sopimage形式
                                        autoScroll: true,
                                        bodyPadding: 10,
                                        html: schema.config,
                                        items: [{
                                            xtype: 'hiddenfield',
                                            itemId: 'hidden_tpl_id',
                                            value: schema.tpl_id
                                        }, {
                                            xtype: 'hiddenfield',
                                            itemId: 'hidden_schema_id',
                                            value: schema.schema_id
                                        }],
                                        listeners: {
                                            render: function(p) {
                                                p.body.on('scroll', function(e) {
                                                    var current_scroll_top = this.getScroll().top;
                                                    var elements = tpl_edit_panel.elements;
                                                    for (var key in elements) {
                                                        var elm = elements[key];
                                                        var container = this.next('#' + key);
                                                        container.setLeftTop(
                                                            elm.x,
                                                            elm.y + elm.scrollTop - current_scroll_top);
                                                    }
                                                });
                                            },
                                            resize: function(panel, width, height, width_old, height_old) {
                                                for (var key in tpl_edit_panel.elements) {
                                                    var elm = tpl_edit_panel.elements[key];
                                                    var box = elm.getBox();
                                                    var ratio = width / width_old;
                                                    elm.setPosition(
                                                        ratio * elm.x,
                                                        ratio * elm.y
                                                    );
                                                    elm.setSize(ratio * box.width, ratio * box.height);
                                                }
                                            }
                                        }

                                    }
                                );

                            }
                            if (schema.schema_type == 2) // tbl
                            {
                                panel = Ext.create('Ext.panel.Panel', Ext.decode(schema.config));
                                panel.setTitle('Excel'); // Excel形式
                                panel.setAutoScroll(true);
                                panel.setBodyStyle('padding', '10px');
                                panel.add({
                                    xtype: 'hiddenfield',
                                    itemId: 'hidden_tpl_id',
                                    value: schema.tpl_id
                                });
                                panel.add({
                                    xtype: 'hiddenfield',
                                    itemId: 'hidden_schema_id',
                                    value: schema.schema_id
                                });
                            }
                            if (panel != null) {
                                Ext.ComponentQuery.query('#tpl_edit_prev_panel')[0].add(panel);
                            }
                        }

                        var img = tpl_edit_panel.el.down('img');
                        if (img) {
                            img.on('load', function() {
                                // 入力フォームの作成と表示。
                                that.addFormElements(args.tpl_id, panel);
                            });
                        }

                        tpl_edit_panel.doLayout();
                        tpl_edit_panel.setActiveTab(0);

                    } else {
                        sop.common.Utilities.showFailureResponse(response);
                    }
                    Ext.Msg.hide();
                },
                failure: function(res, eopts) {
                    Ext.Msg.hide();
                    Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + res.statusText); // 予期しないエラーが発生しました:
                }
            });
        },

        addFormElements: function(tpl_id, panel) {
            var that = this;

            var img = this.getTplEditPanel().el.down('img');
            var img_width = img.getWidth();
            var original_img_width = parseInt(img.getAttribute('data-original-width'));
            var scale_ratio = img_width / original_img_width;

            Ext.getStore('FormStore').getProxy().setExtraParam('tpl_id', tpl_id);
            Ext.getStore('FormStore').load(function(records, operation, success) {
                for (var i in records) {
                    var param = records[i].data;

                    var opts = {
                        width: parseInt(scale_ratio * param.width),
                        height: parseInt(scale_ratio * param.height),
                        x: parseInt(scale_ratio * param.x),
                        y: parseInt(scale_ratio * param.y),
                        defaultValue: param.default_value
                    };

                    var element;
                    switch (param.type) {
                        case 'textbox':
                            element = that.formHelper.makeTextbox(opts);
                            break;
                        case 'checkbox':
                            element = that.formHelper.makeCheckbox(opts);
                            break;
                        case 'pulldown':
                            element = that.formHelper.makePulldown(opts);
                            break;
                        case 'radio':
                            element = that.formHelper.makeRadio(opts);
                            break;
                        default:
                            console.log('illegal type: ' + opts.type);
                            break;
                    };
                }

            });
        },

        // --- Tpl 承認
        aprvTpl: function(args) {
            var waitmsg = 'Now Processing...'; // 処理中です...
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to approve?', submit); // 承認を行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#tpl_aprv_form')[0].getForm().submit({
                        url: './src/tpl_aprv.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input in required item: ' + action.failureType); // 必須項目に入力してください:
                            }
                        }
                    });
                }
            }
        },

        // --- Tpl 差戻し
        rtnTpl: function(args) {
            var waitmsg = 'Now Processing...'; // 処理中です...
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to send back?', submit); // 差戻しを行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.ComponentQuery.query('#tpl_rtn_form')[0].getForm().submit({
                        url: './src/tpl_rtn.php',
                        waitMsg: waitmsg,
                        success: function(form, action) {
                            form.owner.up('window').hide();
                            Ext.Msg.alert('Success', action.result.msg);

                            // 登録一覧
                            if (action.result.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (action.result.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(form, action) {
                            if (action.hasOwnProperty('result')) {
                                sop.common.Utilities.showFailureResponse(action.result);
                            } else {
                                Ext.Msg.alert('Failure', 'Please input in required item: ' + action.failureType); // 必須項目に入力してください:
                            }
                        }
                    });
                }
            }
        },


        // --- Tpl 承認可能にする
        transitAprvTpl: function(args) {
            var confirmMessage = args.new_aprv_flg == 0 ?
                'Are you sure you want to approve about a document atatus?' : // 承認可能にします。よろしいですか？
                'Are you sure you want to send back about a approval request?'; // 承認申請を取り消します。よろしいですか？

            Ext.MessageBox.confirm('Confirm', confirmMessage, submit);

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Msg.wait('Now Changing...', 'Please Wait...'); // 変更中です...
                    Ext.Ajax.request({
                        url: './src/tpl_transit_aprv.php',
                        params: {
                            pj_id: args.pj_id,
                            sop_id: args.sop_id,
                            tpl_id: args.tpl_id,
                            new_aprv_flg: args.new_aprv_flg
                        },
                        success: function(res, eopts) {
                            Ext.Msg.hide();
                            var response = Ext.decode(res.responseText);
                            if (response.success == true) {
                                Ext.Msg.alert('Success', response.msg);
                            } else {
                                sop.common.Utilities.showFailureResponse(response);
                            }

                            // 登録一覧
                            if (response.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (response.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + res.statusText); // 予期しないエラーが発生しました:
                        }
                    });
                }
            }
        },

        // --- Tpl 削除
        delTpl: function(args) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete?', submit); // 削除を行います。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Msg.wait('Now deleting...', 'Please Wait...'); // 削除中です...
                    Ext.Ajax.request({
                        url: './src/tpl_del.php',
                        params: {
                            pj_id: args.pj_id,
                            sop_id: args.sop_id,
                            tpl_id: args.tpl_id
                        },
                        success: function(res, eopts) {
                            Ext.Msg.hide();
                            var response = Ext.decode(res.responseText);
                            if (response.success == true) {
                                Ext.Msg.alert('Success', response.msg);
                            } else {
                                sop.common.Utilities.showFailureResponse(response);
                            }

                            // 登録一覧
                            if (response.role_upld == true) {
                                Ext.getStore('TplStore').load();
                            }
                            // 承認待ち一覧
                            if (response.role_aprv == true) {
                                Ext.getStore('TplAprvStore').load();
                            }
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Failure', 'An unexpected error has occurred: ' + res.statusText); // 予期しないエラーが発生しました:
                        }
                    });
                }
            }
        },

        // --- Form 更新
        updForm: function(args) {
            var that = this;
            var waitmsg = '';
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to update in input form?', submit); // 入力フォームを更新します。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    Ext.Msg.wait('Now updating in input form...', 'Please Wait...'); // 入力フォーム更新中です...
                    Ext.Ajax.request({
                        url: './src/form_upd.php',
                        params: {
                            params: Ext.encode(args)
                        },
                        success: function(res, eopts) {
                            Ext.Msg.hide();
                            Ext.Msg.alert('Success', Ext.decode(res.responseText).msg);

                            that.getTplEditPanel().removeAll();
                            that.getTplEditPanel().up('window').hide();
                        },
                        failure: function(res, eopts) {
                            Ext.Msg.hide();
                            sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                        }
                    });
                }
            }
        }
    })
