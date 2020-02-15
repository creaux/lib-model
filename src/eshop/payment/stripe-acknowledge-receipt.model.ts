export class StripeAcknowledgeReceiptModel {
  public readonly received = true;

  constructor(params: Partial<StripeAcknowledgeReceiptModel> = {}) {
    Object.assign(this, params);
  }
}
