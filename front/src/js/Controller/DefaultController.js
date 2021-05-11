//Import Controller
import Controller from "../_origin/Controller.js";
// Import Models
import PageModel from "../default/Model/PageModel.js";
// Import Views
import HeaderView from "../default/View/HeaderView.js";
import InnerView from "../default/View/InnerView.js";
import ScrollView from "../default/View/ScrollView.js";
import LandingView from "../default/View/LandingView.js";

class DefaultController extends Controller {
/* Views */
    /**
     * @type {HeaderView}
     */
    headerView = null    
    /**
     * @type {InnerView}
     */
    innerView = null
    /**
     * @type {ScrollView}
     */
    scrollView = null
    /**
     * @type {LandingView}
     */
    landingView = null
/* Models */
    /**
     * @type {PageModel}
     */
    pageModel = null
/* Variable */ 
    /**
     * @type {HTMLElement}
     */
    contentEl = null
    /**
     * @constructor
     */
    constructor(){  
        super("DefaultController");
        //Views
        this.headerView = new HeaderView(this.get("header.top"));
        this.innerView = new InnerView(this.get("div.middle .inner"));        
        this.scrollView = new ScrollView(this.get(".customScrollbar"), 8);
        this.landingView = new LandingView(this.get(".landingWrapper"));        
        //Models
        this.pageModel = new PageModel();                
        //Variables
        this.contentEl = this.get(".contentWrapper");
        //Binding        
        this.landingView.hear("@click", (e)=>this.onLandingClick(e));
        this.scrollView.hear("@direction", (e)=>this.onDirection(e.detail));
        this.headerView.hear("@click", (e)=>this.onHeaderClick(e));
        this.pageModel.callback = (text)=>this.onGetData(text);
    }    
    /**     
     * @param {CustomEvent} e 
     */
     onHeaderClick(e){
        //TODO - check Logout html!!!!
        if(this.pageModel.setURL(e.detail)){            
            this.pageModel.message();
            this.scrollView.goTo(this.contentEl.offsetTop);
        }            
    }
    onGetData(text){
        this.innerView.transformInner(text);
        this.innerView.appendScript(this.pageModel.setting.urlpath);
    }
    onLandingClick(e){        
        this.scrollView.goTo(this.contentEl.offsetTop);
    }
    /**
     * @event
     * @param {Boolean} d 
     */
    onDirection(d){
        //true - 아래, false - 위        
        this.headerView.hide(d);                    
    }    
}

export default DefaultController;