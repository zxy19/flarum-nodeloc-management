import Modal, { IInternalModalAttrs } from "flarum/common/components/Modal";
import app from "flarum/forum/app";
import Select from "flarum/common/components/Select"
import Button from "flarum/common/components/Button";
import styleSelectedText from "flarum/common/utils/styleSelectedText";
function _trans(key: string, params?: any): string {
    const dat = app.translator.trans("nodeloc-nodeloc-management.forum.snippet." + key, params);
    if (Array.isArray(dat)) return dat.join("");
    return dat;
}
export default class previewModal extends Modal<{
} & IInternalModalAttrs> {
    opts: Record<string, string> = {};
    contents: Record<string, string> = {};
    key: string = "select";
    contentToInsert: string = "";
    public oninit(vnode: any) {
        super.oninit(vnode);
        this.contents = app.forum.attribute("nodeloc_management.snippet");
        Object.keys(this.contents).forEach(key => {
            this.opts[key] = key;
        });
        this.opts.select = _trans("select_snippet");
    }
    public className() {
        return "previewModal Modal--small";
    }
    public title() {
        return _trans("title");
    }
    content() {
        return <div className="Modal-body">
            <div className="Form-group">
                <label for="nodeloc-management-snippet-type">
                    {_trans("select_snippet")}
                </label>
                <Select id="nodeloc-management-snippet-type" options={this.opts} value={this.key} onchange={((e: string) => {
                    this.key = e;
                }).bind(this)}></Select>
            </div>
            <div className="nodeloc-management-snippet-preview">

            </div>
            <Button className="Button Button--primary" type="submit">{_trans("insert")}</Button>
        </div>;
    }
    onupdate(vnode: any): void {
        super.onupdate(vnode);
        //@ts-ignore
        s9e.TextFormatter.preview(
            this.contents[this.key],
            this.$(".nodeloc-management-snippet-preview")[0]
        );
    }
    onsubmit(e: SubmitEvent): void {
        e.preventDefault();

        styleSelectedText((app.composer.editor as any).el, { "suffix": this.contents[this.key] } as any);

        app.modal.close();
    }
}