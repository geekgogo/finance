import Vue from 'vue'
import Router from "vue-router";
import Main from "@/components/main"
import File from "@/components/file"
import uploadBasic from "@/components/uploadBasic"
import uploadReally from "@/components/uploadReally"
import uploadBudget from "@/components/uploadBudget"
import reportDownload from "@/components/reportDownload"

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "file",
            component: File
        },{
            path: "/finance",
            name: "main",
            component: Main
        },{
            path: "/finance/basic",
            name: "uploadBasic",
            component: uploadBasic
        },{
            path: "/finance/really",
            name: "uploadReally",
            component: uploadReally
        },{
            path: "/finance/budget",
            name: "uploadBudget",
            component: uploadBudget
        },
        {
            path: "/finance/reportDownload",
            name: "reportDownload",
            component: reportDownload
        },
    ]
});