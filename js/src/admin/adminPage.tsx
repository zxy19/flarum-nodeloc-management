import ExtensionPage from "flarum/admin/components/ExtensionPage";
import app from 'flarum/admin/app';
import Button from "flarum/common/components/Button";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import Checkbox from "flarum/common/components/Checkbox";
import Stream from 'flarum/common/utils/Stream';
import Alert from "flarum/common/components/Alert";
import Select from "flarum/common/components/Select";
import type Tag from "@flarum-tags/common/models/Tag";
function _trans(key: string, params?: any): string {
    const dat = app.translator.trans("nodeloc-nodeloc-management.admin." + key, params);
    if (Array.isArray(dat)) return dat.join("");
    return dat;
}

export default class adminPage extends ExtensionPage {
    snippets: Stream
    snippetsData: { name: string, data: string }[] = []
    blackholeId: Stream
    tagOptions: Record<string, string> = {}
    oninit(vnode: any): void {
        super.oninit(vnode);
        this.snippets = this.setting("nodeloc_management.snippet");
        this.blackholeId = this.setting("nodeloc_management.blackholeId");
        const tmp = JSON.parse(this.snippets()||"{}");
        Object.keys(tmp).forEach(key => {
            this.snippetsData.push({ name: key, data: tmp[key] })
        });
        app.store.all<Tag>("tags").forEach(tag => {
            this.tagOptions[tag.id()!] = tag.name();
        });
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
    }
    content(vnode: any) {
        return <div className="nodeloc-management-adminPage-container container">
            <h2>{_trans("snippet")}</h2>
            <table className="Table Table--full">
                <thead>
                    <tr>
                        <th>{_trans('snippet_key')}</th>
                        <th>{_trans('snippet_content')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.snippetsData.map((item, index) => {
                        return <tr key={index}>
                            <td><input className="FormControl" type="text" value={item.name} onchange={((e: InputEvent) => {
                                this.snippetsData[index].name = (e.target as HTMLInputElement).value;
                                this.storeSetting()
                            }).bind(this)} /></td>
                            <td><input className="FormControl" type="text" value={item.data} onchange={((e: InputEvent) => {
                                this.snippetsData[index].data = (e.target as HTMLInputElement).value;
                                this.storeSetting()
                            }).bind(this)} /></td>
                            <td>
                                <Button onclick={(() => {
                                    if (!confirm(_trans("confirm")))
                                        this.snippetsData.splice(index, 1);
                                    m.redraw();
                                }).bind(this)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    })}
                    <tr><td><Button className="Button Button--secondary" onclick={this.addRow.bind(this)}>{_trans("addRow")}</Button></td></tr>
                </tbody>
            </table>
            <div>
                <h2>{_trans("blackhole")}</h2>
                <Select options={this.tagOptions} onchange={((e: any) => this.blackholeId(e)).bind(this)} value={this.blackholeId()}></Select>
            </div>
            <br></br>

            {this.submitButton()}
        </div>
    }

    addRow() {
        this.snippetsData.push({
            name: "", data: ""
        })
    }
    storeSetting() {
        const dat: any = {};
        this.snippetsData.forEach(snippet => {
            dat[snippet.name] = snippet.data;
        })
        this.snippets(JSON.stringify(dat));
    }
}