import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import Button from 'flarum/common/components/Button';
import userInfoModal from './components/userInfoModal';


import PostControls from 'flarum/forum/utils/PostControls';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import ItemList from 'flarum/common/utils/ItemList';
import Composer from 'flarum/forum/components/Composer';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import previewModal from './components/previewModal';
function addItem(items: ItemList<any>, userId: number | string | false | null | undefined) {
  if (userId && app.forum.attribute('nodeloc_management_available')) {
    items.add('nodeloc-management', Button.component({
      icon: 'fas fa-users-cog',
      className: 'Button Button--link',
      onclick: () => {
        app.modal.show(userInfoModal, {
          userId: userId
        }, true);
      }
    },
      app.translator.trans('nodeloc-nodeloc-management.forum.manage')))
  }
}

app.initializers.add('nodeloc/nodeloc-management', () => {
  extend(PostControls, "moderationControls", function (items,post) {
    const user = post.user();
    const userId = user && user.id();
    addItem(items, userId);
  })
  extend(DiscussionControls, 'moderationControls', function (items, discussion) {
    const user = discussion.user();
    const userId = user && user.id();
    addItem(items, userId);
  });

  extend(Composer.prototype, 'controlItems', function (this: Composer, items) {
    if (!app.forum.attribute('nodeloc_management_available'))
      return;

    items.add(
      'manage-snippet',
      Button.component({
        icon: "fas fa-hammer",
        className: 'Button Button--icon Button--link',
        itemClassName: 'App-backControl',
        title: app.translator.trans('nodeloc-nodeloc-management.forum.manage'),
        onclick: () => {
          app.modal.show(previewModal, {}, true);
        },
      }),
      30
    );
  });
});
