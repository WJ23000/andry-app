declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

namespace UniApp {
  interface Uni {
    $u: any;
  }
}
