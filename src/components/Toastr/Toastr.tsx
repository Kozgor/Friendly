const Toastr = (props: { itemName: string; message: string }) => (
  <div>
    <h3>{props.itemName}</h3> {props.message}
  </div>
);

export default Toastr;
