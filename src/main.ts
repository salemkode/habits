import { createApp } from "vue";
import App from "./App.vue";
import clickOutSide from "./directive/ClickOut";
import router from "./router";

createApp(App).directive("click-out", clickOutSide).use(router).mount("#app");
