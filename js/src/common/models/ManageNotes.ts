import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';

export default class ManageNotes extends Model {
  static TYPE = "nodeloc-manage-notes";
  content = Model.attribute('content');
  createdAt = Model.attribute('createdAt');
  user_id = Model.attribute('user_id');
  from_user_id = Model.attribute('from_user_id');
  from_user = Model.hasOne<User>('from_user');
}