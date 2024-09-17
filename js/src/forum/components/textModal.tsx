import app from 'flarum/forum/app';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Link from 'flarum/common/components/Link';

export default class textModal extends Modal<{
    text: number,
    buttonUrl: string
} & IInternalModalAttrs> {
    className(): string { return 'Modal Modal--small'; }
    title() {
        return app.translator.trans('nodeloc-nodeloc-management.forum.manage');
    }
    content() {
        return <div className="Modal-body">
            <pre className='autoWrap'>
                {this.attrs.text}
            </pre>
            <Link href={this.attrs.buttonUrl} className="Button Button--primary" onclick={app.modal.close}>
                {app.translator.trans('nodeloc-nodeloc-management.forum.view')}
            </Link>
        </div>;
    }
}