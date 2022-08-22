import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, SPRest, IWeb } from "@pnp/sp/presets/all";

export class SPService {
    private sourceOfTruth: WebPartContext | ApplicationCustomizerContext;
    private sp: SPRest;
    private web: IWeb;

    /**
     * @param context WebpartContextBase or ListViewCommandSetContext
     */
    //TODO: not typed because of problems with spfx versions conflicts, create an SPFXContext to mimic it
    public constructor(private context: WebPartContext | ApplicationCustomizerContext) {
        sp.setup({
            spfxContext: context,
            sp: {
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            }
        });

        this.sp = sp;
        this.web = sp.web;
        this.sourceOfTruth = context;
    }
    
    public async getCurrentUserListItems (): Promise<any> {
        return await this.web.lists.getByTitle('Birthday').items.filter(`WAVE_Employee eq ${this.sourceOfTruth.pageContext.user}`);
    }

}
