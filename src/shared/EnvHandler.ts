export function GetStripeKey() {
  return process.env.NODE_ENV === 'production'
    ? 'pk_test_51JuUgOLK1wfv8R2Kln4rpNpz63rjvznwHH6iCkIf9WdujJA2IJBByE5oHAQ30EVDlpv2Ur5j4RiykveVy19xVtHX00TQ8VAuQS'
    : 'pk_test_51JuUgOLK1wfv8R2Kln4rpNpz63rjvznwHH6iCkIf9WdujJA2IJBByE5oHAQ30EVDlpv2Ur5j4RiykveVy19xVtHX00TQ8VAuQS';
}
