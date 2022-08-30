import debounce from "@/utils/debounce";

export class GlobalProperty {
  clientHeight: any = 0;
  client: any = document.documentElement || document.body;
  previewDialogWidth = 900;

  constructor() {
    this.clientHeight = this.client.clientHeight;
    this.setPreviewDialogWidth();
    window.addEventListener(
      "resize",
      debounce(() => {
        this.clientHeight = this.client.clientHeight;
        this.setPreviewDialogWidth();
      }, 50)
    );
  }

  setPreviewDialogWidth(): void {
    this.previewDialogWidth = this.clientHeight < 650 ? 700 : 900;
  }
}

export class GlobalPropertyService {
  static globalProperty: GlobalProperty;
  static getInstance() {
    if (!GlobalPropertyService.globalProperty) {
      GlobalPropertyService.globalProperty = new GlobalProperty();
      return GlobalPropertyService.globalProperty;
    }
    return GlobalPropertyService.globalProperty;
  }
}
