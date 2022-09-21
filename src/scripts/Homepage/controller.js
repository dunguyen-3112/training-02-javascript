import { $ } from "../constant";
import HomepageModel from "./model";
import { HomepageView } from "./view";

export default class HomepageCtrl {
    /**
     *
     * @param {HomepageModel} model
     * @param {HomepageView} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.render();
    }
}
