import app from 'flarum/admin/app';
import adminPage from './adminPage';

app.initializers.add('nodeloc/nodeloc-management', () => {
  app.extensionData
    .for('nodeloc-nodeloc-management')
    .registerPage(adminPage)
    .registerPermission(
      {
        icon: 'fas fa-eye-slash',
        label: app.translator.trans('nodeloc-nodeloc-management.admin.can_use_management'),
        permission: 'manage_nodeloc',
      },
      "view"
    )
});
