const Toastr = (props: { itemName: string; message: string }) => (
  <>
    <h3 data-testid="boardName">{props.itemName}</h3>
    <p data-testid="message">{props.message}</p>
  </>
);

export default Toastr;
