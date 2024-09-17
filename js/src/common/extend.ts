import Extend from 'flarum/common/extenders';
import ManageNotes from './models/ManageNotes';
export default [
    new Extend.Store()
        .add(ManageNotes.TYPE, ManageNotes)
];