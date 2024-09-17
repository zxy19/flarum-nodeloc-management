import app from 'flarum/forum/app';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ManageNotes from '../../common/models/ManageNotes';
import Link from 'flarum/common/components/Link';
import textModal from './textModal';
import User from 'flarum/common/models/User';
import Button from 'flarum/common/components/Button';
type Mod = {
    id: number,
    point: number,
    pb: string,
    pv: string,
    createdAt: string,
    post: number[],
    user: string
};
export default class userInfoModal extends Modal<{
    userId: number
} & IInternalModalAttrs> {
    loading: boolean = true;
    notes: ManageNotes[] = [];
    userData?: {
        mods: {
            count: number, data: Mod[]
        },
        blackhole: {
            count: number, data: {
                title: string,
                id: number,
                createdAt: string
            }[]
        },
        nl: number, point: number
    };
    className(): string { return 'Modal Modal--large'; }
    title() {
        return app.translator.trans('nodeloc-nodeloc-management.forum.manage');
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
        this.loading = true;
        this.loadData();
    }
    content() {
        if (this.loading)
            return <LoadingIndicator></LoadingIndicator>
        return <div className="Modal-body">
            <div className='basic'>

            </div>
            <div className='manageNotes'>
                <h2>{app.translator.trans("nodeloc-nodeloc-management.forum.notes")}</h2>
                {this.notes.map(note => <div className='note'>
                    <span className='note-from'>{(note.from_user() as User)?.displayName()}</span>:<span className='note-content'>{note.content()}</span>
                </div>)}

                <div>
                    <Button className='Button Button--primary' onclick={() => {
                        const txt = prompt(app.translator.trans("nodeloc-nodeloc-management.forum.add-note") + "");
                        this.loading = true;
                        m.redraw();
                        app.store.createRecord<ManageNotes>(ManageNotes.TYPE).save({
                            content: txt,
                            user_id: this.attrs.userId
                        }).then(m => {
                            this.notes.unshift(m);
                        }).finally(() => {
                            this.loading = false;
                            m.redraw();
                        });
                    }}>
                        {app.translator.trans("nodeloc-nodeloc-management.forum.add-notes")}
                    </Button>

                </div>
            </div>
            <div className='warnings'>
                <h2>{app.translator.trans("nodeloc-nodeloc-management.forum.warning-title", { count: this.userData?.mods.count })}</h2>
                {
                    this.userData?.mods.data.map((mod) => {
                        return <div className='warningTextLine' onclick={this.showModCb(mod)}>
                            <i class="fas fa-exclamation-circle"></i>
                            {app.translator.trans('nodeloc-nodeloc-management.forum.warning', {
                                u: mod.user,
                                date: mod.createdAt,
                                points: mod.point
                            })}
                        </div>
                    })
                }
            </div>
            <div className='blackholes'>
                <h2>{app.translator.trans("nodeloc-nodeloc-management.forum.blackhole-title", { count: this.userData?.blackhole.count })}</h2>
                {
                    this.userData?.blackhole.data.map((blackhole => {
                        return <div className='blackholeTextline'>
                            <Link href={app.route('discussion', { id: blackhole.id })}>
                                {app.translator.trans('nodeloc-nodeloc-management.forum.blackhole', {
                                    date: blackhole.createdAt,
                                    title: blackhole.title
                                })}
                            </Link>
                        </div>
                    }))
                }
            </div>
        </div>;
    }

    async loadData(): Promise<void> {
        this.notes = await app.store.find<ManageNotes[]>(ManageNotes.TYPE, { userId: this.attrs.userId } as any);
        this.userData = await app.request({
            method: "GET",
            url: app.forum.attribute("apiUrl") + "/nodeloc-management?userId=" + this.attrs.userId,
        });
        this.loading = false;
        m.redraw();
    }


    showModCb(mod: any) {
        return (() => {
            app.modal.show(textModal, {
                text: app.translator.trans("nodeloc-nodeloc-management.forum.warning-text", Object.assign(mod, { u: mod.user })) + "",
                buttonUrl: app.route("discussion.near", { id: mod.post[0], near: mod.post[1] })
            })
        }).bind(this)
    }
}